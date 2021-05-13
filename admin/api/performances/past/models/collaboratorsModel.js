/*
	File contains request methods for dealing directly with the corresponding data
*/

// Import collaborators data to be used by the model
const collaboratorsPath = "./site_data/collaborators.json";
// Require method to retrieve file data
const { getFileData } = require("../../../../utils.js");
// Require method for writing to file
const { writeToFile } = require("../../../utils.js");
// Import uuid for adding new resource
const { v4: uuidv4 } = require("uuid");

/*
	Futture add documentation
*/
function add(collaborator) {
	return new Promise((resolve,reject) => {
		resolve(`Added new collaborator: ${collaborator}`);
	})
}
/*
	Future update documentation
*/
function update(collaborator) {
	return new Promise((resolve,reject) => {
		resolve(`Updated collaborator: ${collaborator}`);
	})
}
/*
	Future delete documentation
*/
function remove(collaboratorID) {
	return new Promise((resolve,reject) => {
		// Get collaborators from file
		const collaborators = getFileData(collaboratorsPath);

		let index = collaborators.findIndex((collaborator) => collaborator.id === collaboratorID);
		if (index === -1)
			reject(`Unable to find collaborator with id of: ${collaboratorID}`);
		else {
			// Filter out collaborators whose IDs don't match that of collaboratorID
			let updatedCollaborators = collaborators.filter((collaborator) => collaborator.id !== collaboratorID);
			// Update file, reflecting updated collaborators
			try {
				writeToFile(collaboratorsPath,JSON.stringify(updatedCollaborators));
				resolve("Successfully removed collaborator!");
			} catch(e) {
				console.error(e);
				reject("Internal Server Error. Try again later");
			}
		}
	})
}

module.exports = { 
	add, 
	update, 
	remove 
}