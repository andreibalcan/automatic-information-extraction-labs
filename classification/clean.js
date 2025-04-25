function toLowerCase(text) {
	if (!text) return "";
	return text.toLowerCase();
}

function trimAndCleanSpaces(text) {
	if (!text) return "";
	return text.trim().replace(/\s+/g, " ");
}

function removeNonAlphabetic(text) {
	if (!text) return "";
	return text.replace(/[^a-zA-Z\s]/g, "");
}

function cleanText(text) {
	if (!text) return "";

	let cleanedText = toLowerCase(text);
	cleanedText = removeNonAlphabetic(cleanedText);
	cleanedText = trimAndCleanSpaces(cleanedText);

	return cleanedText;
}

module.exports = { toLowerCase, trimAndCleanSpaces, removeNonAlphabetic, cleanText };
