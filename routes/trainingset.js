const express = require("express");
const router = express.Router();
const trainingSetController = require("../controllers/trainingset");

router.get("/:label", (req, res) => {
	const label = req.params.label;
	const trainingSet = trainingSetController.getTrainingSet(label);

	if (!trainingSet || trainingSet.length === 0) {
		return res.status(404).send("No document found for this class.");
	}

	res.json(trainingSet);
});

module.exports = router;
