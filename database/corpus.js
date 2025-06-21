const fs = require("fs");
const csv = require("csv-parser");
const path = require("path");

function filterDataSet() {
	let csvFilePath = path.join(__dirname, "airlines_reviews.csv");
	let outputJsonPath = path.join(__dirname, "airlines_reviews.json");

	let results = [];
	let rowNumber = 1;

	fs.createReadStream(csvFilePath)
		.pipe(csv())
		.on("data", (row) => {
			rowNumber++;
			const airline = row["Airline"]?.trim();
			const verified = row["Verified"]?.toLowerCase() === "true";
			const rating = parseFloat(row["Overall Rating"]);
			const review = row["Reviews"]?.trim();

			if (airline === "Qatar Airways" && verified) {
				let label = null;
				if (rating > 7) {
					label = "positive";
				} else if (rating <= 3) {
					label = "negative";
				}

				if (label && review) {
					results.push({
						id: rowNumber,
						description: review,
						label: label,
						score: rating,
					});
				}
			}
		})
		.on("end", () => {
			fs.writeFileSync(
				outputJsonPath,
				JSON.stringify(results, null, 2),
				"utf8"
			);
			console.log(`Filtered JSON saved to ${outputJsonPath}`);
		});
}

function loadReviews() {
	const filePath = path.join(__dirname, "airlines_reviews.json");
	const fileData = fs.readFileSync(filePath, "utf-8");
	return JSON.parse(fileData);
}

function loadCorpusReviews() {
	const filePath = path.join(__dirname, "corpus.json");
	const fileData = fs.readFileSync(filePath, "utf-8");
	return JSON.parse(fileData);
}

function getPositiveReviewsOriginalSet(x = 100) {
	const reviews = loadReviews();
	const positiveReviews = reviews
		.filter((review) => review.label === "positive")
		.sort((a, b) => b.score - a.score);

	return positiveReviews.slice(0, x);
}

function getNegativeReviewsOriginalSet(x = 100) {
	const reviews = loadReviews();
	const negativeReviews = reviews
		.filter((review) => review.label === "negative")
		.sort((a, b) => a.score - b.score);

	return negativeReviews.slice(0, x);
}

function getCorpus(label) {
	const reviews = loadCorpusReviews();

	return reviews.filter((review) => review.label === label);
}

function insertCorpus(data = []) {
	const filePath = path.join(__dirname, "corpus.json");
	let reviews = [];

	if (fs.existsSync(filePath)) {
		const fileData = fs.readFileSync(filePath, "utf-8");
		reviews = JSON.parse(fileData);
	}

	data.forEach((item) => {
		const { id, description, label, score } = item;
		reviews.push({
			id: id,
			description: description,
			label: label,
			score: score,
		});
	});

	fs.writeFileSync(filePath, JSON.stringify(reviews, null, 2), "utf-8");
}

function getDocument(id) {
	const reviews = loadCorpusReviews();
	return reviews.find((review) => review.id === parseInt(id));
}

module.exports = {
	filterDataSet,
	getPositiveReviewsOriginalSet,
	getNegativeReviewsOriginalSet,
	getCorpus,
	insertCorpus,
	getDocument,
};
