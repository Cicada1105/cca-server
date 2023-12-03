/*
	File contains request methods for dealing directly with the corresponding data
*/

const { getDatabaseCollection, ObjectId } = require('../../../../../utils/mongodb.js');
const { removeImage } = require("../../../utils");

// Local
const PERFORMANCES_ID = '643f2c7902f9afc80224e7c3';
// Remote
//const PERFORMANCES_ID = '64359642dd85c7fd598530ca';

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
					"past.performances": {
						id: new ObjectId(),
						name: newPerformance['name'],
						description: newPerformance['description'], 
						location: newPerformance['location'], 
						date: newPerformance['date'], 
						instruments: newPerformance['instruments'], 
						img: {
							src: newPerformance['img']['fileName'],
							alt: newPerformance['img']['alt']
						}
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
				'past.performances.$[el].name':  name,
				'past.performances.$[el].description': description,
				'past.performances.$[el].location': location,
				'past.performances.$[el].date': date,
				'past.performances.$[el].instruments': instruments
			};

			if (img.fileName) {
				updatedPerformance = { 
					...updatedPerformance, 
					'past.performances.$[el].img': { 
						src: img.fileName,
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

			if (img.fileName) {
				// Retrieve original performance updated to get the old file name in order to delete it from the server
				let oldPerformance = result['value']['past']['performances'].find( performance => {
					return performance.id == id;
				});

				removeImage(oldPerformance['img'].src);	
			}

			// Close connection now that database operations are done
			closeConnection();

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
					'past.performances': {
						id: new ObjectId(performanceID)
					}
				}
			});

			// Close connection now that database operations are done
			closeConnection();

			// Retrieve original performance updated to get the old file name in order to delete it from the server
			let oldPerformance = result['value']['past']['performances'].find( performance => {
				return performance.id == performanceID;
			});

			removeImage(oldPerformance['img'].src);

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