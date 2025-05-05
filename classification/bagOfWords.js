const { tf } = require("./counting");
const { numberOfOccurrences } = require("./counting");
const { idf } = require("./counting");
const { tfidf } = require("./counting");

function addUniqueTerms(currentTerms, newTerms) {
	const terms = new Set(currentTerms);

	newTerms.forEach((term) => {
		if (!terms.has(term)) {
			terms.add(term);
		}
	});

	return Array.from(terms);
}

function binaryVector(bagOfWords, terms) {
	const docTerms = new Set(terms);

	return bagOfWords.map((term) => (docTerms.has(term) ? 1 : 0));
}

function numberOfOccurrencesVector(bagOfWords, terms) {
	return bagOfWords.map((term) => numberOfOccurrences(terms, term));
}

function tfVector(bagOfWords, terms) {
	return bagOfWords.map((term) => {
		return (raw = tf(terms, term));
	});
}

function idfVector(bagOfWords, allDocsTerms) {
	const N = allDocsTerms.length;

	return bagOfWords.map((term) => {
		const df = allDocsTerms.reduce((count, docTerms) => {
			const termSet = new Set(docTerms);
			return termSet.has(term) ? count + 1 : count;
		}, 0);

		return idf(N, df);
	});
}

function tfidfVector(tfArray, idfArray) {
	return tfArray.map((tfValue, index) => {
		const idfValue = idfArray[index];
		return tfidf(tfValue, idfValue);
	});
}

module.exports = {
	addUniqueTerms,
	binaryVector,
	numberOfOccurrencesVector,
	tfVector,
	idfVector,
	tfidfVector,
};
