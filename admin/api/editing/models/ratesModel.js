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
function add(rate) {
	console.log(`Adding new editing literaturerate type: ${rate}`)
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