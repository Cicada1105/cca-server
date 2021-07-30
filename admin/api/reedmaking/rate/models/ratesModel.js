/*
	File contains request methods for dealing directly with the corresponding data
*/

// Import reedmaking data to be used by the model
const reedmakingPricesPath = "./site_data/reedmaking.json";
// Require method to retrieve file data
const { getFileData } = require("../../../../utils.js");
// Require method for writing to file
const { writeToFile } = require("../../../utils.js");

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
function remove(pricingData) {
	return new Promise((resolve,reject) => {
		// Retrieve reedmaking data
		let reedmakingData = getFileData(reedmakingPricesPath);
		// Retrieve index of reed id associated with current rate
		let reedIndex = reedmakingData.findIndex(reed => reed.id === pricingData["reedID"]);
		// Store reed at reedIndex
		let reed = reedmakingData[reedIndex];
		// Retrieve index of reed pricing id
		let pricingIndex = reed["pricing"].findIndex(price => price.id === pricingData.pricingID);

		// Remove specified reed, based on index, from rest of prices
		let removedPrice = reed["pricing"].splice(pricingIndex,1);
		// Update original reedmaking data to reflect updated prices
		reedmakingData[reedIndex] = reed;
		// Write to file, catching any error that may occur
		try {
			writeToFile(reedmakingPricesPath,JSON.stringify(reedmakingData));
			resolve(`Successfully removed ${reed["name"]}'s price`);
		} catch(e) {
			reject("Internal Server Error. Try again later");
		}
	})
}

module.exports = {
	add,
	update,
	remove
}