const express = require("express");
const router = express.Router();
const {
	probabilisticClassification,
	cosineSimilarity,
} = require("../classification/classifier");
const { getTfIdfVectorsFromClass } = require("../classification/train");
const fs = require("fs");
const path = require("path");

router.get("/", (req, res) => {
	res.render("classifyDocument", {
		inputText: "",
		cosineResult: null,
		probabilisticResult: null,
	});
});

router.post("/", (req, res) => {
	const text = req.body.text;

	const positiveVectors = getTfIdfVectorsFromClass("positive")[0];
	const negativeVectors = getTfIdfVectorsFromClass("negative")[0];

	const trainedVectors = [positiveVectors, negativeVectors];

	const cosineResult = cosineSimilarity(text, trainedVectors);
	const probabilisticResult = probabilisticClassification(text);

	res.render("classifyDocument", {
		inputText: text,
		cosineResult: {
			class: cosineResult.class,
			similarity: cosineResult.similarity,
		},
		probabilisticResult: {
			class: probabilisticResult.class,
			probability: probabilisticResult.probability,
		},
	});
});

const feedbackFile = path.join(__dirname, "../database/feedback.json");
function saveFeedback(feedback) {
	let feedbacks = [];
	if (fs.existsSync(feedbackFile)) {
		const data = fs.readFileSync(feedbackFile, "utf-8");
		feedbacks = JSON.parse(data);
	}
	feedbacks.push(feedback);
	fs.writeFileSync(feedbackFile, JSON.stringify(feedbacks, null, 2), "utf-8");
}

router.post("/feedback", (req, res) => {
	const { text, predictedClass, realClass } = req.body;

	if (!text || !predictedClass || !realClass) {
		return res.status(400).send("Dados incompletos no feedback");
	}

	saveFeedback({ text, predictedClass, realClass });

	res.redirect("/classifyDocument");
});

module.exports = router;
