/*
	File contains request methods for dealing directly with the corresponding data
*/

// Import performance data to be used by the model
const editingDataPath = "./site_data/editing.json";
// Import fs to handle file calls
const fs = require("fs");
// Require method to retrieve file data
const { getFileData } = require("../../../utils.js");
/*
	Future add documentation
*/
function add(genre) {
	console.log(`Adding new editing genre: ${genre}`)
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