/*
	File contains request methods for dealing directly with the corresponding data
*/

const { getDatabaseCollection, ObjectId } = require('../../../../../utils/mongodb.js');

// Dropbox and image handling utility functions
const { 
	uploadDropboxImage, updateDropboxImage, 
	createSharedLink, removeImage 
} = require('../../../utils');

/*
	Futture add documentation
*/
function add(collaborator) {
	return new Promise(async (resolve,reject) => {
		let imgData = collaborator['img'].src;
		let imgFileType = collaborator['img'].fileExtension;

		// Create Uint8Array with the array passed in
		let buffer = new Uint8Array(imgData);
		// Upload the image to Dropbox
		let dropboxImageURL = await uploadDropboxImage( buffer, imgFileType );

		// Overwrite existing Anecdote image values
		collaborator['img'] = {
			...collaborator['img'],
			src: dropboxImageURL
		}
		// File extension is not needed to be stored in the database
		delete collaborator['img']['fileExtension'];

		getDatabaseCollection('collaborators').then(async ({ collection, closeConnection }) => {
			try {
				await collection.insertOne(collaborator);

				resolve(`Successfully added new collaborator: ${collaborator.name}`);				
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
function update(editedCollaborator) {
	return new Promise((resolve,reject) => {
		getDatabaseCollection('collaborators').then(async ({ collection, closeConnection }) => {
			let { id, name, title, description, img } = editedCollaborator;
			// Define the base attributes for the collaborator to be updated
			let updatedCollaborator = { name, title, description };
			// If a new image has been sent, update collaborator accordingly
			if (img.data) {
				let { oldFileName, newFileName, data } = img;
				// Create Uint8Array with the array passed in
				let buffer = new Uint8Array(data);
				// Upload the image to Dropbox
				let dropboxImageURL = await updateDropboxImage( oldFileName, newFileName, buffer );

				updatedCollaborator['img'] = {
					src: dropboxImageURL
				};
			}
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
function remove(collaboratorID) {
	return new Promise((resolve,reject) => {
		getDatabaseCollection('collaborators').then(async ({ collection, closeConnection }) => {
			let result = await collection.findOneAndDelete({
				_id: new ObjectId(collaboratorID)
			});

			// Close connection now that database operations are done
			closeConnection();

			// Remove server image associated with database stored anecdote
			removeImage(result['value']['img'].src);
			
			if (result.ok) {
				// Retrieve affected document to notify user of changes
				let { value: { name } } = result;

				resolve(`Successfully removed ${name} from collaborators!`);
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