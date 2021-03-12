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
	console.log(collaborator);
}
/*
	Future update documentation
*/
function update(collaborator) {
	console.log(collaborator);
}
/*
	Future delete documentation
*/
function remove(collaboratorID) {
	console.log(collaboratorID);
}

module.exports = { 
	add, 
	update, 
	remove 
}