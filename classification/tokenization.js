const nGram = require("@drorgl/n-gram").default;

function tokenizeText(text, n) {
	if (!text || typeof text !== "string" || n < 1) return [];

	const words = text.split(" ");
	return nGram(n)(words);
}

module.exports = { tokenizeText };
