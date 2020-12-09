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

function addSong(req, res) {
	MusicModel.add("NEW SONG");
	res.end("Added new song");
}
function updateSong(req, res) {
	MusicModel.update("UPDATED SONG");
	res.end("Updated Song");
}
function removeSong(req, res) {
	MusicModel.remove("REMOVED SONG");
	res.end("Removed song");
}

module.exports = {
	addSong, 
	updateSong, 
	removeSong
}
