/*
	Method for handling API requests and building responses
*/

// Import models to handle actual data
const FuturePerformancesModel = require("../models/futurePerformancesModel.js");

// Import utility function for handling the retrieval of body data
const { getBodyData } = require("../utils.js");

function addPerformance(req, res) {
	FuturePerformancesModel.add("NEW FUTURE PERFORMANCE");
	res.end("Added future performance");
}
function updatePerformance(req, res) {
	FuturePerformancesModel.update("UPDATED FUTURE PERFORMANCE");
	res.end("Updated future performance...");
}
async function removePerformance(req, res) {
	res.setHeader("Content-Type","application/json");
	await getBodyData(req).then(async (body) => {
		// Pull out only necessary attributes from body to remove future performance
		let { id } = body;

		await FuturePerformancesModel.remove(id).then((msg) => {
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