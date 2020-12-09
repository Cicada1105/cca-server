/*
	Model that interfacts directly with reedmaking data
*/

// Import data
const pricings = require('../../site_data/reedmaking');

function getAllPricings() {
	// Return promise that resolves to fill data
	return new Promise((res,rej) => {
		res(pricings);
	});
}

module.exports = {
	getAllPricings
}