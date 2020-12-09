/*
	Reedmaking controller
	Interacts with reedmaking model
*/

// Import reedmaking model
const ReedmakingModel = require('../models/reedmakingModel');

async function getReedmakingPricings(req,res) {
	try {
		// Handle headers
		res.setHeader("Content-Type","application/json");

		// Handle reedmaking response using model -> await promise
		await ReedmakingModel.getAllPricings().then(pricings => {
			res.statusCode = 200;
			res.end(JSON.stringify(pricings));
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
	getReedmakingPricings
}