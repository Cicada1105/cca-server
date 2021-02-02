/*
	Model that directly interfaces with the collaborators data
*/

// Import data
const collaborators = require("../../../site_data/collaborators.json");

function getAllCollaborators() {
	// Return promise that resolves with collaborators data
	return new Promise((resolve,reject) => {
		// Remove unnecessary id from data to be returned to front end
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