const express = require("express");
const router = express.Router();
const fs = require("fs");
const path = require("path");

const {
	confusionMatrix,
	precision,
	recall,
	fMeasure,
} = require("../classification/stats");

router.get("/", (req, res) => {
	const feedbackFile = path.join(__dirname, "../database/feedback.json");
	let feedbacks = [];

	if (fs.existsSync(feedbackFile)) {
		feedbacks = JSON.parse(fs.readFileSync(feedbackFile, "utf-8"));
	}

	if (feedbacks.length === 0) {
		return res.render("stats", {
			message: "Nenhum feedback encontrado para avaliação.",
		});
	}

	const matrix = confusionMatrix(feedbacks);
	const precisions = precision(matrix);
	const recalls = recall(matrix);
	const f1scores = fMeasure(matrix);

	res.render("stats", {
		matrix,
		precisions,
		recalls,
		f1scores,
		message: null,
	});
});

module.exports = router;
