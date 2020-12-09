/*
	Ediing controller
	Interacts with editing model
*/

// Import editing model
const EditingModel = require('../models/editingModel');

async function getEditingPricings(req,res) {
	// Handle headers
	res.setHeader("Content-Type","application/json");

	// Handle editing response using model -> await promise
	await EditingModel.getAllPricings().then(pricings => {
		res.statusCode = 200;
		res.end(JSON.stringify(pricings));
	}).catch(err => {
		res.statusCode = 500;
		res.end(JSON.stringify(err));
	});
}

module.exports = {
	getEditingPricings
}