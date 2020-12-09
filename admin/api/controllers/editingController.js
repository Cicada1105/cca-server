/*
	Method for handling API requests and building responses
*/

// Import models to handle actual data
const EditingModel = require("../models/editingModel.js");

function addPricing(req, res) {
	EditingModel.add("NEW EDITING PRICING");
	res.end("Added new editing pricing");
}
function updatePricing(req, res) {
	EditingModel.update("UPDATED EDITING PRICING");
	res.end("Updated editing pricing");
}
function removePricing(req, res) {
	EditingModel.remove("REMOVED EDITING PRICING");
	res.end("Removed editing pricing");
}

module.exports = {
	addPricing, 
	updatePricing, 
	removePricing
}
