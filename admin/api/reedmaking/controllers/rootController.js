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
const ReedmakingModel = require("../models/rootModel.js");

// Import utility function for handling the retrieval of body data
const { getBodyData } = require("../../utils.js");

async function addPricing(req, res) {
	res.setHeader("Content-Type","application/json");

	await ReedmakingModel.add("NEW REEDMAKING PRICING").then((msg) => {
		res.status = 201;
		res.end(JSON.stringify({ msg }));
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
async function updatePricing(req, res) {
	res.setHeader("Content-Type","application/json");

	await ReedmakingModel.update("UPDATED REEDMAKING PRICING").then((msg) => {
		res.status = 200;
		res.end(JSON.stringify({ msg }));
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