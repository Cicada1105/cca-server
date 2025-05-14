/*
	Model that directly interfaces with the collaborators data
*/

const { getDatabaseCollection } = require('../../../utils/mongodb.js');

function getAllCollaborators() {
	// Return promise that resolves with collaborators data
	return new Promise((resolve,reject) => {
		getDatabaseCollection('collaborators').then(async ({ collection }) => {
			// Remove unnecessary id from data to be returned to front end
			let collaborators = await collection.find({}).project({
				_id: 0
			}).toArray();
			
			let updatedCollaborators = [];
			collaborators.forEach(collaborator => {
				// Add server url to image if it is a url string
				let imgSrc = collaborator['img'].src;

				collaborator['img'].src = imgSrc.startsWith('data:image') || imgSrc.startsWith('http') ? imgSrc : `${process.env.SERVER_URL}/imgs/${collaborator['img'].src}`;
				// Store rest of collaborator info without id
				updatedCollaborators.push(collaborator);
			})
			resolve(updatedCollaborators);
		});
	})
}

module.exports = {
	getAllCollaborators
}