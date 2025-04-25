const corpusDatabase = require("../database/corpus.js");

function importDocuments(numDocuments = 100) {
	const positiveReviews = corpusDatabase.getPositiveReviewsOriginalSet(numDocuments);
	const negativeReviews = corpusDatabase.getNegativeReviewsOriginalSet(numDocuments);

	const reviews = [...positiveReviews, ...negativeReviews];

	corpusDatabase.insertCorpus(reviews);
}

function getCorpus(label) {
	return corpusDatabase.getCorpus(label);
}

function getDocument(id) {
	return corpusDatabase.getDocument(id);
}

module.exports = {
	importDocuments,
	getCorpus,
	getDocument,
};
