/*
	Model that directly interfaces with the collaborators data
*/

const { getDatabaseCollection } = require('../../../utils/mongodb.js');

function getAllCollaborators() {
	// Return promise that resolves with collaborators data
	return new Promise((resolve,reject) => {
		getDatabaseCollection('collaborators').then(async ({ collection, closeConnection }) => {
			let collaborators = await collection.find({}).toArray();

			// Now that the collection has been queried, close the database connection
			closeConnection();
			
			let updatedCollaborators = [];
			collaborators.forEach(collaborator => {
				// Extract out current id from rest of info
				let { _id, ...rest } = collaborator
				// Add server url to image if it is a url string
				if (typeof rest['img'] === "string")
					rest['img'] = process.env.SERVER_URL + `imgs/${rest['img']}`;
				// Store rest of collaborator info without id
				updatedCollaborators.push(rest);
			})
			resolve(updatedCollaborators);
		});
	})
}

module.exports = {
	getAllCollaborators
}