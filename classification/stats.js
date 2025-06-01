// Lab 8, Ex. 1 a)
function confusionMatrix(data) {
	// Get classes and sort them
	const classes = [
		...new Set(
			data.flatMap((item) => [item.predictedClass, item.realClass])
		),
	].sort();

	// Create empty matrix
	const matrix = {
		classes: [...classes],
		matrix: Array.from({ length: classes.length }, () =>
			new Array(classes.length).fill(0)
		),
	};

	// Fill matrix
	data.forEach((item) => {
		const row = matrix.classes.indexOf(item.predictedClass);
		const col = matrix.classes.indexOf(item.realClass);
		matrix.matrix[row][col]++;
	});

	return matrix;
}

// Lab 8, Ex. 1 b)
function precision(matrix) {
	const results = {};

	matrix.classes.forEach((className, rowIndex) => {
		const truePositives = matrix.matrix[rowIndex][rowIndex];
		let falsePositives = 0;

		// Sum whole ROW
		for (let colIndex = 0; colIndex < matrix.classes.length; colIndex++) {
			if (colIndex !== rowIndex) {
				falsePositives += matrix.matrix[rowIndex][colIndex];
			}
		}

		results[className] =
			truePositives + falsePositives > 0
				? truePositives / (truePositives + falsePositives)
				: 0;
	});

	return results;
}

// Lab 8, Ex. 1 c)
function recall(matrix) {
	const results = {};

	matrix.classes.forEach((className, classIndex) => {
		const truePositives = matrix.matrix[classIndex][classIndex];
		let falseNegatives = 0;

		// Sum whole COLUMN
		for (let rowIndex = 0; rowIndex < matrix.classes.length; rowIndex++) {
			if (rowIndex !== classIndex) {
				falseNegatives += matrix.matrix[rowIndex][classIndex];
			}
		}

		results[className] =
			truePositives + falseNegatives > 0
				? truePositives / (truePositives + falseNegatives)
				: 0;
	});

	return results;
}

// Lab 8, Ex. 1 d)
function fMeasure(matrix) {
	const precisions = precision(matrix);
	const recalls = recall(matrix);
	const f1Scores = {};

	matrix.classes.forEach((className) => {
		const p = precisions[className];
		const r = recalls[className];

		f1Scores[className] = p + r > 0 ? 2 * ((p * r) / (p + r)) : 0;
	});

	return f1Scores;
}

module.exports = {
	confusionMatrix,
	precision,
	recall,
	fMeasure,
};
