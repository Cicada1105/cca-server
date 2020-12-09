/*
	Method for handling API requests and building responses
*/

// Import models to handle actual data
const ReedmakingModel = require("../models/reedmakingModel.js");

function addPricing(req, res) {
	ReedmakingModel.add("NEW REEDMAKING PRICING");
	res.end("Added new reedmaking pricing");
}
function updatePricing(req, res) {
	ReedmakingModel.update("UPDATED REEDMAKING PRICING");
	res.end("Updated reedmaking pricing");
}
function removePricing(req, res) {
	ReedmakingModel.remove("REMOVED REEDMAKING PRICING");
	res.end("Removed reedmaking pricing");
}

module.exports = {
	addPricing, 
	updatePricing, 
	removePricing
}