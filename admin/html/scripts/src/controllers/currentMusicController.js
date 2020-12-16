// Controller for connecting current music view with cucrrent music model

// Require future performance model
import * as CurrentMusic from "../models/currentMusicModel.js";

/*
	Future addSong documentation
*/
function addSong(event) {
	let newSong = "NNEW SONG";
	CurrentMusic.add(newSong);
}
/*
	Future updateSong documentation
*/
function updateSong(event) {
	let currentSong = "CURRENT SONG";
	CurrentMusic.edit(currentSong);
}
/*
	Future removeSong documentation
*/
function removeSong(event) {
	// Get and store id of current past performance
	let songID = event.target.dataset.id;

	CurrentMusic.remove(songID).then((result) => {
		let { msg, status } = result;
		alert(`${status}: ${msg}`);
		document.location.reload();
	}).catch((error) => {
		console.log("Error:");
		console.log(error);
	});
}

export { addSong, updateSong, removeSong }