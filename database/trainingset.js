const corpusDatabase = require("./corpus");
const fs = require("fs");
const path = require("path");

function loadTrainingSet() {
	const positiveReviews = corpusDatabase.getPositiveReviewsOriginalSet(100);
	const negativeReviews = corpusDatabase.getNegativeReviewsOriginalSet(100);

	let positiveTrainingSet =
		positiveReviews.length >= 100
			? positiveReviews.slice(0, 100)
			: positiveReviews;
	let negativeTrainingSet =
		negativeReviews.length >= 100
			? negativeReviews.slice(0, 100)
			: negativeReviews;

	const feedbackFile = path.join(__dirname, "./feedback.json");
	if (fs.existsSync(feedbackFile)) {
		const feedbacks = JSON.parse(fs.readFileSync(feedbackFile, "utf-8"));
		let feedbackIdCounter = 10001;

		feedbacks.forEach(({ text, realClass }) => {
			const feedbackObj = {
				id: feedbackIdCounter++,
				description: text,
				label: realClass,
			};

			if (realClass === "positive") {
				positiveTrainingSet.push(feedbackObj);
			} else if (realClass === "negative") {
				negativeTrainingSet.push(feedbackObj);
			}
		});
	}

	return { positiveTrainingSet, negativeTrainingSet };
}

function getTrainingSet(label) {
	const { positiveTrainingSet, negativeTrainingSet } = loadTrainingSet();
	if (label === "positive") {
		return positiveTrainingSet;
	} else if (label === "negative") {
		return negativeTrainingSet;
	}
	return [];
}

module.exports = { getTrainingSet };
