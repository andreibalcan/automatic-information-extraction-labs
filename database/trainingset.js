const corpusDatabase = require("./corpus");

let positiveTrainingSet = [];
let negativeTrainingSet = [];

function initializeTrainingSet() {
	const positiveReviews = corpusDatabase.getPositiveReviewsOriginalSet(200);
	const negativeReviews = corpusDatabase.getNegativeReviewsOriginalSet(200);

	positiveTrainingSet = positiveReviews.length >= 100 ? positiveReviews.slice(0, 200) : positiveReviews;
	negativeTrainingSet = negativeReviews.length >= 100 ? negativeReviews.slice(0, 200) : negativeReviews;

	console.log("Positivos:", positiveTrainingSet.length);
	console.log("Negativos:", negativeTrainingSet.length);
}

function getTrainingSet(label) {
	if (label === "positive") {
		return positiveTrainingSet;
	} else if (label === "negative") {
		return negativeTrainingSet;
	}
	return [];
}

initializeTrainingSet();

module.exports = { getTrainingSet };
