/*
	Method for handling API requests and building responses
*/

// Import models to handle actual data
const PastPerformancesModel = require("../models/pastPerformancesModel.js");

function addPerformance(req, res) {
	PastPerformancesModel.add("NEW PAST PERFORMANCE");
	res.end("Added new past performance");
}
function updatePerformance(req, res) {
	PastPerformancesModel.update("UPDATED PAST PERFORMANCE");
	res.end("Updated past performmance");
}
function removePerformance(req, res) {
	PastPerformancesModel.remove("REMOVED PAST PERFORMANCE");
	res.end("Removed past performance");
}

module.exports = {
	addPerformance,
	updatePerformance,
	removePerformance
}