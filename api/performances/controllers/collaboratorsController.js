/*
	Collaborators controller that directly interfaces with collaborators model
*/

// Import collaborators model
const CollaboratorsModel = require("../models/collaboratorsModel.js");

async function getCollaborators(req,res) {
	// Handle headers
	res.setHeader("Content-Type","application/json");

	// Handle collaborators response using model -> await promise
	await CollaboratorsModel.getAllCollaborators().then(collaborators => {
		res.statusCode = 200;
		res.end(JSON.stringify(collaborators));
	}).catch(err => {
		res.statusCode = 500;
		res.end(JSON.stringify(err))
	})
}

module.exports = {
	getCollaborators
}