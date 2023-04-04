/*
	Model that interfacts directly with reedmaking data
*/

const { getFileData } = require("../utils.js");
const { getDatabaseCollection } = require('../../utils/mongodb.js');

function getAllPricings() {
	// Return promise that resolves to fill data
	return new Promise((res,rej) => {
		getDatabaseCollection('reedmaking').then(async ({ collection, closeConnection }) => {
			const pricings = await collection.find({}).toArray();
			// Remove unnecessary id from data to be returned to front end
			let updatedPricings = [];
			pricings.forEach(pricing => {
				// Extract out current id from rest of info
				let { id, ...rest } = pricing;
				// Store rest of pricing info without id
				updatedPricings.push(rest);
			})
			res(updatedPricings);
		});
	});
}

module.exports = {
	getAllPricings
}