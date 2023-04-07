/*
	File contains request methods for dealing directly with the corresponding data
*/

const { getDatabaseCollection, ObjectId } = require('../../../../../utils/mongodb.js');

/*
	Future add documentation
*/
function add({ name, description, pricing }) {
	return new Promise((resolve,reject) => {
		// Retrieve reedmaking data
		//const reedmakingData = getFileData(reedmakingPricesPath);
		getDatabaseCollection('reedmaking').then(async ({ collection, closeConnection }) => {
			// Format new reed based on received arguments
			let newReed = {
				name,
				description,
				pricing: []
			}
			// Loop through pricings, adding in unique id for each, then adding to newRead object
			pricing.forEach(price => {
				let priceWithID = { id: new ObjectId(), ...price };
				newReed["pricing"].push(priceWithID);
			});

			try {
				// Push new reed onto old reedmaking data
				let result = await collection.insertOne(newReed);

				resolve(`Successfully added \"${newReed["name"]}\" to reedmaking page`);
			} catch(e) {
				reject("Internal Server Error. Try again later");
			} finally {
				// Close the connection now that operations are done
				closeConnection();
			}
		});
	})
}
/*
	Future update documentation
*/
/*function update(reed) {
	return new Promise((resolve,reject) => {
		resolve(`Updating existing reed: ${reed}`);
	})
}*/
/*
	Future remove documentation
*/
function remove(reedID) {
	return new Promise((resolve,reject) => {
		getDatabaseCollection('reedmaking').then(async ({ collection, closeConnection }) => {
			const result = await collection.findOneAndDelete({ _id: new ObjectId(reedID) });

			// Close the connection now that operations are done
			closeConnection();

			if (result.ok) {
				// Retrieve the removed reed to alert user that reed was removec
				let { value: { name } } = result;
				resolve(`Successfully removed ${name} from the reedmaking page`);
			}
			else {
				reject("Internal Server Error. Try again later");
			}
		})
	})
}

module.exports = {
	add,
	remove
}