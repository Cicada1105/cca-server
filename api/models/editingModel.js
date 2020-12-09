/*
	Model that interfacts directly with editing data
*/

// Import data
const pricings = require('../../site_data/editing');

function getAllPricings() {
	// Return promise that resolves to fill data
	return new Promise((res,rej) => {
		res(pricings);		
	});
}

module.exports = {
	getAllPricings
}