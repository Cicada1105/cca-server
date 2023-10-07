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
						_id: 0
					}
				}
			]).toArray();
			// Now that the collection has been queried, close the database connection
			closeConnection();

			const performanceTypes = resultArray[0]; // Result array [ ...performanceTypes ]
			// Check if the resulting object contains respective performance type
			let isValidFilter = performanceFilter in performanceTypes;

			if (isValidFilter) {
				// Remove unnecessary id from data to be returned to front end
				let updatedPerformances = { };
				// Pull out performances from data to remove ids
				let { performances, ...performancesTypeData } = performanceTypes[performanceFilter];
				// Assign performances type data to the updated performances object
				Object.assign( updatedPerformances, performancesTypeData );

				// Initialize the updated performances array
				updatedPerformances['performances'] = [];
				
				performances.forEach(performance => {
					// Extract out current id from rest of info
					let { id, ...rest } = performance;
					let imageSrc = rest['img'].src;
					// Update image URLs to include the server url
					rest['img'].src = process.env.SERVER_URL + `/imgs/${imageSrc}`;
					// Store rest of performance info without id
					updatedPerformances['performances'].push(rest);
				});

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