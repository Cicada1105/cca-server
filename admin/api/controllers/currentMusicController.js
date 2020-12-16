/*
	Method for handling API requests and building responses
	Request codes
	201: Created new resource
	200: Okay
	500: Internal Server Error 

	NOTE: 
	{
		title,
		description,
		id
	}
	is equivalent to
	{
		title: title,
		description: description,
		id: id
	}
*/

// Import model to handle actual data
const MusicModel = require("../models/currentMusicModel.js");

// Import utility function for handling the retrieval of body data
const { getBodyData } = require("../utils.js");

async function addSong(req, res) {
	res.setHeader("Content-Type","application/json");
	// Get song data from body
	await getBodyData(req).then(async (body) => {
		// Pull out only necessary info for adding 
		let { name, by, description } = body;

		// Add new song
		await MusicModel.add({
			name,
			by,
			description
		}).then((msg) => {
			res.status = 201;	
			res.end(JSON.stringify({ msg }))
		}).catch((err) => {
			res.status = 500;
			res.end(JSON.stringify({
				msg: err
			}));
		})
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
function updateSong(req, res) {
	MusicModel.update("UPDATED SONG");
	res.end("Updated Song");
}
async function removeSong(req, res) {
	res.setHeader("Content-Type","application/json");
	await getBodyData(req).then(async (body) => {
		// Pull out only necessary attributes from body to remove present performance
		let { id } = body;

		await MusicModel.remove(id).then((msg) => {
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
	addSong, 
	updateSong, 
	removeSong
}