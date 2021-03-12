/*
	File for handling API requests and building responses
*/

// Import model to handle data
const CollaboratorsModel = require("../models/collaboratorsModel.js");

// Import utility function for handling the retrieval of body data
const { getBodyData } = require("../../../utils.js");

function addCollaborator(req,res) {
	CollaboratorsModel.add("New Collaborator");
	res.end("Addeed new collaborator");
}
function updateCollaborator(req,res) {
	CollaboratorsModel.update("Updated Collaborator");
	res.end("Updated new collaborator");
}
function removeCollaborator(req,res) {
	CollaboratorsModel.remove("Collaborator ID to be removed");
	res.end("Removed Collaborator");
}

module.exports = {
	addCollaborator,
	updateCollaborator,
	removeCollaborator
}