/*
	Model that interfacts directly with reedmaking data
*/

const { getDatabaseCollection } = require('../../utils/mongodb.js');

function getAllPricings() {
	// Return promise that resolves to fill data
	return new Promise((resolve,reject) => {
		getDatabaseCollection('reedmaking').then(async ({ collection, closeConnection }) => {
			const pricings = await collection.find({}).toArray();

			// Close database connection
			closeConnection();
			
			// Remove unnecessary id from data to be returned to front end
			let updatedPricings = [];
			pricings.forEach(pricing => {
				// Extract out current id from rest of info
				let { id, ...rest } = pricing;
				// Store rest of pricing info without id
				updatedPricings.push(rest);
			})
			resolve(updatedPricings);
		});
	});
}

module.exports = {
	getAllPricings
}