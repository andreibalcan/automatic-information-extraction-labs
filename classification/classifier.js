const { preprocessText } = require("./processing");
const { tfVector, tfidfVector } = require("./bagOfWords");
const fs = require("fs");
const path = require("path");

function calculateCosineSimilarity(vecA, vecB) {
	const dotProduct = vecA.reduce((sum, a, i) => sum + a * vecB[i], 0);
	const magnitudeA = Math.sqrt(vecA.reduce((sum, a) => sum + a * a, 0));
	const magnitudeB = Math.sqrt(vecB.reduce((sum, b) => sum + b * b, 0));

	if (magnitudeA === 0 || magnitudeB === 0) return 0;

	return dotProduct / (magnitudeA * magnitudeB);
}

function cosineSimilarity(text, trainedVectors) {
	// Pré-processar texto (unigramas e bigramas)
	const processed = preprocessText(text, [1, 2]);

	// Unificar tokens por n
	const tokensByN = {
		1: processed.tokens.find((g) => g.n === 1)?.tokens || [],
		2: processed.tokens.find((g) => g.n === 2)?.tokens || [],
	};

	var bestClass = null;
	var bestSimilarity = -1;

	for (const classData of trainedVectors) {
		const { label, vector } = classData;

		// Separar vetor da classe por n-gramas
		const unigrams = vector.filter((t) => t.n === 1);
		const bigrams = vector.filter((t) => t.n === 2);

		// Vocabulário e IDF por n
		const vocab1 = unigrams.map((t) => t.name);
		const idf1 = unigrams.map((t) => t.idf || t.tfidf); // fallback
		const vocab2 = bigrams.map((t) => t.name);
		const idf2 = bigrams.map((t) => t.idf || t.tfidf); // fallback

		// TF-IDF para o texto de input
		const tf1 = tfVector(vocab1, tokensByN[1]);
		const tf2 = tfVector(vocab2, tokensByN[2]);
		const tfidfText1 = tfidfVector(tf1, idf1);
		const tfidfText2 = tfidfVector(tf2, idf2);

		// Vetores da classe (já têm TF-IDF)
		const classVec1 = unigrams.map((t) => t.tfidf);
		const classVec2 = bigrams.map((t) => t.tfidf);

		// Similaridade por tipo de n-grama
		const sim1 = calculateCosineSimilarity(tfidfText1, classVec1);
		const sim2 = calculateCosineSimilarity(tfidfText2, classVec2);

		// Média das similaridades
		const avgSim = (sim1 + sim2) / 2;

		// Guardar melhor resultado
		if (avgSim > bestSimilarity) {
			bestSimilarity = avgSim;
			bestClass = label;
		}
	}

	return {
		class: bestClass,
		similarity: bestSimilarity,
	};
}

// Lab 7, Ex. 2
function probabilisticClassification(text) {
	const filePath = path.join(__dirname, "../database/train-lab4-5.json");

	if (!fs.existsSync(filePath)) {
		throw new Error("file " + filePath + " not found.");
	}

	const model = JSON.parse(fs.readFileSync(filePath, "utf-8"));

	const processed = preprocessText(text, [1, 2]);

	const tokens = {
		1: processed.tokens.find((g) => g.n === 1)?.tokens || [],
		2: processed.tokens.find((g) => g.n === 2)?.tokens || [],
	};

	let bestClass = null;
	let bestValue = 0;

	for (const classLabel of Object.keys(model).filter(
		(key) => key !== "priors"
	)) {
		const prior = model.priors[classLabel];

		const tfidfMap = {};
		let totalTfidf = 0;
		let vocabSize = 0;

		["unigrams", "bigrams"].forEach((type) => {
			model[classLabel].allTerms[type].forEach((term) => {
				tfidfMap[term.name] = term.tfidf;
				totalTfidf += term.tfidf;
				vocabSize += 1;
			});
		});

		let prob = 0;

		[1, 2].forEach((n) => {
			tokens[n].forEach((token) => {
				const tfidf = tfidfMap[token] || 0;
				// Applying Laplace Correction to avoid 0 multiplication
				const correctionProb =
					(tfidf + 1) / (totalTfidf + Math.abs(vocabSize));
				prob += correctionProb;
			});
		});

		const result = prob + prior;

		if (result > bestValue) {
			bestValue = result;
			bestClass = classLabel;
		}
	}

	return {
		class: bestClass,
		probability: bestValue,
	};
}

module.exports = {
	calculateCosineSimilarity,
	cosineSimilarity,
	probabilisticClassification,
};