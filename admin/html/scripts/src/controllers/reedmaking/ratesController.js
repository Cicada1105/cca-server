// Controller for connecting reed rete view with reed rete model

// Require reed rates model
import * as Rate from "../../models/reedmaking/ratesModel.js";

// Require callback functions shared by all controllers
import { successCallback, failedCallback } from '../utils.js';
/*
	Future addRate documentation
*/
function addRate(event) {
	// Get and store pricing id of current reed
	let reedID = event.target.dataset["cardid"];
	// Access form containing inputs
	let path = event.composedPath();
	let rateSection = path[2];
	let rateForm = rateSection.getElementsByClassName("addForm")[0];
	let elements = rateForm.elements;

	let reedRate = {
		reedID,
		pricing: {
			quantity: parseInt(elements["quantity"].value),
			cost: parseFloat(elements["price"].value)
		}
	}

	Rate.add(reedRate).then(successCallback).catch(failedCallback);
}
/*
	Future updateRate documentation
*/
function updateRate(event) {
	// Store constants
	const el = event.target;
	const dataset = el.dataset;

	// Get and store reed id of current pricing and the pricing id to be updated
	let pricingID = dataset["id"];
	let reedID = dataset["cardid"];

	// Access form containing inputs
	let path = event.composedPath();
	let rateSection = path[2];
	let rateForm = rateSection.getElementsByClassName("addForm")[0];
	let elements = rateForm.elements;

	let reedRate = {
		reedID,
		pricing: {
			id: pricingID,
			quantity: parseInt(elements["quantity"].value),
			cost: parseFloat(elements["price"].value)
		}
	}
	
	Rate.update(reedRate).then(successCallback).catch(failedCallback);
}
/*
	Future removeRate documentation
*/
function removeRate(event) {
	// Get and store pricing ID of current reed
	let pricingID = event.target.dataset.id;
	// Get and store reed id of current reed pricing
	let path = event.composedPath();
	let reedID = path[4].dataset["reedid"];

	let rate = {
		reedID,
		pricingID
	}

	Rate.remove(rate).then(successCallback).catch(failedCallback);
}

export { addRate, updateRate, removeRate }