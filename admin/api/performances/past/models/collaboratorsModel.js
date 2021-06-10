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
		// Get collaborators from file
		let collaborators = getFileData(collaboratorsPath);
		// Add unique id to new collaborator
		let newCollaboratorWithID = {
			id: uuidv4(),
			...collaborator
		}

		// Push new collaborator into collaborators array
		collaborators.push(newCollaboratorWithID);

		// Write updated data to file, catching any error that may occur
		try {
			writeToFile(collaboratorsPath,JSON.stringify(collaborators));
			resolve(`Added new collaborator: ${collaborator.name}`);
		} catch(e) {
			console.error(e);
			reject("Internal Server Error. Try again later");
		}
	})
}
/*
	Future update documentation
*/
function update(editedCollaborator) {
	return new Promise((resolve,reject) => {
		// Get collaborators from file
		let collaborators = getFileData(collaboratorsPath);

		// Find index of collaborator in storage that matches id of edited collaborator
		let index = collaborators.findIndex(collaborator => collaborator.id === editedCollaborator.id);
		if (index === -1)
			reject(`Unable to find past collaborator: ${editedCollaborator.name}`)
		else {
			// If edited image was left alone, don't update image
			if (editedCollaborator.img["src"] === undefined) {
				let { img, ...editedCollaboratorWithoutImg } = editedCollaborator;
				// Update stored collaborators
				Object.assign(collaborators[index],editedCollaboratorWithoutImg);
			}
			else
				Object.assign(collaborators[index],editedCollaborator);

			// Update file, reflecting changes to collaborator
			try {
				writeToFile(collaboratorsPath,JSON.stringify(collaborators));
				resolve(`Successfully updated previous collaborator: ${collaborators[index].name}`);
			} catch(e) {
				reject("Internal Server Error. Try again later");
			}
		}
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
				resolve(`Successfully removed ${collaborators[index].name} from collaborators!`);
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