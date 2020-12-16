/*
	File contains request methods for dealing directly with the corresponding data
*/

// Import reedmaking data to be used by the model
const reedmakingPricesPath = "./site_data/reedmaking.json";
// Import fs to handle file calls
const fs = require("fs");

/*
	Future add documentation
*/
function add(newPricing) {
	console.log(`Adding new reedmaking pricing: ${newPricing}`)
}
/*
	Future update documentation
*/
function update(pricing) {
	console.log(`Updating existing reedmaking pricing: ${pricing}`)
}
/*
	Future remove documentation
*/
function remove(pricingID) {
	return new Promise((resolve,reject) => {
		console.log(`Removing reedmaking pricing with id of: ${pricingID}`);

		// Get prices from file
		const reedmakingPricesBuffer = fs.readFileSync(reedmakingPricesPath);
		const reedmakingPricesJSON = reedmakingPricesBuffer.toString();
		const reedmakingPrices = JSON.parse(reedmakingPricesJSON);

		let index = reedmakingPrices.findIndex((pricing) => pricing.id === pricingID);
		if (index === -1)
			reject(`Unable to find reedmaking pricing with id of: ${pricingID}`);
		else {
			// Filter out reedmaking pricing who's ID matches that of pricingID
			let updatedPricings = reedmakingPrices.filter((pricing) => pricing.id !== pricingID );
			// Update file, reflectting new pricings
			fs.writeFile("./site_data/reedmaking.json",JSON.stringify(updatedPricings),"utf8",(err) => {
				if (err) {
					console.log(err);
					reject("Internal Server Error. Try again later");
				}
				else {
					console.log("Updated pricings");
					console.log(updatedPricings);
					resolve("Successfully removed reedmaking pricing!");
				}
			});
		}
	})
}

module.exports = {
	add,
	update,
	remove
}