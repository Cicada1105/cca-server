// Controller for connecting reed name view with reed name model

// Require reed name model
import * as Name from "../../models/reedmaking/nameModel.js";

// Require callback functions shared by all controllers
import { successCallback, failedCallback } from '../utils.js';
/*
	Future addName documentation

function addName(event) {
	let reedName = "NEW REED ";
	Name.add(reedRate).then(successCallback).catch(failedCallback);
}
*/
/*
	Future updateName documentation
*/
function updateName(event) {
	let reedRate = {
		id: "rate_id",
		name: "UPDATING REED RATE"
	}
	Name.update(reedRate).then(successCallback).catch(failedCallback);
}
/*
	Future removeName documentation

function removeName(event) {
	// Get and store pricing ID of current reed
	let reedID = event.target.dataset.id;

	Name.remove(reedID).then(successCallback).catch(failedCallback);
}
*/

export { updateName }