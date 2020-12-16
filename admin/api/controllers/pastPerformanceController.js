/*
	Method for handling API requests and building responses
*/

// Import models to handle actual data
const PastPerformancesModel = require("../models/pastPerformancesModel.js");

// Import utility function for handling the retrieval of body data
const { getBodyData } = require("../utils.js");

function addPerformance(req, res) {
	PastPerformancesModel.add("NEW PAST PERFORMANCE");
	res.end("Added new past performance");
}
function updatePerformance(req, res) {
	PastPerformancesModel.update("UPDATED PAST PERFORMANCE");
	res.end("Updated past performmance");
}
async function removePerformance(req, res) {
	res.setHeader("Content-Type","application/json");
	await getBodyData(req).then(async (body) => {
		// Pull out only necessary attributes from body to remove past performance
		let { id } = body;

		await PastPerformancesModel.remove(id).then((msg) => {
			res.status = 200;
			res.end(JSON.stringify({ msg }));			
		}).catch((err) => {
			res.status = 500;
			res.end(JSON.stringify({
				msg: err 
			}));
		})
	}).catch((err) => {
		console.log("ERROR:");
		console.log(err.message);
		console.log(err.stack);

		res.status = 500;
		res.end(JSON.stringify({
			msg: "Unable to process the request at this time"
		}));
	})
}

module.exports = {
	addPerformance,
	updatePerformance,
	removePerformance
}