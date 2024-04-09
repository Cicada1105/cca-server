/*
	File for handling API requests and building responses
*/

// Import model to handle data
const CollaboratorsModel = require("../models/collaboratorsModel.js");

// Import utility function for handling the retrieval of body data
const { getBodyData } = require("../../../utils");

async function addCollaborator(req,res) {
	await getBodyData(req).then(async (body) => {
		let { name, title, description, img: { newFileName, data }} = body;

		// Pass in request as the definition of the 'this' parameter
		await CollaboratorsModel.add.call(req, {
			name,
			title,
			description,
			img: {
				newFileName,
				data
			}
		}).then((msg) => {
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
	});
}
async function updateCollaborator(req,res) {
	await getBodyData(req).then(async (body) => {
		let { id, name, title, description, img: { oldFileName, newFileName, data }} = body;
		
		// Pass in request as the definition of the 'this' parameter
		await CollaboratorsModel.update.call(req, {
			id, 
			name, 
			title, 
			description,
			img: { 
				oldFileName,
				newFileName,
				data,
			}
		}).then((msg) => {
			res.status = 200;
			res.end(JSON.stringify({ msg }))
		}).catch((err) => {
			console.log("Error:");
			console.log(err.message);
			console.log(err.stack);

			res.status = 500;
			res.end(JSON.stringify({
				msg: "Problem getting body data"
			}));
		});
	});
}
async function removeCollaborator(req,res) {
	await getBodyData(req).then(async (body) => {
		let { id, oldFileName } = body;

		// Pass in request as the definition of the 'this' parameter
		await CollaboratorsModel.remove.call(req,{
			id,
			oldFileName
		}).then((msg) => {
			res.status = 200;
			res.end(JSON.stringify({ msg }));
		}).catch((err) => {
			console.log("Error:");
			console.log(err.message);
			console.log(err.stack);

			res.status = 500;
			res.end(JSON.stringify({
				msg: "Problem getting body data"
			}));
		});
	});
}

module.exports = {
	addCollaborator,
	updateCollaborator,
	removeCollaborator
}