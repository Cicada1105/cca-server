/*
	File contains request methods for dealing directly with the corresponding data
*/

// Import performance data to be used by the model
const editingDataPath = "./site_data/editing.json";
// Require method for writing to file
const { writeToFile } = require("../../utils.js");
// Require method to retrieve file data
const { getFileData } = require("../../../utils.js");
// Import uuid for adding new resource
const { v4: uuidv4 } = require("uuid");
/*
	Future add documentation
*/
function add(genreData) {
	return new Promise((resolve,reject) => {
		// Get editing data from file
		let editingData = getFileData(editingDataPath);
		// Retrieve Literature type index associated with genre
		let litTypeIndex = editingData.findIndex(lit => lit.id === genreData.litID);
		let litTypeData = editingData[litTypeIndex];
		// Retrieve all current genres of literature type
		let genres = litTypeData["genres"];

		// Create unique ID for new genre
		let genreWithID = {
			id: uuidv4(),
			display: genreData["display"],
			value: genreData["value"]
		};
		
		// Push new genre into array of other genres
		genres.push(genreWithID);
		// Update literature type
		litTypeData["genres"] = genres;
		// Override old data 
		editingData[litTypeIndex] = litTypeData;
		// Write to file, catching any error that may occur
		try {
			writeToFile(editingDataPath,JSON.stringify(editingData));
			resolve("Successfully added new editing genre")
		} catch(e) {
			reject("Internal Server Error. Try again later");
		}
	});
}
/*
	Future update documentation
*/
function update(genre) {
	console.log(`Updating existing editing genre: ${genre}`)
}
/*
	Future remove documentation
*/
function remove(genreID) {
	return new Promise((resolve,reject) => {
		console.log(`Removing editing genre with id of: ${genreID}`);

		/*editingDataPath.forEach((litType) => {
			litType.child["child"].forEach((editingType) => {
				editingType["child"].forEach((rate) => {

				})
			})
		})*/
		/*
		if (index === -1)
			reject(`Unable to find editing genre with id of: ${genreID}`);
		else {
			// Filter out editing genre who's ID matches that of genreID
			let updatedPricings = editingPrices.filter((genre) => genre.id !== genreID );
			// Update file, reflectting new pricings
			fs.writeFile("./site_data/editing.json",JSON.stringify(updatedPricings),"utf8",(err) => {
				if (err) {
					console.log(err);
					reject("Internal Server Error. Try again later");
				}
				else {
					console.log("Updated pricings");
					console.log(updatedPricings);
					resolve("Successfully removed editing genre!");
				}

			});
		}*/
		resolve("Removed editing genre");
	})
}

module.exports = {
	add,
	update,
	remove
}