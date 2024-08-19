/*
	File contains request methods for dealing directly with the corresponding data
*/

const { getDatabaseCollection, ObjectId } = require('../../../../utils/mongodb.js');

/*
	Future add documentation
*/
function add(genreData) {
	return new Promise((resolve,reject) => {
		getDatabaseCollection('editing').then(async ({ collection }) => {
			let result = await collection.findOneAndUpdate({
				_id: new ObjectId(genreData['litID'])
			},{
				$push: {
					genres: {
						id: new ObjectId(),
						display: genreData['display'],
						value: genreData['value']
					}
				}
			});

			if (result.ok) {
				let { value: { type } } = result;
				resolve(`Successfully added ${genreData["display"]} to ${type}'s genres`);
			}
			else {
				reject("Internal Server Error. Try again later");
			}
		});
	});
}
/*
	Future update documentation
*/
function update(genreData) {
	return new Promise((resolve,reject) => {
		getDatabaseCollection('editing').then(async ({ collection }) => {
			let { litID, genreID, display, value } = genreData;

			let result = await collection.findOneAndUpdate({
				_id: new ObjectId(litID)
			}, {
				$set: {
					'genres.$[el].display': display,
					'genres.$[el].value': value
				}
			},{
				arrayFilters: [{ 'el.id': new ObjectId(genreID) }]
			});

			if (result.ok) {
				let { value: { type } } = result;

				resolve(`Successfully updated ${type}'s genre of ${display}`);
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
function remove(uniqueGenreData) {
	return new Promise((resolve,reject) => {
		getDatabaseCollection('editing').then(async ({ collection }) => {
			let { litID, genreID } = uniqueGenreData;

			let result = await collection.findOneAndUpdate({
				_id: new ObjectId(litID)
			}, {
				$pull: {
					genres: {
						id: new ObjectId(genreID)
					}
				}
			});

			if (result.ok) {
				let { value } = result;

				resolve(`Successfully removed genre from ${value.type}`);	
			}
			else {
				reject("Internal Server Error. Try again later");
			}
		})
	})
}

module.exports = {
	add,
	update,
	remove
}