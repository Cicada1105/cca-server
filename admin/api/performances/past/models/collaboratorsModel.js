/*
	File contains request methods for dealing directly with the corresponding data
*/

const { getDatabaseCollection, ObjectId } = require('../../../../../utils/mongodb.js');

// Dropbox and image handling utility functions
const { 
	stringToOctetStream, uploadDropboxImage, 
	createSharedLink, removeImage 
} = require('../../../utils');

/*
	Futture add documentation
*/
function add(collaborator) {
	return new Promise(async (resolve,reject) => {
		let imgStr = collaborator['img'].src;
		let imgFileType = collaborator['img'].fileExtension;

		// Convert the Octet String to a usable Octet Array Buffer
		let imgOctetStream = stringToOctetStream( imgStr );
		// Upload the image to Dropbox
		let { name, path_display } = await uploadDropboxImage( imgOctetStream, imgFileType );
		// Create a shared link to be used to access the image
		let { url } = await createSharedLink( name ) ;
		// Convert the URL to a Node URL object to update parameters
		let newURL = new URL( url );
		newURL.searchParams.set( 'dl', 1 );

		let dropboxImageURL = newURL.href;

		// Overwrite existing Anecdote image values
		collaborator['img'] = {
			...collaborator['img'],
			src: dropboxImageURL,
			dropbox_path: path_display
		}
		
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
			if (img.fileName) {
				updatedCollaborator = { 
					...updatedCollaborator, 
					img: { 
						src: img.fileName, 
						alt: img.alt 
					} 
				};
			}

			let result = await collection.findOneAndUpdate({
				_id: new ObjectId(id)
			}, {
				$set: updatedCollaborator	
			});

			// Close connection now that database operations are done
			closeConnection();
			
			// Remove old image if new one was uploaded
			if (img.fileName)
				removeImage(result['value']['img'].src);

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