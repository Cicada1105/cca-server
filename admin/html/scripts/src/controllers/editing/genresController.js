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
	let litID = event.target.dataset["cardid"];
	// Get access to form to retrieve data
	let controlsCont = event.path[1];
	let articleInput = controlsCont.previousElementSibling;
	let form = articleInput.firstElementChild;
	let elements = form.elements;

	let genreData = {
		litID,
		display: elements["single_input"].value,
		value: elements["single_input"].value.toLowerCase().replaceAll(" ","_")
	}

	Genre.add(genreData).then(successCallback).catch(failedCallback);
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
	// Access ID of genre that was selected to be removed
	let genreID = event.target.dataset["id"];
	// Access Literature ID associaated with genre
	let genresTable = event.path[4]; // Has id of lit type storedin dataset
	let litID = genresTable.dataset["litid"];

	let uniqueGenreData = {
		litID,
		genreID
	}

	Genre.remove(uniqueGenreData).then(successCallback).catch(failedCallback);
}

export { addGenre, updateGenre, removeGenre }