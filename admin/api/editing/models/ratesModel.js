/*
	File contains request methods for dealing directly with the corresponding data
*/

// Import editing data to be used by the model
const editingDataPath = "./site_data/editing.json";
// Require method to retrieve file data
const { getFileData } = require("../../../utils.js");
// Require method for writing to file
const { writeToFile } = require("../../utils.js");
// Import uuid for adding new resource
const { v4: uuidv4 } = require("uuid");
/*
	Future add documentation
*/
function add(rateData) {
	return new Promise((resolve,reject) => {
		// Get rates data from file
		let editingData = getFileData(editingDataPath);
		// Retrieve literature type associated with current rate
		let litTypeIndex = editingData.findIndex(lit => lit.id === rateData.litID);
		let litTypeData = editingData[litTypeIndex];
		// Retrieve editing type and its rates associated with current rate
		let editingTypes = litTypeData["editing"];
		let editType = editingTypes[rateData.editingType];
		let editTypeRates = editType["rates"];

		// Create unique id for new rate
		let rateWithID = {
			id: uuidv4(),
			min: rateData["min"],
			max: rateData["max"],
			flatRate: rateData["flatRate"],
			perHour: rateData["perHour"],
			perWord: rateData["perWord"]
		}

		// Push new rate into array with other rates
		editTypeRates.push(rateWithID);
		// Update rates
		editType["rates"] = editTypeRates
		// Update editing type
		editingTypes[rateData.editingType] = editType;
		// Update editing
		litTypeData.editing = editingTypes;
		editingData[litTypeIndex] = litTypeData;

		// Write to file, catching any error that may occur
		try {
			writeToFile(editingDataPath,JSON.stringify(editingData));
			resolve(`Successfully added new rate to the ${editingData[litTypeIndex].type} editing type of ${rateData.editingType}`);
		} catch(e) {
			reject("Internal Server Error. Try again later");
		}
	})
}
/*
	Future update documentation
*/
function update(rate) {
	console.log(`Updating existing editing rate: ${rate}`)
}
/*
	Future remove documentation
*/
function remove(uniqueRateData) {
	return new Promise((resolve,reject) => {
		// Get editing data from file
		let editingData = getFileData(editingDataPath); 
		// Retrieve index of literature type associatd with rate
		let litTypeIndex = editingData.findIndex(lit => lit.id === uniqueRateData.litID);
		let litData = editingData[litTypeIndex];
		// Select editing type associated with rate
		let litEditingTypes = litData["editing"];
		let litEditingType = litEditingTypes[uniqueRateData["editingType"]];
		let editingTypeRates = litEditingType.rates;

		// Filter out rate based on id to remove it from the rest
		let filteredRates = editingTypeRates.filter(rate => rate.id !== uniqueRateData.rateID);

		// Update data to reflect changes
		litEditingType["rates"] = filteredRates;
		litEditingTypes[uniqueRateData["editingType"]] = litEditingType;
		litData["editing"] = litEditingTypes;
		editingData[litTypeIndex] = litData;

		// Write to file, catching any error that may occur
		try {
			writeToFile(editingDataPath,JSON.stringify(editingData));
			resolve(`Successfully removed ${uniqueRateData["editingType"]} rate from ${editingData[litTypeIndex].type} section`);
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