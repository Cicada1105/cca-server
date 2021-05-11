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
		resolve(`Deleted collaborator with id of: ${collaboratorID}`);
	})
}

module.exports = { 
	add, 
	update, 
	remove 
}