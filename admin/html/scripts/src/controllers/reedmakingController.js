// Controller for connecting reedmaking view with reedmaking model

// Require reedmaking model
import * as Reedmaking from "../models/reedmakingModel.js";

// Require callback functions shared by all controllers
import { successCallback, failedCallback } from './utils.js';
/*
	Future addReedmakingPricing documentation
*/
function addReedmakingPricing(event) {
	let pricing = "NEW REEDMAKING PRICING";
	Reedmaking.add(pricing).then(successCallback).catch(failedCallback);
}
/*
	Future updateReedmakingPricing documentation
*/
function updateReedmakingPricing(event) {
	let pricing = "UPDATING REEDMAKING PRICING";
	Reedmaking.edit(pricing).then(successCallback).catch(failedCallback);
}
/*
	Future removeReedmakingPricing documentation
*/
function removeReedmakingPricing(event) {
	// Get and store pricing ID of current reed
	let pricingID = event.target.dataset.id;

	Reedmaking.remove(pricingID).then(successCallback).catch(failedCallback);
}

export { addReedmakingPricing, updateReedmakingPricing, removeReedmakingPricing }