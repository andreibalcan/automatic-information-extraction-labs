const { getTrainingSet } = require("../database/trainingset");
const { preprocessText } = require("./processing");
const {
	addUniqueTerms,
	binaryVector,
	numberOfOccurrencesVector,
	tfVector,
	idfVector,
	tfidfVector,
} = require("./bagOfWords");

function trainModel(classes = ["positive", "negative"], nArray = [1, 2]) {
	let trainingData = {};
	let classVocabularies = {};

	classes.forEach((classLabel) => {
		const trainingSet = getTrainingSet(classLabel);

		let unigramVocabulary = [];
		let bigramVocabulary = [];

		// Pre-process texts and get vocabularies
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

		// Calculate df for idf
		const unigramIDF = idfVector(
			unigramVocabulary,
			processedTexts.map((doc) =>
				doc.tokens
					.filter((group) => group.n === 1)
					.map((group) => group.tokens)
					.flat()
			)
		);
		const bigramIDF = idfVector(
			bigramVocabulary,
			processedTexts.map((doc) =>
				doc.tokens
					.filter((group) => group.n === 2)
					.map((group) => group.tokens)
					.flat()
			)
		);

		const enrichedDocs = processedTexts.map((doc, idx) => {
			const tokenGroups = doc.tokens.map((group) => {
				const tokens = group.tokens;

				const vocab =
					group.n === 1 ? unigramVocabulary : bigramVocabulary;
				const idfs = group.n === 1 ? unigramIDF : bigramIDF;

				const binary = binaryVector(vocab, tokens);
				const occurrences = numberOfOccurrencesVector(vocab, tokens);
				const tfVec = tfVector(vocab, tokens);
				const tfidfVec = tfidfVector(tfVec, idfs);

				return {
					n: group.n,
					tokens,
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

		trainingData[classLabel] = enrichedDocs;
		classVocabularies[classLabel] = {
			unigrams: unigramVocabulary,
			bigrams: bigramVocabulary,
		};
	});

	return { trainingData, classVocabularies };
}
module.exports = { trainModel };
