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
		// Request for this action is stored in the 'this' defintion
		let request = this;

		// Define the base attributes for the new anecdote
		let formattedAnecdote = { name, title, anecdote }
		// Create Uint8Array with the array passed in
		let buffer = new Uint8Array(data);
		// Retrieve the new image file extension to ensure newly created Dropbox image has proper extension
		let { fileExtension } = removeFileExtension( newFileName );
		// Upload the image to Dropbox
		let dropboxResponse = await uploadDropboxImage.call( request, buffer, fileExtension );

		if ( typeof dropboxResponse === 'object' && 'error' in dropboxResponse ) {
			reject("Internal Server Error. Try again later");
		}
		else {
			let dropboxImageURL = dropboxResponse;
			
			// Add image src as the new Dropbox URL
			formattedAnecdote['img'] = {
				src: dropboxImageURL
			}
			
			getDatabaseCollection('anecdotes').then(async ({ collection }) => {
				try {
					await collection.insertOne(formattedAnecdote);
					resolve(`Successfully added anecdote by ${formattedAnecdote.name}`);
				} catch(e) {
					reject("Internal Server Error. Try again later");
				}
			});
		}
	})
}
/*
	Future update documentation
*/
function update(editedAnecdote) {
	return new Promise(async (resolve,reject) => {
		let { id, name, title, anecdote, img } = editedAnecdote;
		// Define the base attributes for the anecdote to be updated
		let updatedAnecdote = { name, title, anecdote };
		// Request for this action is stored in the 'this' defintion
		let request = this;

		// If a new image has been sent, update anecdote accordingly
		if (img.data) {
			let { oldFileName, newFileName, data } = img;
			// Create Uint8Array with the array passed in
			let buffer = new Uint8Array(data);
			// Upload the image to Dropbox
			let dropboxResponse = await updateDropboxImage.call( request, oldFileName, newFileName, buffer );

			if ( typeof dropboxResponse === 'object' && 'error' in dropboxResponse ) {
				reject("Internal Server Error. Try again later");
			}
			else {
				let dropboxImageURL = dropboxResponse;

				updatedAnecdote['img'] = {
					src: dropboxImageURL
				};
			}
		}
		getDatabaseCollection('anecdotes').then(async ({ collection }) => {
			let result = await collection.findOneAndUpdate({
				_id: new ObjectId(id)
			}, {
				$set: updatedAnecdote
			});
			
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
		// Request for this action is stored in the 'this' defintion
		let request = this;
		let dropboxResponse = await deleteDropboxImage.call( request, `/Uploads/${oldFileName}` );

		if( 'error' in dropboxResponse ) {
			reject("Internal Server Error. Try again later");
		}
		else {
			getDatabaseCollection('anecdotes').then(async ({ collection }) => {
				let result = await collection.findOneAndDelete({
					_id: new ObjectId(id)
				});

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