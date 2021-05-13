/*
	File for handling API requests and building responses
*/

// Import model to handle data
const CollaboratorsModel = require("../models/collaboratorsModel.js");

// Import utility function for handling the retrieval of body data
const { getBodyData } = require("../../../utils.js");

async function addCollaborator(req,res) {
	await CollaboratorsModel.add("New Collaborator").then((msg) => {
		res.status = 201;
		res.end(JSON.stringify({ msg }));
	}).catch((err) => {
		console.log("Error:")
		console.log(err.message);
		console.log(err.stack);

		res.status = 500;
		res.end(JSON.stringify({
			msg: "Problem getting body data"
		}));
	})
}
async function updateCollaborator(req,res) {
	await CollaboratorsModel.update("UPDATED COLLABORATOR").then((msg) => {
		res.status = 200;
		res.end(JSON.stringify({ msg }))
	}).catch((err) => {
		console.log("Error:")
		console.log(err.message);
		console.log(err.stack);

		res.status = 500;
		res.end(JSON.stringify({
			msg: "Problem getting body data"
		}));
	})
}
async function removeCollaborator(req,res) {
	await getBodyData(req).then(async (body) => {
		let { id } = body;

		await CollaboratorsModel.remove(id).then((msg) => {
			res.status = 200;
			res.end(JSON.stringify({ msg }));
		}).catch((err) => {
			console.log("Error:")
			console.log(err.message);
			console.log(err.stack);

			res.status = 500;
			res.end(JSON.stringify({
				msg: "Problem getting body data"
			}));
		})
	});
}

module.exports = {
	addCollaborator,
	updateCollaborator,
	removeCollaborator
}