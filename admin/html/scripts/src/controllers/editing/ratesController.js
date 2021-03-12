// Controller for connecting rates view with rates model

// Require rates model
import * as Genre from "../../models/editing/ratesModel.js";

// Require callback functions shared by all controllers
import { successCallback, failedCallback } from '../utils.js';
/*
	Future addRate documentation
*/
function addRate(event) {
	let rate = "ADDING RATE";
	Genre.add(rate).then(successCallback).catch(failedCallback);
}
/*
	Future updateRate documentation
*/
function updateRate(event) {
	let rate = "UPDATING RATE";
	Genre.edit(rate).then(successCallback).catch(failedCallback);
}
/*
	Future removeRate documentation
*/
function removeRate(event) {
	// Get and store rate ID of current editing price
	let rateID = event.target.dataset["id"];

	Genre.remove(rateID).then(successCallback).catch(failedCallback);
}

export { addRate, updateRate, removeRate }