/*
	Method for handling API requests and building responses
	Request codes
	201: Created new resource (adding)
	200: Okay
	404: Not Found (updating and deleting?)
	500: Internal Server Error (Getting body data)

	NOTE: 
	{
		title,
		description,
		id
	}
	is equivalent to
	{
		title: title,
		description: description,
		id: id
	}
*/

// Import models to handle actual data
const ReedmakingModel = require("../models/reedmakingModel.js");

// Import utility function for handling the retrieval of body data
const { getBodyData } = require("../utils.js");

function addPricing(req, res) {
	ReedmakingModel.add("NEW REEDMAKING PRICING");
	res.end("Added new reedmaking pricing");
}
function updatePricing(req, res) {
	ReedmakingModel.update("UPDATED REEDMAKING PRICING");
	res.end("Updated reedmaking pricing");
}
async function removePricing(req, res) {
	res.setHeader("Content-Type","application/json");
	await getBodyData(req).then(async (body) => {
		// Pull out only necessary attributes from body to remove pricing
		let { id } = body;

		await ReedmakingModel.remove(id).then((msg) => {
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
	addPricing, 
	updatePricing, 
	removePricing
}