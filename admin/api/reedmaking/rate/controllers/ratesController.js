/*
	Method for handling API requests and building responses
	Request codes
	201: Created new resource (adding)
	200: Okay
	404: Not Found (updating and deleting?)
	500: Internal Server Error (Getting body data)
*/

// Import models to handle actual data
const ReedmakingModel = require("../models/ratesModel.js");

// Import utility function for handling the retrieval of body data
const { getBodyData } = require("../../../utils");

async function addPricing(req, res) {
	await getBodyData(req).then(async (body) => {
		let { reedID, pricing: { quantity, cost }} = body;

		await ReedmakingModel.add({
			reedID,
			pricing: {
				quantity,
				cost
			}
		}).then((msg) => {
			res.status = 201;
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
async function updatePricing(req, res) {
	await getBodyData(req).then(async (body) => {	
		let { reedID, pricing: { id, quantity, cost }} = body;

		await ReedmakingModel.update({
			reedID,
			pricing: {
				id,
				quantity,
				cost
			}
		}).then((msg) => {
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
async function removePricing(req, res) {
	await getBodyData(req).then(async (body) => {
		// Pull out only necessary attributes from body to remove pricing
		let { reedID, pricingID } = body;

		await ReedmakingModel.remove({
			reedID,
			pricingID
		}).then((msg) => {
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