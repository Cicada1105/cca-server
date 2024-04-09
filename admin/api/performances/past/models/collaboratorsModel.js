/*
	File contains request methods for dealing directly with the corresponding data
*/

const { getDatabaseCollection, ObjectId } = require('../../../../../utils/mongodb.js');

// Dropbox and image handling utility functions
const { 
	uploadDropboxImage, updateDropboxImage, 
	deleteDropboxImage, removeFileExtension
} = require('../../../utils');

/*
	Futture add documentation
*/
function add(collaborator) {
	return new Promise(async (resolve,reject) => {
		let { name, title, description, img } = collaborator;
		let { newFileName, data } = img;
		// Request for this action is stored in the 'this' defintion
		let request = this;

		// Define base attributes for the new collaborator to be added
		let newCollaborator = { name, title, description };

		// Create Uint8Array with the array passed in
		let buffer = new Uint8Array(data);
		// Retrieve the new image file extension to ensure newly created Dropbox image has proper extension
		let { fileExtension } = removeFileExtension( newFileName );
		// Upload the image to Dropbox, passing in request as 'this' parameter
		let dropboxResponse = await uploadDropboxImage.call( request, buffer, fileExtension );

		if ( typeof dropboxResponse === 'object' && 'error' in dropboxResponse ) {
			reject("Internal Server Error. Try again later");
		}
		else {
			let dropboxImageURL = dropboxResponse;
			// Add image src as the new Dropbox URL
			newCollaborator['img'] = {
				src: dropboxImageURL
			}

			getDatabaseCollection('collaborators').then(async ({ collection, closeConnection }) => {
				try {
					await collection.insertOne(newCollaborator);

					resolve(`Successfully added new collaborator: ${collaborator.name}`);				
				} catch(e) {
					reject("Internal Server Error. Try again later");
				} finally {
					// Close connection now that database operations are done
					closeConnection();
				}
			});
		}
	})
}
/*
	Future update documentation
*/
function update(editedCollaborator) {
	return new Promise(async (resolve,reject) => {
		let { id, name, title, description, img } = editedCollaborator;
		// Define the base attributes for the collaborator to be updated
		let updatedCollaborator = { name, title, description };
		// Request for this action is stored in the 'this' defintion
		let request = this;

		// If a new image has been sent, update collaborator accordingly
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
				let dropboxImageURL = dropboxResponse
				updatedCollaborator['img'] = {
					src: dropboxImageURL
				};	
			}
		}
		getDatabaseCollection('collaborators').then(async ({ collection, closeConnection }) => {
			let result = await collection.findOneAndUpdate({
				_id: new ObjectId(id)
			}, {
				$set: updatedCollaborator	
			});

			// Close connection now that database operations are done
			closeConnection();

			if (result.ok) {
				resolve(`Successfully updated ${name}'s info`);
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

		if ( 'error' in dropboxResponse ) {
			reject("Internal Server Error. Try again later");
		}
		else {
			getDatabaseCollection('collaborators').then(async ({ collection, closeConnection }) => {
				let result = await collection.findOneAndDelete({
					_id: new ObjectId(id)
				});

				// Close connection now that database operations are done
				closeConnection();

				if (result.ok) {
					// Retrieve affected document to notify user of changes
					let { value: { name } } = result;

					resolve(`Successfully removed ${name} from collaborators!`);
				}
				else {
					reject("Internal Server Error. Try again later");
				}
			});	
		}
	})
}

module.exports = { 
	add, 
	update, 
	remove 
}