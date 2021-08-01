/*
	File contains request methods for dealing directly with the corresponding data
*/

// Import reedmaking data to be used by the model
const reedmakingPricesPath = "./site_data/reedmaking.json";
// Require method to retrieve file data
const { getFileData } = require("../../../../utils.js");
// Require method for writing to file
const { writeToFile } = require("../../../utils.js");
// Import uuid for adding new resource
const { v4: uuidv4 } = require("uuid");

/*
	Future add documentation
*/
function add(pricingData) {
	return new Promise((resolve,reject) => {
		// Retrieve reedmaking data
		let reedmakingData = getFileData(reedmakingPricesPath);
		// Retrieve index of reed id associated with current rate
		let reedIndex = reedmakingData.findIndex(reed => reed.id === pricingData["reedID"]);
		// Store reed located at reedIndex
		let reed = reedmakingData[reedIndex];

		let newPricing = pricingData["pricing"];
		// Create new pricing with unique id
		let newRate = {
			id: uuidv4(),
			quantity: newPricing["quantity"],
			cost: newPricing["cost"]
		}
		// Push new rate into array of rest of rates
		reed["pricing"].push(newRate);
		// Update original reedmaking data
		reedmakingData[reedIndex] = reed;

		// Write to file, catching any error that may occur
		try {
			writeToFile(reedmakingPricesPath,JSON.stringify(reedmakingData));
			resolve(`Successfully added new pricing to ${reed["name"]}'s rates`);
		} catch(e) {
			reject("Internal Server Error. Try again later");
		}
	})
}
/*
	Future update documentation
*/
function update(updatedPricing) {
	return new Promise((resolve,reject) => {
		// Retrieve reedmaking data
		let reedmakingData = getFileData(reedmakingPricesPath);
		// Retrieve index of reed associated with current rate
		let reedIndex = reedmakingData.findIndex(reed => reed.id === updatedPricing["reedID"]);
		// Retrieve reed stored at reedIndex
		let reed = reedmakingData[reedIndex];
		// Retrieve index of rate associated with current pricing
		let pricingIndex = reed["pricing"].findIndex(rate => rate.id === updatedPricing["pricing"].id)
		// Retrieve rate stored at pricingIndex
		let pricing = reed.pricing[pricingIndex];

		// Update rate
		pricing["quantity"] = updatedPricing["pricing"].quantity;
		pricing["cost"] = updatedPricing["pricing"].cost;

		// Update reed pricing
		reed.pricing[pricingIndex] = pricing;
		// Update original reedmaking data
		reedmakingData[reedIndex] = reed;

		// Write to file, catching any error that may occur
		try {
			writeToFile(reedmakingPricesPath,JSON.stringify(reedmakingData));
			resolve(`Successfully updated ${reed["name"]}'s rates`);
		} catch(e) {
			reject("Internal Server Error. Try again later");
		}
	})
}
/*
	Future remove documentation
*/
function remove(pricingData) {
	return new Promise((resolve,reject) => {
		// Retrieve reedmaking data
		let reedmakingData = getFileData(reedmakingPricesPath);
		// Retrieve index of reed associated with current rate
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