// Controller for connecting current music view with cucrrent music model

// Require future performance model
import * as CurrentMusic from "../models/currentMusicModel.js";

/*
	Future addSong documentation
*/
function addSong(event) {
	let addCard = event.path[3];
	let form = addCard.firstElementChild;
	let formEls = form.elements;

	let userSong = {
		name: formEls["name"].value,
		by: formEls["composer"].value,
		description: formEls["description"].value
	}
	
	CurrentMusic.add(userSong).then((result) => {
		let { msg, status } = result;
		alert(`${status}: ${msg}`);
		// Replace current location with current location to mimic refresh, including token
		// Get token
		let token = window.sessionStorage.getItem("token");
		// Replace location
		document.location.replace(`${document.location.origin}${document.location.pathname}?token=${token}`);
	}).catch((error) => {
		console.log("Error:");
		console.log(error);
	});
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
		// Replace current location with current location to mimic refresh, including token
		// Get token
		let token = window.sessionStorage.getItem("token");
		// Replace location
		document.location.replace(`${document.location.origin}${document.location.pathname}?token=${token}`);
	}).catch((error) => {
		console.log("Error:");
		console.log(error);
	});
}

export { addSong, updateSong, removeSong }