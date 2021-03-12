// Controller for connecting literature type view with literature type model

// Require literature type model
import * as LiteratureType from "../../models/editing/litTypesModel.js";

// Require callback functions shared by all controllers
import { successCallback, failedCallback } from '../utils.js';
/*
	Future addLiteratureType documentation
*/
function addLiteratureType(event) {
	let litType = "ADDING LITERATURE TYPE";
	LiteratureType.add(litType).then(successCallback).catch(failedCallback);
}
/*
	Future updateLiteratureType documentation
*/
function updateLiteratureType(event) {
	let litType = "UPDATING LITERATURE TYPE";
	LiteratureType.edit(litType).then(successCallback).catch(failedCallback);
}
/*
	Future removeLiteratureType documentation
*/
function removeLiteratureType(event) {
	// Get and store literature ID of current editing price
	let litTypeID = event.target.dataset["id"];

	LiteratureType.remove(litTypeID).then(successCallback).catch(failedCallback);
}

export { addLiteratureType, updateLiteratureType, removeLiteratureType }