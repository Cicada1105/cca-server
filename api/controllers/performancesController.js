/*
	Performance controller
	Interacts with performance model
*/

// Import performance model
const PerformanceModel = require('../models/performancesModel');

async function getPastPerformances(req,res) {
	try {
		// Handle headers
		res.setHeader("Content-Type","application/json");

		// Handle past response using model -> await promise
		await PerformanceModel.filterBy("past").then(past => {
			res.statusCode = 200;
			res.end(JSON.stringify(past))
		}).catch((err) => {
			res.statusCode = 500;
			res.end(JSON.stringify(err));
		});
	}
	catch(e) {
		console.log(e);
	}
}
async function getPresentPerformances(req,res) {
	try {
		// Handle headers
		res.setHeader("Content-Type","application/json");

		// Handle response using present model -> await promise
		await PerformanceModel.filterBy("present").then(present => {
			res.statusCode = 200;
			res.end(JSON.stringify(present));
		}).catch(err => {
			res.statusCode = 500;
			res.end(JSON.stringify(err));
		});
	}
	catch(e) {
		console.log(e)
	}
}
async function getFuturePerformances(req,res) {
	try {
		// Handle headers
		res.setHeader("Content-Type","application/json");

		// Handle future using present model -> await promise
		await PerformanceModel.filterBy("future").then(future => {
			res.statusCode = 200;
			res.end(JSON.stringify(future));
		}).catch(err => {
			res.statusCode = 500;
			res.end(JSON.stringify(err));
		});
	}
	catch(e) {
		console.log(e);
	}
}

module.exports = {
	getPastPerformances,
	getPresentPerformances,
	getFuturePerformances
}