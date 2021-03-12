/*
	File contains request methods for dealing directly with the corresponding data
*/

// Import editing data to be used by the model
const editingDataPath = "./site_data/editing.json";
// Import fs to handle file calls
const fs = require("fs");
// Require method to retrieve file data
const { getFileData } = require("../../../utils.js");
/*
	Future add documentation
*/
function add(litType) {
	console.log(`Adding new editing literature type: ${litType}`)
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