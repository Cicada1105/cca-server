// Controller for connecting editing view with editing model

// Require editing model
import * as Editing from "../models/editingModel.js";
/*
	Future addEditingPricing documentation
*/
function addEditingPricing(event) {
	console.log(event);
	let pricing = "ADDING EDITING PRICING";
	Editing.add(pricing);
}
/*
	Future updateEditingPricing documentation
*/
function updateEditingPricing(event) {
	console.log(event);
	let pricing = "UPDATING PRICING";
	Editing.edit(pricing);
}
/*
	Future removeEditingPricing documentation
*/
function removeEditingPricing(event) {
	console.log(event);
	let pricing = "REMOVING PRICING";
	Editing.remove(pricing);
}

export { addEditingPricing, updateEditingPricing, removeEditingPricing }