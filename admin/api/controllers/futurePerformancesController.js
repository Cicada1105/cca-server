/*
	Method for handling API requests and building responses
*/

// Import models to handle actual data
const FuturePerformancesModel = require("../models/futurePerformancesModel.js");

function addPerformance(req, res) {
	FuturePerformancesModel.add("NEW FUTURE PERFORMANCE");
	res.end("Added future performance");
}
function updatePerformance(req, res) {
	FuturePerformancesModel.update("UPDATED FUTURE PERFORMANCE");
	res.end("Updated future performance...");
}
function removePerformance(req, res) {
	FuturePerformancesModel.remove("REMOVED FUTURE PERFORMANCE");
	res.end("Removed future performance");
}

module.exports = {
	addPerformance,
	updatePerformance,
	removePerformance
}