/*
	File contains request methods for dealing directly with the corresponding data
*/

const { getDatabaseCollection, ObjectId } = require('../../../../../utils/mongodb.js');

// Import utility function for removing an image
const { 
	uploadDropboxImage, updateDropboxImage, 
	deleteDropboxImage, removeFileExtension 
} = require('../../../utils');

/*
	Futture add documentation
*/
function add(newAnecdote) {
	return new Promise(async (resolve,reject) => {
		let { name, title, anecdote, img } = newAnecdote;
		let { newFileName, data } = img;

		// Define the base attributes for the new anecdote
		let formattedAnecdote = { name, title, anecdote }
		// Create Uint8Array with the array passed in
		let buffer = new Uint8Array(data);
		// Retrieve the new image file extension to ensure newly created Dropbox image has proper extension
		let { fileExtension } = removeFileExtension( newFileName );
		// Upload the image to Dropbox
		let dropboxImageURL = await uploadDropboxImage( buffer, fileExtension );

		// Add image src as the new Dropbox URL
		formattedAnecdote['img'] = {
			src: dropboxImageURL
		}
		
		getDatabaseCollection('anecdotes').then(async ({ collection, closeConnection }) => {
			try {
				await collection.insertOne(formattedAnecdote);
				resolve(`Successfully added anecdote by ${formattedAnecdote.name}`);
			} catch(e) {
				reject("Internal Server Error. Try again later");
			} finally {
				// Close connection now that database operations are done
				closeConnection();
			}
		});
	})
}
/*
	Future update documentation
*/
function update(editedAnecdote) {
	return new Promise((resolve,reject) => {
		getDatabaseCollection('anecdotes').then(async ({ collection, closeConnection }) => {
			let { id, name, title, anecdote, img } = editedAnecdote;
			// Define the base attributes for the anecdote to be updated
			let updatedAnecdote = { name, title, anecdote };
			// If a new image has been sent, update anecdote accordingly
			if (img.data) {
				let { oldFileName, newFileName, data } = img;
				// Create Uint8Array with the array passed in
				let buffer = new Uint8Array(data);
				// Upload the image to Dropbox
				let dropboxImageURL = await updateDropboxImage( oldFileName, newFileName, buffer );

				updatedAnecdote['img'] = {
					src: dropboxImageURL
				};
			}

			let result = await collection.findOneAndUpdate({
				_id: new ObjectId(id)
			}, {
				$set: updatedAnecdote
			});

			// Close connection now that database operations are done
			closeConnection();
			
			if (result.ok) {
				let { value: { name }} = result;
				resolve(`Successfully updated anecdote by ${name}`);
			}
			else {
				reject("Internal Server Error. Try again later");
			}
		});
	})
}
/*
	Future delete documentation
*/
function remove({ id, oldFileName }) {
	return new Promise(async (resolve,reject) => {
		let dropboxResponse = await deleteDropboxImage( `/Uploads/${oldFileName}` );

		if( 'error' in dropboxResponse ) {
			reject("Internal Server Error. Try again later");
		}
		else {
			getDatabaseCollection('anecdotes').then(async ({ collection, closeConnection }) => {
				let result = await collection.findOneAndDelete({
					_id: new ObjectId(id)
				});

				// Close connection now that database operations are done
				closeConnection();

				if (result.ok) {
					let { value: { name } } = result;
					
					resolve(`Successfully removed anecdote by ${name}`);
				}
				else {
					reject("Internal Server Error. Try again later");
				}
			})
		}
	})
}

module.exports = { 
	add, 
	update, 
	remove 
}