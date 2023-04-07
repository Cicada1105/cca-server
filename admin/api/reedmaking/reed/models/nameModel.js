/*
	File contains request methods for dealing directly with the corresponding data
*/

// Imports
const { getDatabaseCollection, ObjectId } = require('../../../../../utils/mongodb.js');

/*
	Future add documentation
*/
/*function add(newReed) {
	return new Promise((resolve,reject) => {
		resolve(`Adding new reedm: ${newReed}`);
	})
}*/
/*
	Future update documentation
*/
function update({ id, name }) {
	return new Promise((resolve,reject) => {
		getDatabaseCollection('reedmaking').then(async ({ collection, closeConnection }) => {
			const result = await collection.findOneAndUpdate({ _id: new ObjectId(id) }, { $set: { name } });

			// Close connection now that database operations are done
			closeConnection();

			if (result.ok) {
				// Retrieve old name of reed to show update
				let { value } = result;
				resolve(`Successfully updated \"${value.name}\" to \"${name}\"`);
			}
			else {
				reject("Internal Server Error. Try again later");
			}
		});
	})
}
/*
	Future remove documentation
*/
/*function remove(reedID) {
	return new Promise((resolve,reject) => {
		resolve("Removed reed");
	})
}*/

module.exports = { update }