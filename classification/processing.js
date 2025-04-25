const { cleanText } = require("./clean");
const { removeCustomStopwords } = require("./stopword");
const { applyStemming } = require("./stemming");
const { tokenizeText } = require("./tokenization");

function preprocessText(text, nArray = [1, 2], customStopwords = []) {
	if (!text || typeof text !== "string") {
		throw new Error("The text must be a valid string.");
	}

	let cleanedText = cleanText(text);

	cleanedText = removeCustomStopwords(cleanedText, customStopwords);

	const preprocessedText = applyStemming(cleanedText);

	const tokens = nArray.map((n) => ({
		n,
		tokens: tokenizeText(preprocessedText, n),
	}));

	return {
		originalText: text,
		cleanedText,
		preprocessedText,
		tokens,
	};
}

module.exports = { preprocessText };
