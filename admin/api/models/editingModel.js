/*
	File contains request methods for dealing directly with the corresponding data
*/

// Import performance data to be used by the model
const editingPricings = require("../../../site_data/editing.json");
// Import fs to handle file calls
const fs = require("fs");
// Require method to retrieve file data
const { getFileData } = require("../../utils.js");
/*
	Future add documentation
*/
function add(newPricing) {
	console.log(`Adding new editing pricing: ${newPricing}`)
}
/*
	Future update documentation
*/
function update(pricing) {
	console.log(`Updating existing editing pricing: ${pricing}`)
}
/*
	Future remove documentation
*/
function remove(pricingID) {
	return new Promise((resolve,reject) => {
		console.log(`Removing editing pricing with id of: ${pricingID}`);

		/*editingPricings.forEach((litType) => {
			litType.child["child"].forEach((editingType) => {
				editingType["child"].forEach((rate) => {

				})
			})
		})*/
		/*
		if (index === -1)
			reject(`Unable to find editing pricing with id of: ${pricingID}`);
		else {
			// Filter out editing pricing who's ID matches that of pricingID
			let updatedPricings = editingPrices.filter((pricing) => pricing.id !== pricingID );
			// Update file, reflectting new pricings
			fs.writeFile("./site_data/editing.json",JSON.stringify(updatedPricings),"utf8",(err) => {
				if (err) {
					console.log(err);
					reject("Internal Server Error. Try again later");
				}
				else {
					console.log("Updated pricings");
					console.log(updatedPricings);
					resolve("Successfully removed editing pricing!");
				}

			});
		}*/
		resolve("Removed eiting price");
	})
}

module.exports = {
	add,
	update,
	remove
}