// Controller for connecting genres view with genres model

// Require genres model
import * as Genre from "../../models/editing/genresModel.js";

// Require callback functions shared by all controllers
import { successCallback, failedCallback } from '../utils.js';
/*
	Future addGenre documentation
*/
function addGenre(event) {
	// Get literature id current added genre is associated with
	let litID = event.target.dataset["litID"];
	
	let genre = "ADDING GENRE";
	Genre.add(genre).then(successCallback).catch(failedCallback);
}
/*
	Future updateGenre documentation
*/
function updateGenre(event) {
	// Get and store genre ID of current genre being edited
	let genreID = event.target.dataset["id"];

	Genre.edit(genreID).then(successCallback).catch(failedCallback);
}
/*
	Future removeGenre documentation
*/
function removeGenre(event) {
	// Get and store genre ID of current genre being deleted
	let genreID = event.target.dataset["id"];

	Genre.remove(genreID).then(successCallback).catch(failedCallback);
}

export { addGenre, updateGenre, removeGenre }