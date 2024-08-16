/*
	Model that interfacts directly with editing data
*/

const { getDatabaseCollection } = require('../../utils/mongodb.js');

function getAllPricings() {
	// Return promise that resolves to fill data
	return new Promise((resolve,reject) => {
		getDatabaseCollection('editing').then(async ({ collection, closeConnection }) => {
			const pricings = await collection.find({}).toArray();

			// Close database connection
			closeConnection();
			
			resolve(pricings);
		});
	});
}

module.exports = {
	getAllPricings
}