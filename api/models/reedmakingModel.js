/*
	Model that interfacts directly with reedmaking data
*/

const { getDatabaseCollection } = require('../../utils/mongodb.js');

function getAllPricings() {
	// Return promise that resolves to fill data
	return new Promise((resolve,reject) => {
		getDatabaseCollection('reedmaking').then(async ({ collection }) => {
			// Remove unnecessary ids from data to be returned to front end
			const pricings = await collection.find({}).project({
				_id: 0
			}).toArray();
			
			resolve(pricings);
		});
	});
}

module.exports = {
	getAllPricings
}