/*
	File contains request methods for dealing directly with the corresponding data
*/

const { getDatabaseCollection, ObjectId } = require('../../../../../utils/mongodb.js');

// Import utility function for removing an image
const { 
	stringToOctetStream, uploadDropboxImage, 
	createSharedLink, removeImage 
} = require('../../../utils');

/*
	Futture add documentation
*/
function add(anecdote) {
	return new Promise(async (resolve,reject) => {
		let imgData = anecdote['img'].src;
		let imgFileType = anecdote['img'].fileExtension;

		// Create Uint8Array with the array passed in
		let buffer = new Uint8Array(imgData);
		// Upload the image to Dropbox
		let { name, path_display } = await uploadDropboxImage( buffer, imgFileType );
		// Create a shared link to be used to access the image
		let { url } = await createSharedLink( name ) ;

		// Convert the URL to a Node URL object to update parameters
		let newURL = new URL( url );
		newURL.searchParams.set( 'dl', 1 );

		let dropboxImageURL = newURL.href;

		// Overwrite existing Anecdote image values
		anecdote['img'] = {
			...anecdote['img'],
			src: dropboxImageURL,
			dropbox_path: path_display
		}
		// File extension is not needed to be stored in the database
		delete anecdote['img']['fileExtension'];
		
		getDatabaseCollection('anecdotes').then(async ({ collection, closeConnection }) => {
			try {
				await collection.insertOne(anecdote);
				resolve(`Successfully added anecdote by ${anecdote.name}`);
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

			let updatedAnecdote = { name, title, anecdote };

			if (img.fileName) {
				updatedAnecdote = { 
					...updatedAnecdote, 
					img: { 
						src: img.fileName, 
						alt: img.alt
					} 
				}
			}

			let result = await collection.findOneAndUpdate({
				_id: new ObjectId(id)
			}, {
				$set: updatedAnecdote
			});

			// Close connection now that database operations are done
			closeConnection();

			if (img.fileName)
				removeImage(result['value']['img'].src);

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
function remove(anecdoteID) {
	return new Promise((resolve,reject) => {
		getDatabaseCollection('anecdotes').then(async ({ collection, closeConnection }) => {
			let result = await collection.findOneAndDelete({
				_id: new ObjectId(anecdoteID)
			});

			// Close connection now that database operations are done
			closeConnection();

			// Remove server image associated with database stored anecdote
			removeImage(result['value']['img'].src);

			if (result.ok) {
				let { value: { name } } = result;
				resolve(`Successfully removed anecdote by ${name}`);
			}
			else {
				reject("Internal Server Error. Try again later");
			}
		})
	})
}

module.exports = { 
	add, 
	update, 
	remove 
}