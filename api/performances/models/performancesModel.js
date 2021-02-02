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

		if (isValidFilter) {
			// Remove unnecessary id from data to be returned to front end
			let updatedPerformances = [];
			performances[performanceFilter].forEach(performance => {
				// Extract out current id from rest of info
				let { id, ...rest } = performance;
				// Store rest of performance info without id
				updatedPerformances.push(rest);
			})
			resolve(updatedPerformances);
		}
		else
			reject({
				msg: `Unable to retrieve data for: ${performanceFilter}`
			});
	});
}

module.exports = {
	filterBy
}