/*
	Model that directly interfaces with the collaborators data
*/

// Import data
const collaborators = require("../../../site_data/collaborators.json");

function getAllCollaborators() {
	// Return promise that resolves with collaborators data
	return new Promise((resolve,reject) => {
		resolve(collaborators);
	})
}

module.exports = {
	getAllCollaborators
}