/*
	Method for handling API requests and building responses
*/

// Import models to handle actual data
const RatesModel = require("../models/ratesModel.js");

// Import utility function for handling the retrieval of body data
const { getBodyData } = require("../../utils.js");

async function addPricing(req, res) {
	await getBodyData(req).then(async (body) => {
		// Retrieve data associated with new ricing
		let { litID, editingType, min, max, perHour, perWord, flatRate } = body;
		
		await RatesModel.add({
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
async function updatePricing(req, res) {
	await getBodyData(req).then(async (body) => {
		let { litID, editingType, rateID, min, max, perHour, perWord, flatRate } = body;
		
		await RatesModel.update({ 
			litID, 
			editingType, 
			rateID, 
			min, 
			max, 
			perHour, 
			perWord, 
			flatRate 
		}).then(msg => {
			res.status = 200;
			res.end(JSON.stringify({ msg }));
		}).catch(err => {
			err.status = 500;
			res.end(JSON.stringify({
				msg: err
			}));
		})
	})
}
async function removePricing(req, res) {
	await getBodyData(req).then(async (body) => {
		// Pull out only necessary attributes from body to remove editing data
		let { litID, editingType, rateID } = body;

		await RatesModel.remove({
			litID,
			editingType,
			rateID
		}).then(msg => {
			res.status = 200;
			res.end(JSON.stringify({ msg }));			
		}).catch(err => {
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