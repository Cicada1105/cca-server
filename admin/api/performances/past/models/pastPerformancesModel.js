/*
	File contains request methods for dealing directly with the corresponding data
*/

const { getDatabaseCollection, ObjectId } = require('../../../../../utils/mongodb.js');

const PERFORMANCES_ID = '64359642dd85c7fd598530ca';

/*
	Future add documentation
*/
function add(newPerformance) {
	return new Promise((resolve,reject) => {
		getDatabaseCollection('performances').then(async ({ collection, closeConnection }) => {
			let result = await collection.findOneAndUpdate({
				_id: new ObjectId(PERFORMANCES_ID)
			}, {
				$push: {
					past: {
						id: new ObjectId(),
						name: newPerformance['name'],
						description: newPerformance['description'], 
						location: newPerformance['location'], 
						date: newPerformance['date'], 
						instruments: newPerformance['instruments'], 
						img: newPerformance['img']
					}
				}
			});

			// Close connection now that database operations are done
			closeConnection();

			if (result.ok) {
				resolve(`Successfully added new past performance: ${newPerformance['name']}`);
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
function update(editedPerformance) {
	return new Promise((resolve,reject) => {
		getDatabaseCollection('performances').then(async ({ collection, closeConnection }) => {
			let { id, name, description, location, date, instruments, img } = editedPerformance;
			let updatedPerformance = {
				'past.$[el].name':  name,
				'past.$[el].description': description,
				'past.$[el].location': location,
				'past.$[el].date': date,
				'past.$[el].instruments': instruments
			};

			if (img.src) {
				updatedPerformance = { 
					...updatedPerformance, 
					'past.$[el].img': { 
						src: img.src, 
						alt: img.alt 
					}
				}
			}

			let result = await collection.findOneAndUpdate({
				_id: new ObjectId(PERFORMANCES_ID)
			}, {
				$set: updatedPerformance
			}, {
				arrayFilters: [{ 'el.id': new ObjectId(id) }]
			});

			if (result.ok) {
				resolve(`Successfully updated ${editedPerformance['name']}`);
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
function remove(performanceID) {
	return new Promise((resolve,reject) => {
		getDatabaseCollection('performances').then(async ({ collection, closeConnection }) => {
			let result = await collection.findOneAndUpdate({
				_id: new ObjectId(PERFORMANCES_ID)
			}, {
				$pull: {
					past: {
						id: new ObjectId(performanceID)
					}
				}
			});

			// Close connection now that database operations are done
			closeConnection();

			if (result.ok) {
				resolve("Successfully removed past performance!");
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