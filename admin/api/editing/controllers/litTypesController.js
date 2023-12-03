/*
	Methods for handling API requests and building responses
*/

// Import models to handle actual data
const LiteratureTypeModel = require("../models/litTypesModel.js");

// Import utility function for handling the retrieval of body data
const { getBodyData } = require("../../utils");

async function addLiteratureType(req, res) {
	await getBodyData(req).then(async (body) => {
		let { type, genres, rates: { standard_proofreading, developmental_editing, both }} = body;
		
		await LiteratureTypeModel.add({
			type,
			genres,
			rates: {
				standard_proofreading,
				developmental_editing,
				both
			}
		}).then(msg => {
			res.status = 201;
			res.end(JSON.stringify({ msg }));
		}).catch(err => {
			console.log(err);
			res.status = 500;
			res.end(JSON.stringify({
				msg: err
			}));
		});
	})
}
function updateLiteratureType(req, res) {
	LiteratureTypeModel.update("UPDATED LITERATURE TYPE");
	res.end("Updated literature type");
}
async function removeLiteratureType(req, res) {
	res.setHeader("Content-Type","application/json");
	await getBodyData(req).then(async (body) => {
		// Pull out only necessary attributes from body to remove editing data
		let { id } = body;

		await LiteratureTypeModel.remove(id).then((msg) => {
			res.status = 200;
			res.end(JSON.stringify({ msg }));			
		}).catch((err) => {
			res.status = 500;
			res.end(JSON.stringify({ 
				msg: err 
			}));
		})

	}).catch((err) => {
		console.log("ERROR:");
		console.log(err.message);
		console.log(err.stack);

		res.status = 500;
		res.end(JSON.stringify({
			msg: "Unable to process the request at this time"
		}));
	})
}

module.exports = {
	addLiteratureType, 
	updateLiteratureType, 
	removeLiteratureType
}