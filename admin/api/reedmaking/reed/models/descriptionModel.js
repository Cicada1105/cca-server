/*
	File contains request methods for dealing directly with the corresponding data
*/

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
function update({ id, description }) {
	return new Promise((resolve,reject) => {
		getDatabaseCollection('reedmaking').then(async ({ collection, closeConnection }) => {
			const result = await collection.findOneAndUpdate({ 
				_id: new ObjectId(id) 
			}, { 
				$set: { description }
			});

			// Close connection now that database operations are done
			closeConnection();

			if (result.ok) {
				let { value } = result;
				resolve(`Successfully updated ${value['name']}'s description to \"${description}\"`);
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