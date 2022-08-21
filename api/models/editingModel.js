/*
	Model that interfacts directly with editing data
*/

const { getFileData } = require('../utils.js');

function getAllPricings() {
	// Return promise that resolves to fill data
	return new Promise((res,rej) => {
		let pricings = getFileData('./site_data/editing.json');
		res(pricings);
	});
}

module.exports = {
	getAllPricings
}