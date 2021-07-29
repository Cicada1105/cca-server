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
		// Retrieve reedmaking data
		let reedmakingData = getFileData(reedmakingPricesPath);
		// Locate reed index associated with reed tied to passed in id
		let reedIndex = reedmakingData.findIndex(reed => reed.id === id);
		// Store reed to update reed name
		let reed = reedmakingData[reedIndex];
		// Store old reed name to show update
		let oldReedName = reed["name"];

		// Update reed name
		reed["name"] = name;
		// Update original data
		reedmakingData[reedIndex] = reed;
		// Write to file, catching any error that may occur
		try {
			writeToFile(reedmakingPricesPath,JSON.stringify(reedmakingData));
			resolve(`Successfully updated ${oldReedName} to ${name}`);
		} catch(e) {
			reject("Internal Server Error. Try again later");
		}
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