function countBySize(ngramsArray) {
	let totalCount = 0;

	ngramsArray.forEach((item) => {
		totalCount += item.tokens.length;
	});

	return totalCount;
}

function numberOfOccurrences(tokensArray, targetToken) {
	return tokensArray.reduce((count, token) => {
		return JSON.stringify(token) === JSON.stringify(targetToken)
			? count + 1
			: count;
	}, 0);
}

function exists(tokensArray, targetToken) {
	return tokensArray.some(
		(token) => JSON.stringify(token) === JSON.stringify(targetToken)
	);
}

function tf(tokensArray, targetToken) {
	const occurrences = numberOfOccurrences(tokensArray, targetToken);
	const total = tokensArray.length;
	return total === 0 ? 0 : occurrences / total;
}

function idf(N, df) {
	if (df === 0 || N === 0) return 0;

	return Math.log10(N / df);
}

function tfidf(tf, idf) {
	return tf * idf;
}

module.exports = {
	countBySize,
	numberOfOccurrences,
	exists,
	tf,
	idf,
	tfidf,
};
