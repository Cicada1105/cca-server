/*
	Model that interfacts directly with editing data
*/

const { getDatabaseCollection } = require('../../utils/mongodb.js');

function getAllPricings() {
	// Return promise that resolves to fill data
	return new Promise((resolve,reject) => {
		getDatabaseCollection('editing').then(async ({ collection }) => {
			// Remove unnecessary ids from data to be returned to front end
			const pricings = await collection.find({}).project({
				"_id": 0,
				"genres.id": 0,
				"editing": {
					"Standard Proofreading": { "rates.id": 0 },
					"Developmental Editing": { "rates.id": 0 },
					"Both": { "rates.id": 0 }
				}
			}).toArray();
			
			resolve(pricings);
		});
	});
}

module.exports = {
	getAllPricings
}