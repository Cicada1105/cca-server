// Controller for connecting current music view with cucrrent music model

// Require future performance model
import * as CurrentMusic from "../../models/performances/currentMusicModel.js";

// Require callback functions shared by all controllers
import { successCallback, failedCallback } from '../utils.js';
/*
	Future addSong documentation
*/
function addSong(event) {
	let controlsCont = event.path[2];
	let form = controlsCont.previousElementSibling;
	let formEls = form.elements;

	let userSong = {
		name: formEls["name"].value,
		by: formEls["composer"].value,
		description: formEls["description"].value
	}
	
	CurrentMusic.add(userSong).then(successCallback).catch(failedCallback);
}
/*
	Future updateSong documentation
*/
function updateSong(event) {
	let controlsCont = event.path[2];
	let form = controlsCont.previousElementSibling;
	let formEls = form.elements;

	let userSong = {
		id: event.target.dataset["id"],
		name: formEls["name"].value,
		by: formEls["composer"].value,
		description: formEls["description"].value
	}
	CurrentMusic.edit(userSong).then(successCallback).catch(failedCallback);
}
/*
	Future removeSong documentation
*/
function removeSong(event) {
	// Get and store id of current past performance
	let songID = event.target.dataset["id"];

	CurrentMusic.remove(songID).then(successCallback).catch(failedCallback);
}

export { addSong, updateSong, removeSong }