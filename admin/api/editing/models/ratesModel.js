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
function remove(rateID) {
	return new Promise((resolve,reject) => {
		console.log(`Removing editing rate with id of: ${rateID}`);

		/*editingDataPath.forEach((litType) => {
			litType.child["child"].forEach((editingType) => {
				editingType["child"].forEach((rate) => {

				})
			})
		})*/
		/*
		if (index === -1)
			reject(`Unable to find editing rate with id of: ${rateID}`);
		else {
			// Filter out editing rate who's ID matches that of rateID
			let updatedPricings = editingPrices.filter((rate) => rate.id !== rateID );
			// Update file, reflectting new pricings
			fs.writeFile("./site_data/editing.json",JSON.stringify(updatedPricings),"utf8",(err) => {
				if (err) {
					console.log(err);
					reject("Internal Server Error. Try again later");
				}
				else {
					console.log("Updated pricings");
					console.log(updatedPricings);
					resolve("Successfully removed editing rate!");
				}

			});
		}*/
		resolve("Removed editing rate");
	})
}

module.exports = {
	add,
	update,
	remove
}