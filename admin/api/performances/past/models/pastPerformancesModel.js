/*
	File contains request methods for dealing directly with the corresponding data
*/
const utils = require('util');
const { getDatabaseCollection, ObjectId } = require('../../../../../utils/mongodb.js');
const { uploadDropboxImage, createSharedLink, removeImage } = require('../../../utils');

// Local
const PERFORMANCES_ID = '643f2c7902f9afc80224e7c3';
// Remote
//const PERFORMANCES_ID = '64359642dd85c7fd598530ca';

/*
	Future add documentation
*/
function add(newPerformance) {
	return new Promise(async (resolve,reject) => {
		let imgData = newPerformance['img'].src;
		let imgFileType = newPerformance['img'].fileExtension;
		// Create Uint8Array with the array passed in
		let buffer = new Uint8Array(imgData);
		// Upload the image to Dropbox
		let { name, rev } = await uploadDropboxImage( buffer, imgFileType );
		// Create a shared link to be used to access the image
		let { url } = await createSharedLink( name ) ;

		// Convert the URL to a Node URL object to update parameters
		let newURL = new URL( url );
		newURL.searchParams.set( 'dl', 1 );

		let dropboxImageURL = newURL.href;

		// Overwrite existing Anecdote image values
		newPerformance['img'] = {
			...newPerformance['img'],
			src: dropboxImageURL,
			dropboxRevision: rev
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
							src: newPerformance['img']['src'],
							alt: newPerformance['img']['alt'],
							dropboxPath: newPerformance['img']['dropboxPath']
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