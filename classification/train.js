const { getTrainingSet } = require("../database/trainingset");
const { preprocessText } = require("./processing");
const { tf } = require("./counting");

function trainModel(classes = ["positive", "negative"], nArray = [1, 2]) {
	let trainingData = {};

	classes.forEach((classLabel) => {
		const trainingSet = getTrainingSet(classLabel);

		const processedTexts = trainingSet.map((doc) => {
			if (!doc || !doc.description) {
				return "";
			}

			const preprocessed = preprocessText(doc.description, nArray);

			preprocessed.tokens = preprocessed.tokens.map((tokenGroup) => {
				const tokensList = tokenGroup.tokens;
				const tfData = tokensList.map((token) => ({
					token,
					tf: tf(tokensList, token),
				}));

				return {
					...tokenGroup,
					tf: tfData,
				};
			});

			return preprocessed;
		});

		trainingData[classLabel] = processedTexts;
	});

	return trainingData;
}

module.exports = { trainModel };
