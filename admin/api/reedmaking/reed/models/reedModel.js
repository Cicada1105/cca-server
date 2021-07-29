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
function add({ name, description, pricing }) {
	return new Promise((resolve,reject) => {
		resolve(`Adding new reed: ${name}`);
	})
}
/*
	Future update documentation
*/
/*function update(reed) {
	return new Promise((resolve,reject) => {
		resolve(`Updating existing reed: ${reed}`);
	})
}*/
/*
	Future remove documentation
*/
function remove(reedID) {
	return new Promise((resolve,reject) => {
		resolve("Removed reed");
	})
}

module.exports = {
	add,
	remove
}