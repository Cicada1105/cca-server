// Controller for connecting reed view with reed model

// Require reed model
import * as Reed from "../../models/reedmaking/reedModel.js";

// Require callback functions shared by all controllers
import { successCallback, failedCallback } from '../utils.js';
/*
	Future addReed documentation
*/
function addReed(event) {
	let reed = {
		name: "NEW REED",
		description: "NEW REED DESCRIPTION",
		pricing: []
	};
	Reed.add(reed).then(successCallback).catch(failedCallback);
}
/*
	Future updateReed documentation
*/
/*function updateReed(event) {

}*/
/*
	Future removeReed documentation
*/
function removeReed(event) {
	// Get and store pricing ID of current reed
	let reedID = event.target.dataset.id;
	let reed = {
		id: "reed_id"
	}
	Reed.remove(reed).then(successCallback).catch(failedCallback);
}

export { addReed, removeReed }