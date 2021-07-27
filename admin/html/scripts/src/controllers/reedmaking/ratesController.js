// Controller for connecting reed rete view with reed rete model

// Require reed rates model
import * as Rate from "../../models/reedmaking/ratesModel.js";

// Require callback functions shared by all controllers
import { successCallback, failedCallback } from '../utils.js';
/*
	Future addRate documentation
*/
function addRate(event) {
	let reedRate = "NEW REED RATE";
	Rate.add(reedRate).then(successCallback).catch(failedCallback);
}
/*
	Future updateRate documentation
*/
function updateRate(event) {
	let reedRate = "UPDATING REED RATE";
	Rate.update(reedRate).then(successCallback).catch(failedCallback);
}
/*
	Future removeRate documentation
*/
function removeRate(event) {
	// Get and store pricing ID of current reed
	let reedID = event.target.dataset.id;

	Rate.remove(reedID).then(successCallback).catch(failedCallback);
}

export { addRate, updateRate, removeRate }