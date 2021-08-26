/*
	File contains request methods for dealing directly with the corresponding data
*/

// Import reedmaking data to be used by the model
const reedmakingPricesPath = "./site_data/reedmaking.json";
// Require method to retrieve file data
const { getFileData } = require("../../../../utils.js");
// Require method for writing to file
const { writeToFile } = require("../../../utils.js");
// Require uuid
const { v4: uuidv4 } = require("uuid");

/*
	Future add documentation
*/
function add({ name, description, pricing }) {
	return new Promise((resolve,reject) => {
		// Retrieve reedmaking data
		const reedmakingData = getFileData(reedmakingPricesPath);

		// Format new reed based on received arguments
		let newReed = {
			id: uuidv4(),
			name,
			description,
			pricing: []
		}
		// Loop through pricings, adding in unique id for each, then adding to newRead object
		pricing.forEach(price => {
			let priceWithID = { id: uuidv4(), ...price };
			newReed["pricing"].push(priceWithID);
		});

		// Push new reed onto old reedmaking data
		reedmakingData.push(newReed);

		// Write to file, catching any error that may occur
		try {
			writeToFile(reedmakingPricesPath,JSON.stringify(reedmakingData));
			resolve(`Successfully added ${newReed["name"]} to reedmaking page`);	
		} catch(e) {
			reject("Internal Server Error. Try again later");
		}
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
		// Retrieve reedmaking data
		const reedmakingData = getFileData(reedmakingPricesPath);
		// Locate index of reed associated with current reedID
		const reedIndex = reedmakingData.findIndex(reed => reed.id === reedID);
		// Remove reed from rest of data
		const removedReeds = reedmakingData.splice(reedIndex,1);	// splice(index, length)
		const removedReed = removedReeds[0];
		
		// Write to file, catching any error that may occur
		try {
			writeToFile(reedmakingPricesPath,JSON.stringify(reedmakingData));
			resolve(`Successfully removed ${removedReed["name"]} fromm reedmaking page`);
		} catch(e) {
			reject("Internal Server Error. Try again later");
		}
	})
}

module.exports = {
	add,
	remove
}