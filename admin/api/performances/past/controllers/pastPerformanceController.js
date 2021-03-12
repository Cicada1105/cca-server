/*
	File for handling API requests and building responses
*/

// Import model to handle data
const PastPerformancesModel = require("../models/pastPerformancesModel.js");

// Import utility function for handling the retrieval of body data
const { getBodyData } = require("../../../utils.js");

async function addPerformance(req, res) {
	res.setHeader("Content-Type","application/json");
	// Get song data from body
	await getBodyData(req).then(async (body) => {
		// Pull out only necessary info for adding 
		let { name, description, location, instruments, date, img: { src, alt } } = body;

		// Add new song
		await PastPerformancesModel.add({
			name,
			description,
			location,
			instruments,
			date,
			img: {
				src, 
				alt
			}
		}).then((msg) => {
			res.status = 201;	
			res.end(JSON.stringify({ msg }))
		}).catch((err) => {
			res.status = 500;
			res.end(JSON.stringify({
				msg: err
			}));
		})
	}).catch((err) => {
		console.log("Error:")
		console.log(err.message);
		console.log(err.stack);

		res.status = 500;
		res.end(JSON.stringify({
			msg: "Problem getting body data"
		}));
	})
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