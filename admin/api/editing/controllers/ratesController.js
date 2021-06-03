/*
	Method for handling API requests and building responses
*/

// Import models to handle actual data
const EditingModel = require("../models/ratesModel.js");

// Import utility function for handling the retrieval of body data
const { getBodyData } = require("../../utils.js");

async function addPricing(req, res) {
	await getBodyData(req).then(async (body) => {
		// Retrieve data associated with new ricing
		let { litID, editingType, min, max, perHour, perWord, flatRate } = body;
		
		await EditingModel.add({
			litID, 
			editingType, 
			min, 
			max, 
			perHour, 
			perWord, 
			flatRate			
		}).then(msg => {
			res.status = 201;
			res.end(JSON.stringify({ msg }));
		}).catch(err => {
			res.status = 500;
			res.end(JSON.stringify({
				msg: err
			}));
		});
	});
}
function updatePricing(req, res) {
	EditingModel.update("UPDATED EDITING PRICING");
	res.end("Updated editing pricing");
}
async function removePricing(req, res) {
	res.setHeader("Content-Type","application/json");
	await getBodyData(req).then(async (body) => {
		// Pull out only necessary attributes from body to remove editing data
		let { id } = body;

		await EditingModel.remove(id).then((msg) => {
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