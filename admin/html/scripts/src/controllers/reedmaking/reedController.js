// Controller for connecting reed view with reed model

// Require reed model
import * as Reed from "../../models/reedmaking/reedModel.js";

// Require callback functions shared by all controllers
import { successCallback, failedCallback } from '../utils.js';
/*
	Future addReed documentation
*/
function addReed(event) {
	// Store instane of add reed card
	let path = event.composedPath();
	const card = path[2];
	// Retrieve form input and its elements
	const form = card.querySelector("form.addForm");
	const elements = form.elements;

	// Create new reed based on inputs
	let newReed = {
		name: elements["name"].value,
		description: elements["description"].value,
		pricing: []
	};

	// Get access to user inputted rates
	const table = form.getElementsByTagName("table")[0];
	const tbody = table.lastElementChild;
	const [ inputRow, ...enteredRatesRows ] = tbody.getElementsByTagName("tr");
	// Loop through user entered rates, adding them to the newReed object
	newReed["pricing"] = enteredRatesRows.map(row => {
		const rowEls = row.children;

		return {
			quantity: parseInt(rowEls[0].textContent),
			cost: parseInt(rowEls[1].textContent)	
		}
	});

	Reed.add(newReed).then(successCallback).catch(failedCallback);
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