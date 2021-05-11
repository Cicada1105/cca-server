/*
	File contains request methods for dealing directly with the corresponding data
*/

// Import reedmaking data to be used by the model
const reedmakingPricesPath = "./site_data/reedmaking.json";
// Require method to retrieve file data
const { getFileData } = require("../../../utils.js");
// Require method for writing to file
const { writeToFile } = require("../../utils.js");

/*
	Future add documentation
*/
function add(newPricing) {
	return new Promise((resolve,reject) => {
		resolve(`Adding new reedmaking pricing: ${newPricing}`);
	})
}
/*
	Future update documentation
*/
function update(pricing) {
	return new Promise((resolve,reject) => {
		resolve(`Updating existing reedmaking pricing: ${pricing}`);
	})
}
/*
	Future remove documentation
*/
function remove(pricingID) {
	return new Promise((resolve,reject) => {
		// Get prices from file
		const reedmakingPrices = getFileData(reedmakingPricesPath);

		let index = reedmakingPrices.findIndex((pricing) => pricing.id === pricingID);
		if (index === -1)
			reject(`Unable to find reedmaking pricing with id of: ${pricingID}`);
		else {
			// Filter out reedmaking pricing who's ID matches that of pricingID
			let updatedPricings = reedmakingPrices.filter((pricing) => pricing.id !== pricingID );
			// Update file, reflectting new pricings
			try {
				writeToFile(reedmakingPricesPath, JSON.stringify(updatedPricings));
				console.log("Updated pricings");
				console.log(updatedPricings);
				resolve("Successfully removed reedmaking pricing!");
			} catch(e) {
				console.log(err);
				reject("Internal Server Error. Try again later");
			}
		}
	})
}

module.exports = {
	add,
	update,
	remove
}