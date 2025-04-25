const fs = require("fs");
const path = require("path");

function loadHotelReviews() {
	const filePath = path.join(__dirname, "hotelreviews.json");
	const fileData = fs.readFileSync(filePath, "utf-8");
	return JSON.parse(fileData);
}

function getPositiveReviewsOriginalSet(x = 100) {
	const hotelReviews = loadHotelReviews();
	const positiveReviews = hotelReviews.filter((review) => review.label === "positive");

	return positiveReviews.slice(0, x);
}

function getNegativeReviewsOriginalSet(x = 100) {
	const hotelReviews = loadHotelReviews();
	const positiveReviews = hotelReviews.filter((review) => review.label === "negative");

	return positiveReviews.slice(0, x);
}

function getCorpus(label) {
	const reviews = loadHotelReviews();

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
		const { id, description, browser, device, label } = item;
		reviews.push({
			id: id,
			description: description,
			browser: browser,
			device: device,
			label: label,
		});
	});

	fs.writeFileSync(filePath, JSON.stringify(reviews, null, 2), "utf-8");
}

function getDocument(id) {
	const reviews = loadHotelReviews();
	return reviews.find((review) => review.id === parseInt(id));
}

module.exports = {
	getPositiveReviewsOriginalSet,
	getNegativeReviewsOriginalSet,
	getCorpus,
	insertCorpus,
	getDocument,
};
