/*
	Method for handling API requests and building responses
*/

// Import models to handle actual data
const FuturePerformancesModel = require("../models/rootModel.js");

// Import utility function for handling the retrieval of body data
const { getBodyData } = require("../../../utils.js");

async function addPerformance(req, res) {
	res.setHeader("Content-Type","application/json");
	// Get song data from body
	await getBodyData(req).then(async (body) => {
		// Pull out only necessary info for adding 
		let { name, location, instruments, date, time: { start, end }, description } = body;

		// Add new song
		await FuturePerformancesModel.add({
			name,
			location,
			instruments,
			date,
			time: {
				start,
				end
			},
			description
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
async function updatePerformance(req, res) {
	res.setHeader("Content-Type","application/json");
	
	await FuturePerformancesModel.update("UPDATED FUTURE PERFORMANCE").then((msg) => {
		res.status = 200;
		res.end(JSON.stringify({ msg }));
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