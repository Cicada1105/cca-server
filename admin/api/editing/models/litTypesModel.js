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
function add(litData) {
	return new Promise((resolve,reject) => {
		// Get rates from file
		let editingData = getFileData(editingDataPath);
		// Add unique IDs to genres
		let genresWithIDs = litData.genres.map(genre => { 
			return { id: uuidv4(), display: genre, value: genre.toLowerCase().split(" ").join("") }
		});

		// Add unique IDs to rates
		let ratesWithIDs = {
			"Standard Proofreading": { "rates": [] },
			"Developmental Editing": { "rates": [] },
			"Both": { "rates": [] }
		}

		// Retrieve editing type rates
		let stndrdRates = litData.rates["standard_proofreading"];
		let devEditingRates = litData.rates["developmental_editing"];
		let bothRates = litData.rates["both"];
		// Insert unique IDs for each rate
		let stndrdRatesWithIDs = stndrdRates.map(rate => { return {id: uuidv4(), ...rate}});
		let devEditingRatesWithIDs = devEditingRates.map(rate => { return { id: uuidv4(), ...rate}});
		let bothRatesWithIDs = bothRates.map(rate => { return { id: uuidv4(), ...rate}});

		ratesWithIDs["Standard Proofreading"]["rates"] = stndrdRatesWithIDs;
		ratesWithIDs["Developmental Editing"]["rates"] = devEditingRatesWithIDs;
		ratesWithIDs["Both"]["rates"] = bothRatesWithIDs;

		let newLitType = {
			id: uuidv4(),
			type: litData["type"],
			genres: genresWithIDs,
			editing: ratesWithIDs
		}

		// Push new lit type into array with other lit types
		editingData.push(newLitType);
		// Write to file, catching any error that may occur
		try {
			writeToFile(editingDataPath,JSON.stringify(editingData));
			resolve(`Successfully added ${litData.type}'s genres and rates to editing page`);
		} catch(e) {
			console.log(e);
			reject("Internal Server Error. Try again later");
		}
	})
}
/*
	Future update documentation
*/
function update(litType) {
	console.log(`Updating existing editing litType: ${litType}`)
}
/*
	Future remove documentation
*/
function remove(litTypeID) {
	return new Promise((resolve,reject) => {
		console.log(`Removing editing literature type with id of: ${litTypeID}`);

		/*editingDataPath.forEach((litType) => {
			litType.child["child"].forEach((editingType) => {
				editingType["child"].forEach((rate) => {

				})
			})
		})*/
		/*
		if (index === -1)
			reject(`Unable to find editing literature type with id of: ${litTypeID}`);
		else {
			// Filter out editing literature type who's ID matches that of litTypeID
			let updatedPricings = editingPrices.filter((literature type) => literature type.id !== litTypeID );
			// Update file, reflectting new pricings
			fs.writeFile("./site_data/editing.json",JSON.stringify(updatedPricings),"utf8",(err) => {
				if (err) {
					console.log(err);
					reject("Internal Server Error. Try again later");
				}
				else {
					console.log("Updated pricings");
					console.log(updatedPricings);
					resolve("Successfully removed editing literature type!");
				}

			});
		}*/
		resolve("Removed editing literature type");
	})
}

module.exports = {
	add,
	update,
	remove
}