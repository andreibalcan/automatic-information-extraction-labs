const { getTrainingSet } = require("../database/trainingset");
const { preprocessText } = require("./processing");
const {
	addUniqueTerms,
	binaryVector,
	numberOfOccurrencesVector,
	tfVector,
	idfVector,
	tfidfVector,
	sumVector,
	removeOutliersByMinOccurrences,
} = require("./bagOfWords");
const { selectKBest } = require("../classification/featureSelection");
const fs = require("fs");
const path = require("path");

function process(classLabel, nArray = [1, 2]) {
	const trainingSet = getTrainingSet(classLabel);

	let unigramVocabulary = [];
	let bigramVocabulary = [];

	// Pre-process and vocabulary creation
	const processedTexts = trainingSet.map((doc) => {
		if (!doc || !doc.description) return { tokens: [] };

		const preprocessed = preprocessText(doc.description, nArray);

		preprocessed.tokens.forEach((tokenGroup) => {
			if (tokenGroup.n === 1) {
				unigramVocabulary = addUniqueTerms(
					unigramVocabulary,
					tokenGroup.tokens
				);
			}
			if (tokenGroup.n === 2) {
				bigramVocabulary = addUniqueTerms(
					bigramVocabulary,
					tokenGroup.tokens
				);
			}
		});

		return preprocessed;
	});

	// Calculate IDF for both unigrams and bigrams
	const unigramIDF = idfVector(
		unigramVocabulary,
		processedTexts.map((doc) =>
			doc.tokens.filter((g) => g.n === 1).flatMap((g) => g.tokens)
		)
	);
	const bigramIDF = idfVector(
		bigramVocabulary,
		processedTexts.map((doc) =>
			doc.tokens.filter((g) => g.n === 2).flatMap((g) => g.tokens)
		)
	);

	// Vectorize documents
	const vectorizedDocuments = processedTexts.map((doc) => {
		const tokenGroups = doc.tokens.map((group) => {
			const tokens = group.tokens;
			const vocab = group.n === 1 ? unigramVocabulary : bigramVocabulary;
			const idfs = group.n === 1 ? unigramIDF : bigramIDF;

			const binary = binaryVector(vocab, tokens);
			const occurrences = numberOfOccurrencesVector(vocab, tokens);
			const tfVec = tfVector(vocab, tokens);
			const tfidfVec = tfidfVector(tfVec, idfs);

			return {
				n: group.n,
				tokens,
				vocabulary: vocab, // Aqui é onde adicionamos o vocabulário do grupo
				binary,
				occurrences,
				tf: tfVec,
				idf: idfs,
				tfidf: tfidfVec,
			};
		});

		return {
			...doc,
			tokens: tokenGroups,
		};
	});

	// Group terms by n (1 = unigram, 2 = bigram)
	const termGroups = { 1: {}, 2: {} };

	vectorizedDocuments.forEach((doc) => {
		doc.tokens.forEach((group) => {
			const vocab = group.n === 1 ? unigramVocabulary : bigramVocabulary;

			vocab.forEach((termName, index) => {
				const termObj = {
					name: termName,
					tokens: group.tokens[index],
					vocabulary: group.vocabulary[index],
					freq: group.occurrences[index],
					tf: group.tf[index],
					idf: group.idf[index],
					tfidf: group.tfidf[index],
				};

				if (!termGroups[group.n][termName]) {
					termGroups[group.n][termName] = [];
				}
				termGroups[group.n][termName].push(termObj);
			});
		});
	});

	// SumVector
	const summedTerms = {
		unigrams: [],
		bigrams: [],
	};

	Object.entries(termGroups[1]).forEach(([term, objs]) => {
		const summed = sumVector(objs);
		if (summed) summedTerms.unigrams.push(summed);
	});

	Object.entries(termGroups[2]).forEach(([term, objs]) => {
		const summed = sumVector(objs);
		if (summed) summedTerms.bigrams.push(summed);
	});

	// Remove min occurence outliers
	const filteredUnigrams = removeOutliersByMinOccurrences(
		summedTerms.unigrams,
		2
	);
	const filteredBigrams = removeOutliersByMinOccurrences(
		summedTerms.bigrams,
		2
	);

	// Calculate k for unigrams and bigrams
	const kUnigrams = Math.max(1, Math.floor(filteredUnigrams.length * 0.2)); // 20%
	const kBigrams = Math.max(1, Math.floor(filteredBigrams.length * 0.2)); // 20%

	// Select best terms
	const selectedUnigrams = selectKBest(
		filteredUnigrams,
		kUnigrams,
		"tfidf",
		true
	); // true means that it uses sum and not avg
	const selectedBigrams = selectKBest(
		filteredBigrams,
		kBigrams,
		"tfidf",
		true
	); // true means that it uses sum and not avg

	return {
		documents: vectorizedDocuments,
		bagOfWords: {
			unigrams: filteredUnigrams,
			bigrams: filteredBigrams,
		},
		selectedFeatures: {
			unigrams: selectedUnigrams,
			bigrams: selectedBigrams,
		},
		vocabularies: {
			unigrams: unigramVocabulary,
			bigrams: bigramVocabulary,
		},
	};
}

function trainModel(classes = ["positive", "negative"], nArray = [1, 2]) {
	let trainingData = {};
	let classVocabularies = {};

	classes.forEach((classLabel) => {
		const { documents, bagOfWords, selectedFeatures, vocabularies } =
			process(classLabel, nArray);
		trainingData[classLabel] = { documents, bagOfWords, selectedFeatures };
		classVocabularies[classLabel] = vocabularies;
	});

	const output = {};
	for (const classLabel of classes) {
		const bag = trainingData[classLabel].bagOfWords;
		const selected = trainingData[classLabel].selectedFeatures;

		output[classLabel] = {
			allTerms: {
				unigrams: bag.unigrams,
				bigrams: bag.bigrams,
			},
			selectedTerms: {
				unigrams: selected.unigrams,
				bigrams: selected.bigrams,
			},
		};
	}

	const filePath = path.join(__dirname, "../database/train-lab4-5.json");
	fs.writeFileSync(filePath, JSON.stringify(output, null, 2), "utf-8");
	console.log(`Trainig data saved in: ${filePath}`);

	return { trainingData, classVocabularies };
}

module.exports = { trainModel, process };
