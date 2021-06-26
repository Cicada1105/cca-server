// Controller for connecting rates view with rates model

// Require rates model
import * as Rate from "../../models/editing/ratesModel.js";

// Require callback functions shared by all controllers
import { successCallback, failedCallback } from '../utils.js';
/*
	Future addRate documentation
*/
function addRate(event) {
	// Get lit ID and editing type associated with rates
	let litID = event.target.dataset["cardid"];
	let editingType = event.target.dataset["editingtype"];
	// Get access to form to retrieve data
	let controlsFooter = event.path[1];
	let articleInput = controlsFooter.previousElementSibling;
	let form = articleInput.firstElementChild;
	let elements = form.elements;

	let rateData = {
		litID,
		editingType
	}

	rateData["min"] = parseInt(elements["min"].value);
	rateData["max"] = parseInt(elements["max"].value);
	rateData["perHour"] = parseInt(elements["perHour"].value);
	rateData["perWord"] = parseInt(elements["perWord"].value);

	// Include flat rate if it is displayed
	(elements["flatRate"].parentElement.style.display !== "none") && (rateData["flatRate"] = parseInt(elements["flatRate"].value));

	Rate.add(rateData).then(successCallback).catch(failedCallback);
}
/*
	Future updateRate documentation
*/
function updateRate(event) {
	// Get and store rate ID of current rate being updated
	let rateID = event.target.dataset["id"];
	
	Rate.edit(rateID).then(successCallback).catch(failedCallback);
}
/*
	Future removeRate documentation
*/
function removeRate(event) {
	// Get and store rate ID, editing type rate is under and literature type ID to uniquely ID rate
	let rateID = event.target.dataset["id"];
	let ratesTable = event.path[4]; // Contains editing type and literature ID
	let editingType = ratesTable.dataset["editingtype"];
	let litID = ratesTable.dataset["litid"];

	let uniqueRateData = {
		litID,
		editingType,
		rateID
	}

	Rate.remove(uniqueRateData).then(successCallback).catch(failedCallback);
}

export { addRate, updateRate, removeRate }