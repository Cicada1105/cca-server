/*
	Model that interfacts directly with reedmaking data
*/

// Import data
const pricings = require('../../site_data/reedmaking');

function getAllPricings() {
	// Return promise that resolves to fill data
	return new Promise((res,rej) => {
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
}

module.exports = {
	getAllPricings
}