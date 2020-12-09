// Controller for connecting reedmaking view with reedmaking model

// Require reedmaking model
import * as Reedmaking from "../models/reedmakingModel.js";
/*
	Future addReedmakingPricing documentation
*/
function addReedmakingPricing(event) {
	console.log(event);
	let pricing = "NEW REEDMAKING PRICING";
	Reedmaking.add(pricing);
}
/*
	Future updateReedmakingPricing documentation
*/
function updateReedmakingPricing(event) {
	console.log(event);
	let pricing = "UPDATING REEDMAKING PRICING";
	Reedmaking.edit(pricing);
}
/*
	Future removeReedmakingPricing documentation
*/
function removeReedmakingPricing(event) {
	console.log(event);
	let pricing = "REMOVING REEDMAKING PRICING";
	Reedmaking.remove(pricing);
}

export { addReedmakingPricing, updateReedmakingPricing, removeReedmakingPricing }