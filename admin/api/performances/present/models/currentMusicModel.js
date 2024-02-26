/*
	File contains request methods for dealing directly with the corresponding data
*/

const { getDatabaseCollection, ObjectId } = require('../../../../../utils/mongodb.js');

// Local
// const PERFORMANCES_ID = '643f2c7902f9afc80224e7c3';
// Remote
const PERFORMANCES_ID = '64359642dd85c7fd598530ca';
/*
	Future add documentation
*/
function add(newSong) {
	return new Promise((resolve,reject) => {
		getDatabaseCollection('performances').then(async ({ collection, closeConnection }) => {
			let result = await collection.findOneAndUpdate({
				_id: new ObjectId(PERFORMANCES_ID)
			}, {
				$push: {
					"present.performances": {
						id: new ObjectId(),
						name: newSong['name'],
						by: newSong['by'],
						description: newSong['description']
					}
				}
			});

			// Close connection now that database operations are done
			closeConnection();

			if (result.ok) {
				resolve(`Successfully added new song: ${newSong['name']}`);
			}
			else {
				reject("Internal Server Error. Try again later");
			}
		});
	})
}
/*
	Future update documentation
*/
function update(editedSong) {
	return new Promise((resolve,reject) => {
		getDatabaseCollection('performances').then(async ({ collection, closeConnection }) => {
			let result = await collection.findOneAndUpdate({
				_id: new ObjectId(PERFORMANCES_ID)
			}, {
				$set: {
					'present.performances.$[el].name': editedSong['name'],
					'present.performances.$[el].by': editedSong['by'],
					'present.performances.$[el].description': editedSong['description']
				}
			}, {
				arrayFilters: [{ 'el.id': new ObjectId(editedSong['id']) }]
			});

			// Close connection now that database operations are done
			closeConnection();

			if (result.ok) {
				resolve(`Successfully updated ${editedSong['name']} by ${editedSong['by']}`);
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
function remove(songID) {
	return new Promise((resolve,reject) => {
		getDatabaseCollection('performances').then(async ({ collection, closeConnection }) => {
			let result = await collection.findOneAndUpdate({
				_id: new ObjectId(PERFORMANCES_ID)
			}, {
				$pull: {
					'present.performances': {
						id: new ObjectId(songID)
					}
				}
			});

			// Close connection now that database operations are done
			closeConnection();

			if (result.ok) {
				resolve("Successfully removed present performance!");
			}
			else {
				reject("Internal Server Error. Try again later");
			}
		});
	})
}

module.exports = {
	add,
	update,
	remove
}