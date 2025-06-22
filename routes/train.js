const express = require("express");
const router = express.Router();
const { trainModel } = require("../classification/train");

router.get("/", (req, res) => {
	res.render("train", { result: null });
});

router.get("/run", (req, res) => {
	try {
		const result = trainModel(["positive", "negative"], [1, 2]);
		res.json(result);
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
});

module.exports = router;
