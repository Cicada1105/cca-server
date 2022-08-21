/*
	Model that directly interfaces with the collaborators data
*/

const { getFileData } = require("../../utils.js");

function getAllCollaborators() {
	// Return promise that resolves with collaborators data
	return new Promise((resolve,reject) => {
		// Remove unnecessary id from data to be returned to front end
		let collaborators = getFileData("./site_data/collaborators.json");

		let updatedCollaborators = [];
		collaborators.forEach(collaborator => {
			// Extract out current id from rest of info
			let { id, ...rest } = collaborator
			// Store rest of collaborator info without id
			updatedCollaborators.push(rest);
		})
		resolve(updatedCollaborators);
	})
}

module.exports = {
	getAllCollaborators
}