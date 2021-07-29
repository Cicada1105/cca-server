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
function remove(pricing) {
	return new Promise((resolve,reject) => {
		resolve(`Removing reed price: ${pricing}`);
	})
}

module.exports = {
	add,
	update,
	remove
}