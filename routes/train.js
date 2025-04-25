const express = require("express");
const router = express.Router();
const { trainModel } = require("../classification/train");

router.get("/", (req, res) => {
	const classes = ["positive", "negative"];
	const ngrams = [1, 2];

	try {
		const trainingData = trainModel(classes, ngrams);
		res.json(trainingData);
	} catch (error) {
		res.status(500).json({ error: "Error while training model", details: error.message });
	}
});

module.exports = router;
