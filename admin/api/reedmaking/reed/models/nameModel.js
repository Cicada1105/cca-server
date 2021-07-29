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
/*function add(newReed) {
	return new Promise((resolve,reject) => {
		resolve(`Adding new reedm: ${newReed}`);
	})
}*/
/*
	Future update documentation
*/
function update({ id, name }) {
	return new Promise((resolve,reject) => {
		resolve(`Updating existing reed name: ${name}`);
	})
}
/*
	Future remove documentation
*/
/*function remove(reedID) {
	return new Promise((resolve,reject) => {
		resolve("Removed reed");
	})
}*/

module.exports = { update }