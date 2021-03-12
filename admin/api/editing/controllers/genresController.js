/*
	Methods for handling API requests and building responses
*/

// Import models to handle actual data
const GenresModel = require("../models/genresModel.js");

// Import utility function for handling the retrieval of body data
const { getBodyData } = require("../../utils.js");

function addGenre(req, res) {
	GenresModel.add("NEW GENRE");
	res.end("Added new editing genre");
}
function updateGenre(req, res) {
	GenresModel.update("UPDATED GENRE");
	res.end("Updated editing genre");
}
async function removeGenre(req, res) {
	res.setHeader("Content-Type","application/json");
	await getBodyData(req).then(async (body) => {
		// Pull out only necessary attributes from body to remove editing data
		let { id } = body;

		await GenresModel.remove(id).then((msg) => {
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
	addGenre, 
	updateGenre, 
	removeGenre
}