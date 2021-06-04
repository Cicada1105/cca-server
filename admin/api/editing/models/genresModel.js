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
			resolve(`Successfully added ${genreData["display"]} to ${litTypeData["type"]}'s genres`);
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
function remove(uniqueGenreData) {
	return new Promise((resolve,reject) => {
		// Get editing data from file
		let editingData = getFileData(editingDataPath);

		// Retrieve literature info associated with genre
		let litDataIndex = editingData.findIndex(litType => litType["id"] === uniqueGenreData["litID"]);
		// Find index of genre that contains specified id; Index used for splicing and getting genre text
		let genres = editingData[litDataIndex].genres;
		let genreIndex = genres.findIndex(genre => genre["id"] === uniqueGenreData["genreID"]);
		// Filter out genre based on id to remove it from the rest
		let removedGenre = genres.splice(genreIndex,1);

		// Update literature type assocaited with genre chosen to be removed
		editingData[litDataIndex].genres = genres;

		// WRite to file, catching any error that may occur
		try {
			writeToFile(editingDataPath,JSON.stringify(editingData));
			resolve(`Successfully removed ${removedGenre[0].display} from ${editingData[litDataIndex].type}'s genres`);
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