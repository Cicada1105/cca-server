/*
	File contains request methods for dealing directly with the corresponding data
*/

const { getDatabaseCollection, ObjectId } = require('../../../../../utils/mongodb.js');

/*
	Futture add documentation
*/
function add(collaborator) {
	return new Promise((resolve,reject) => {
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
			let { id, name, title, img } = editedCollaborator;
			// Define the base attributes for the collaborator to be updated
			let updatedCollaborator = { name, title };
			// If a new image has been sent, update collaborator accordingly
			if (img.src) {
				updatedCollaborator = { ...updatedCollaborator, img: { src: img.src, alt: img.alt } };
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