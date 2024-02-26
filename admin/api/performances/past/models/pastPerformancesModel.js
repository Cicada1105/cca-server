/*
	File contains request methods for dealing directly with the corresponding data
*/
const utils = require('util');
const { getDatabaseCollection, ObjectId } = require('../../../../../utils/mongodb.js');
const { 
	uploadDropboxImage, updateDropboxImage, removeFileExtension 
} = require('../../../utils');

// Local
//const PERFORMANCES_ID = '643f2c7902f9afc80224e7c3';
// Remote
const PERFORMANCES_ID = '64359642dd85c7fd598530ca';

/*
	Future add documentation
*/
function add(newPerformance) {
	return new Promise(async (resolve,reject) => {
		let { name, description, location, date, instruments, img } = newPerformance;
		let { newFileName, data } = img;

		// Create Uint8Array with the array passed in
		let buffer = new Uint8Array(data);
		// Retrieve the new image file extension to ensure newly created Dropbox image has proper extension
		let { fileExtension } = removeFileExtension( newFileName );
		// Upload the image to Dropbox
		let dropboxImageURL = await uploadDropboxImage( buffer, fileExtension );

		// Add image src as the new Dropbox URL
		newPerformance['img'] = {
			src: dropboxImageURL
		}

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
							src: newPerformance['img']['src']
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

			if (img.data) {
				let { oldFileName, newFileName, data } = img;
				// Create Uint8Array with the array passed in
				let buffer = new Uint8Array(data);
				// Upload the image to Dropbox
				let dropboxImageURL = await updateDropboxImage( oldFileName, newFileName, buffer );

				updatedPerformance = { 
					...updatedPerformance, 
					'past.performances.$[el].img': {
						src: dropboxImageURL
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