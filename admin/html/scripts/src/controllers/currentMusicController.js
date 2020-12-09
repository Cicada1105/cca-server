// Controller for connecting current music view with cucrrent music model

// Require future performance model
import * as CurrentMusic from "../models/currentMusicModel.js";

/*
	Future addSong documentation
*/
function addSong(event) {
	console.log(event);
	let newSong = "NNEW SONG";
	CurrentMusic.add(newSong);
}
/*
	Future updateSong documentation
*/
function updateSong(event) {
	console.log(event);
	let currentSong = "CURRENT SONG";
	CurrentMusic.edit(currentSong);
}
/*
	Future removeSong documentation
*/
function removeSong(event) {
	let songID = event.target.dataset.id;
	CurrentMusic.remove(songID);
}

export { addSong, updateSong, removeSong }