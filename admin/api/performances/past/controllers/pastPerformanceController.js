/*
	File for handling API requests and building responses
*/

// Import model to handle data
const PastPerformancesModel = require("../models/pastPerformancesModel.js");

// Import utility function for handling the retrieval of body data
const { getBodyData } = require("../../../utils");

async function addPerformance(req, res) {
	// Get performance data from body
	await getBodyData(req).then(async (body) => {
		// Pull out only necessary info for adding performance
		let { name, description, location, instruments, date, img: { newFileName, data } } = body;

		// Pass in request as the definition of the 'this' parameter
		await PastPerformancesModel.add.call(req, {
			name,
			description,
			location,
			instruments,
			date,
			img: {
				newFileName,
				data
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
async function updatePerformance(req, res) {
	await getBodyData(req).then(async (body) => {
		// Pull out only necessary info for editing performance
		let { id, name, description, location, instruments, date, img:{ oldFileName, newFileName, data }} = body;

		// Pass in request as the definition of the 'this' parameter
		await PastPerformancesModel.update.call(req, { 
			id, name, description, 
			location, date, 
			instruments, 
			img:{
				oldFileName,
				newFileName,
				data
			}
		}).then((msg) => {
			res.status = 200;
			res.end(JSON.stringify({ msg }))
		}).catch((err) => {
			res.status = 500;
			res.end(JSON.stringify({
				msg: "Problem getting body data"
			}));
		});
	})
}
async function removePerformance(req, res) {
	await getBodyData(req).then(async (body) => {
		// Pull out only necessary attributes from body to remove past performance
		let { id, oldFileName } = body;

		// Pass in request as the definition of the 'this' parameter
		await PastPerformancesModel.remove.call(req, { 
			id,
			oldFileName
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
	addPerformance,
	updatePerformance,
	removePerformance
}