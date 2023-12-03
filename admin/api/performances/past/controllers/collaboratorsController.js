/*
	File for handling API requests and building responses
*/

// Import model to handle data
const CollaboratorsModel = require("../models/collaboratorsModel.js");

// Import utility function for handling the retrieval of body data
const { getBodyData, convertToImage } = require("../../../utils");

async function addCollaborator(req,res) {
	await getBodyData(req).then(async (body) => {
		let { name, title, description, img: { fileName, fileExtension, data }} = body;

		await CollaboratorsModel.add({
			name,
			title,
			description,
			img: {
				fileExtension,
				src: data,
				alt: `${fileName} image`
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
		let { id, name, title, description, img: { fileName, fileType, data }} = body;

		// Convert image data to image if file name is provided
		let newFileName = fileName && convertToImage({ fileType, data });
		let newFileAlt = fileName && `${fileName} image`;

		await CollaboratorsModel.update({
			id, 
			name, 
			title, 
			description,
			img: { 
				fileName: newFileName, 
				alt: newFileAlt
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
		})	
	})
}
async function removeCollaborator(req,res) {
	await getBodyData(req).then(async (body) => {
		let { id } = body;

		await CollaboratorsModel.remove(id).then((msg) => {
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