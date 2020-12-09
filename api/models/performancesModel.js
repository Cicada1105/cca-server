/*
	Model that interfacts directly with performance data
*/

// Import data
const performances = require('../../site_data/performance');

function filterBy(performanceFilter) {
	// Return promise that resolves to fill data
	return new Promise((resolve,reject) => {
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