var express = require("express");
var router = express.Router();
var corpusController = require("../controllers/corpus");

router.get("/importDocuments", function (req, res) {
	res.json(corpusController.importDocuments());
});

router.get("/:label", function (req, res) {
	const label = req.params.label;
	const reviews = corpusController
		.getCorpus(label)
		.sort((a, b) => b.score - a.score)
		.slice(0, 100);

	res.render("corpus", { reviews, label });
});

router.get("/document/:id", (req, res) => {
	const id = req.params.id;
	const document = corpusController.getDocument(id);

	console.log("document", document);

	if (!document) {
		return res.status(404).send("Documento não encontrado");
	}

	res.render("document", { document });
});

module.exports = router;
