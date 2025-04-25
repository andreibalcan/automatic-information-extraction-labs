const stemmer = require("porter-stemmer").stemmer;

function applyStemming(text) {
	if (!text) return "";

	return text
		.split(" ")
		.map((word) => stemmer(word))
		.join(" ");
}

module.exports = { applyStemming };
