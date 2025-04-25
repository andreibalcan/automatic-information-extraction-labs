const { removeStopwords } = require("stopword");

function removeGeneralStopwords(text) {
	if (!text) return "";

	const wordsArray = text.split(" ");
	const filteredWords = removeStopwords(wordsArray);
	return filteredWords.join(" ");
}

function removeCustomStopwords(text, customStopwords = []) {
	if (!text) return "";

	const cleanedText = removeGeneralStopwords(text);
	const wordsArray = cleanedText.split(" ");

	const filteredWords = wordsArray.filter((word) => !customStopwords.includes(word.toLowerCase()));

	return filteredWords.join(" ");
}

module.exports = { removeGeneralStopwords, removeCustomStopwords };
