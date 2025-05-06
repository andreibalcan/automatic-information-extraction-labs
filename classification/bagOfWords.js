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

function sumVector(termArray) {
	if (!termArray || termArray.length === 0) return null;

	const name = termArray[0].name;
	const idf = termArray[0].idf;

	let totalFreq = 0;
	let totalTf = 0;

	termArray.forEach((term) => {
		totalFreq += term.freq;
		totalTf += term.tf;
	});

	const tfidf = totalTf * idf;

	return {
		name,
		freq: totalFreq,
		tf: totalTf,
		idf,
		tfidf,
	};
}

function avgVector(termArray) {
	if (termArray.length === 0) return null;

	const name = termArray[0].name;
	const idf = termArray[0].idf;
	const count = termArray.length;

	let totalFreq = 0;
	let totalTf = 0;

	termArray.forEach((term) => {
		totalFreq += term.freq;
		totalTf += term.tf;
	});

	const avgFreq = totalFreq / count;
	const avgTf = totalTf / count;
	const tfidf = avgTf * idf;

	return {
		name,
		freq: avgFreq,
		tf: avgTf,
		idf,
		tfidf,
	};
}

function removeOutliersByMinOccurrences(termArray, minOccurrences = 2) {
	return termArray.filter((term) => term.freq >= minOccurrences);
}

module.exports = {
	addUniqueTerms,
	binaryVector,
	numberOfOccurrencesVector,
	tfVector,
	idfVector,
	tfidfVector,
	sumVector,
	avgVector,
	removeOutliersByMinOccurrences,
};
