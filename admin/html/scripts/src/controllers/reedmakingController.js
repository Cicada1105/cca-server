// Controller for connecting reedmaking view with reedmaking model

// Require reedmaking model
import * as Reedmaking from "../models/reedmakingModel.js";
/*
	Future addReedmakingPricing documentation
*/
function addReedmakingPricing(event) {
	let pricing = "NEW REEDMAKING PRICING";
	Reedmaking.add(pricing);
}
/*
	Future updateReedmakingPricing documentation
*/
function updateReedmakingPricing(event) {
	let pricing = "UPDATING REEDMAKING PRICING";
	Reedmaking.edit(pricing);
}
/*
	Future removeReedmakingPricing documentation
*/
function removeReedmakingPricing(event) {
	// Get and store pricing ID of current reed
	let pricingID = event.target.dataset.id;

	Reedmaking.remove(pricingID).then((result) => {
		let { msg, status } = result;
		alert(`${status}: ${msg}`);
		document.location.reload();
	}).catch((error) => {
		console.log("Error:");
		console.log(error);
	});
}

export { addReedmakingPricing, updateReedmakingPricing, removeReedmakingPricing }