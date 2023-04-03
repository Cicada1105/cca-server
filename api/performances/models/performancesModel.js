/*
	Model that interfacts directly with performance data
*/

const { getDatabaseCollection } = require('../../../utils/mongodb.js');

function filterBy(performanceFilter) {
	// Return promise that resolves to fill data
	return new Promise((resolve,reject) => {
		getDatabaseCollection('performances').then(async ({ collection, closeConnection }) => {
			// Resulting array will be in the form of [ { performanceType : []} ] where "performanceType" may not exist
			const resultArray = await collection.aggregate([
				{ 
					$project: { 
						_id: 0,
						[performanceFilter]: 1
					}
				}
			]).toArray();
			// Now that the collection has been queried, close the database connection
			closeConnection();

			const performances = resultArray[0]; // Results as { performanceType : [] }
			// Check if the resulting object contains respective performance type
			let isValidFilter = performanceFilter in performances;

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
	});
}

module.exports = {
	filterBy
}