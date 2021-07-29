// Controller for connecting reed description view with reed description model

// Require reed description model
import * as Description from "../../models/reedmaking/descriptionModel.js";

// Require callback functions shared by all controllers
import { successCallback, failedCallback } from '../utils.js';
/*
	Future addDescription documentation

function addDescription(event) {
	let reedDescription = "NEW REED DESCRIPTION";
	Description.add(reedDescription).then(successCallback).catch(failedCallback);
}
*/
/*
	Future updateDescription documentation
*/
function updateDescription(event) {
	let editBtn = event.target;

	// Store reed id associated with reed name
	let reedID = editBtn.dataset["id"];
	// Retrieve form elements
	let inputSection = event.path[2];
	let addForm = inputSection.getElementsByClassName("addForm")[0];
	let elements = addForm.elements;

	let reedDescription = {
		id: reedID,
		description: elements["description"].value
	}
	Description.update(reedDescription).then(successCallback).catch(failedCallback);
}
/*
	Future removeDescription documentation

function removeDescription(event) {
	// Get and store pricing ID of current reed
	let reedID = event.target.dataset.id;

	Description.remove(reedID).then(successCallback).catch(failedCallback);
}
*/

export { updateDescription }