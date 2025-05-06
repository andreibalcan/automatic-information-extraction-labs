const { sumVector, avgVector } = require("./bagOfWords");

function selectKBest(terms, k, metric = "tfidf", useSum = true) {
	if (!Array.isArray(terms) || terms.length === 0 || k <= 0) {
		return [];
	}

	// Group terms by name
	const termGroups = {};
	terms.forEach((term) => {
		if (!term || !term.name) return;

		const termName = Array.isArray(term.name) ? term.name[0] : term.name;
		if (!termGroups[termName]) {
			termGroups[termName] = [];
		}
		termGroups[termName].push(term);
	});

	// Calculate scores for each term group using either sum or avg
	const scoredTerms = Object.entries(termGroups)
		.map(([termName, termGroup]) => {
			// If there is only one item in the group, use it directly
			if (termGroup.length === 1) {
				return {
					name: termName,
					value: termGroup[0][metric] || 0,
					term: termGroup[0],
				};
			}

			// Otherwise use sum or avg as specified
			const aggregatedTerm = useSum
				? sumVector(termGroup)
				: avgVector(termGroup);

			if (!aggregatedTerm) return null;

			return {
				name: termName,
				value: aggregatedTerm[metric] || 0,
				term: aggregatedTerm,
			};
		})
		.filter((item) => item !== null);

	// Sort by value (descending) and take top k
	return scoredTerms
		.sort((a, b) => b.value - a.value)
		.slice(0, k)
		.map((item) => item.term);
}

module.exports = {
	selectKBest,
};
