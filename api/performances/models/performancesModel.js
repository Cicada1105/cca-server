/*
	Model that interfacts directly with performance data
*/

// Path to performance data
const performancesPath = './site_data/performance.json';
// Import fs to handle file calls
const fs = require("fs");

function filterBy(performanceFilter) {
	// Return promise that resolves to fill data
	return new Promise((resolve,reject) => {
		// Get performances from file
		const performancesBuffer = fs.readFileSync(performancesPath);
		const performancesJSON = performancesBuffer.toString();
		const performances = JSON.parse(performancesJSON);
		// Filter out by type of performance sent in as an argument
		let isValidFilter = Object.keys(performances).includes(performanceFilter);

		if (isValidFilter)
			resolve(performances[performanceFilter]);
		else
			reject({
				msg: `Unable to retrieve data for: ${performanceFilter}`
			});
	});
}

module.exports = {
	filterBy
}