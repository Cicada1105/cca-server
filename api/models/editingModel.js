/*
	Model that interfacts directly with editing data
*/

const { getDatabaseCollection } = require('../../utils/mongodb.js');

function getAllPricings() {
	// Return promise that resolves to fill data
	return new Promise((resolve,reject) => {
		getDatabaseCollection('editing').then(async ({ collection }) => {
			const pricings = await collection.find({}).toArray();
			
			resolve(pricings);
		});
	});
}

module.exports = {
	getAllPricings
}