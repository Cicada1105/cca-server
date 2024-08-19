/*
	Model that interfacts directly with performance data
*/

const { getDatabaseCollection } = require('../../../utils/mongodb.js');

function filterBy(performanceFilter) {
	// Return promise that resolves to fill data
	return new Promise((resolve,reject) => {
		getDatabaseCollection('performances').then(async ({ collection }) => {
			// Resulting array will be in the form of [ { performanceType : []} ] where "performanceType" may not exist
			const resultArray = await collection.aggregate([
				{ 
					$project: { 
						_id: 0
					}
				}
			]).toArray();

			const performanceTypes = resultArray[0]; // Result array [ ...performanceTypes ]
			// Check if the resulting object contains respective performance type
			let isValidFilter = performanceFilter in performanceTypes;

			if (isValidFilter) {
				/*
					The following is done for backwards compatibility:
						performancesTypes[performanceFilter] can be:
						[ ...performances ] (old version) -or-
						{ performances: [], ...miscData } (new version)
				*/
				let updatedPerformances, performancesArray;

				// Assign performances type data to the updated performances object
				//Object.assign( updatedPerformances, performancesTypeData );
				if ( Array.isArray(performanceTypes[performanceFilter] ) ) {
					resolve("Array");
					updatedPerformances = [];
					performancesArray = performanceTypes[performanceFilter];
				}
				else {
					let { performances, ...performancesTypeData } = performanceTypes[performanceFilter];

					updatedPerformances = {
						...performancesTypeData,
						'performances': []
					};
					performancesArray = performances;
				}

				performancesArray.forEach(performance => {
					// Extract out current id from rest of info
					let { id, ...rest } = performance;
					
					if ( 'img' in rest ) {
						let imageSrc = rest['img'].src;
						// Update image URLs to include the server url
						rest['img'].src = (imageSrc.startsWith('data:image') || imageSrc.startsWith('http')) ? imageSrc : `${process.env.SERVER_URL}/imgs/${imageSrc}`;
					}

					// Store rest of performance info without id
					'performances' in updatedPerformances ? updatedPerformances['performances'].push(rest) : updatedPerformances.push(rest);
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