/*
	File contains request methods for dealing directly with the corresponding data
*/

const { getDatabaseCollection, ObjectId } = require('../../../../../utils/mongodb.js');

// Local
//const PERFORMANCES_ID = '643f2c7902f9afc80224e7c3';
// Remote
const PERFORMANCES_ID = '64359642dd85c7fd598530ca';

/*
	Future add documentation
*/
function add(newPerformance) {
	return new Promise((resolve,reject) => {
		getDatabaseCollection('performances').then(async ({ collection }) => {
			let result = await collection.findOneAndUpdate({
				_id: new ObjectId(PERFORMANCES_ID)
			}, {
				$push: {
					"future.performances": {
						id: new ObjectId(),
						name: newPerformance['name'],
						location: newPerformance['location'],
						instruments: newPerformance['instruments'],
						date: newPerformance['date'],
						time: {
							start: newPerformance['time']['start'],
							end: newPerformance['time']['end']
						},
						description: newPerformance['description']
					}
				}
			});

			if (result.ok) {
				resolve(`Successfully added new future performance: ${newPerformance['name']}`);
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
function update(updatedPerformance) {
	return new Promise((resolve,reject) => {
		getDatabaseCollection('performances').then(async ({ collection }) => {
			let { id, name, location, instruments, date, time, description } = updatedPerformance;

			let result = await collection.findOneAndUpdate({
				_id: new ObjectId(PERFORMANCES_ID)
			}, {
				$set: {
					'future.performances.$[el].name': name,
					'future.performances.$[el].location': location,
					'future.performances.$[el].instruments': instruments,
					'future.performances.$[el].date': date,
					'future.performances.$[el].time': time,
					'future.performances.$[el].description': description
				}
			}, {
				arrayFilters: [{ 'el.id': new ObjectId(id) }]
			});

			if (result.ok) {
				resolve(`Successfully updated the ${name} performance`);
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
		getDatabaseCollection('performances').then(async ({ collection }) => {
			let result = await collection.findOneAndUpdate({
				_id: new ObjectId(PERFORMANCES_ID)
			}, {
				$pull: {
					'future.performances': {
						id: new ObjectId(performanceID)
					}
				}
			});

			if (result.ok) {
				resolve("Successfully removed future performance!");
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