// Lab 6 ex 2
const express = require("express");
const router = express.Router();
const { getTfIdfVectorsFromClass } = require("../classification/train");
const { selectKBest } = require("../classification/featureSelection");

router.get("/:className", (req, res) => {
	try {
		const className = req.params.className || "positive";
		const vectors = getTfIdfVectorsFromClass(className);
		const selected = selectKBest(vectors[0].vector, 10);

		res.render("classVectors", {
			label: className,
			vectors: selected,
		});

	} catch (error) {
		res.status(400).json({ error: error.message });
	}
});

module.exports = router;