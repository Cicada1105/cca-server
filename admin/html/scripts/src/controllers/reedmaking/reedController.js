// Controller for connecting reed view with reed model

// Require reed model
import * as Reed from "../../models/reedmaking/reedModel.js";

// Require callback functions shared by all controllers
import { successCallback, failedCallback } from '../utils.js';
/*
	Future addReed documentation
*/
function addReed(event) {
	let reed = "NEW REED";
	Reed.add(reed).then(successCallback).catch(failedCallback);
}
/*
	Future updateReed documentation
*/
function updateReed(event) {
	let reed = "UPDATING REED";
	Reed.update(reed).then(successCallback).catch(failedCallback);
}
/*
	Future removeReed documentation
*/
function removeReed(event) {
	// Get and store pricing ID of current reed
	let reedID = event.target.dataset.id;

	Reed.remove(reedID).then(successCallback).catch(failedCallback);
}

export { addReed, updateReed, removeReed }