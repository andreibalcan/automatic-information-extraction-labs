const express = require("express");
const router = express.Router();
const trainingSetController = require("../controllers/trainingset");

router.get("/:label", (req, res) => {
	const label = req.params.label;
	const trainingSet = trainingSetController.getTrainingSet(label);

	if (!trainingSet || trainingSet.length === 0) {
		return res.render("trainingset", { label, trainingSet: [] });
	}

	res.render("trainingset", { label, trainingSet });
});

module.exports = router;
