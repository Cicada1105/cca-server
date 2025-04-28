// Controller for connecting reed view with reed model

// Require reed model
import * as Reed from "../../models/reedmaking/reedModel.js";

// Require callback functions shared by all controllers
import { successCallback, failedCallback } from '../utils.js';
/*
	Future addReed documentation
*/
function addReed(event) {
	event.preventDefault();
	// Retrieve form elements
	const form = event.currentTarget;
	const elements = form.elements;

	// Create new reed based on inputs
	let newReed = {
		name: elements["name"].value,
		description: elements["description"].value,
		image: null,
		pricing: {}
	};

	// Retrieve flat rate toggle
	const isFlatRate = elements['flatRateCheckbox'].checked;

	if ( isFlatRate ) {
		let flatRate = elements['flatRateInput'].value;
		newReed['pricing'].flatRate = parseFloat(parseFloat(flatRate).toFixed(2));
	}
	else {
		// Only dynamic rates have a rate name
		newReed['pricing'].name = elements['rateNameInput'].value;
		
		// Get access to user inputted rates	
		const tbody = form.querySelector('table.displayRatesInputTable > tbody');
		const [ rateinputRow, flatRateInputRow, ...enteredRatesRows ] = tbody.getElementsByTagName("tr");
		// Loop through user entered rates, adding them to the newReed object
		newReed["pricing"].rates = enteredRatesRows.map(row => {
			const rowEls = row.children;
			let name = rowEls[0].textContent;
			// .slice(1) removes leading '$' character
			let costStr = rowEls[1].textContent.slice(1);
			// toFixed() turns formatted number into a string
			let cost = parseFloat(parseFloat(costStr).toFixed(2));

			return {
				name,
				cost
			}
		});
	}
	
	Reed.add(newReed).then(successCallback).catch(failedCallback);
}
/*
	Future updateReed documentation
*/
function updateReed(event) {
	event.preventDefault();
	// Retrieve form elements
	const form = event.currentTarget;
	const elements = form.elements;

	// Create new reed based on inputs
	let updatedReed = {
		id: elements['id'].value,
		name: elements['name'].value,
		description: elements['description'].value,
		pricing: { }
	};

	// Retrieve flat rate toggle
	const isFlatRate = elements['flatRateCheckbox'].checked;

	if ( isFlatRate ) {
		let flatRate = elements['flatRateInput'].value;
		updatedReed['pricing'].flatRate = parseFloat(parseFloat(flatRate).toFixed(2));
	}
	else {
		// Store rate entered rate name
		updatedReed['pricing'].name = elements['rateNameInput'].value;
		// Get access to user inputted rates	
		const tbody = form.querySelector('table.displayRatesInputTable > tbody');
		const [ rateinputRow, flatRateInputRow, ...enteredRatesRows ] = tbody.getElementsByTagName("tr");
		// Loop through user entered rates, adding them to the updatedReed object
		updatedReed["pricing"].rates = enteredRatesRows.map(row => {
			const rowEls = row.children;
			let name = rowEls[0].textContent;
			// .slice(1) removes leading '$' character
			let costStr = rowEls[1].textContent.slice(1);
			// toFixed() turns formatted number into a string
			let cost = parseFloat(parseFloat(costStr).toFixed(2));

			return {
				name,
				cost
			}
		});
	}
	
	Reed.update(updatedReed).then(successCallback).catch(failedCallback);
}
/*
	Future removeReed documentation
*/
function removeReed(event) {
	// Get and store pricing ID of current reed
	const dataSet = event.target.dataset;

	let reedID = dataSet['reed_id'];

	let reed = {
		id: reedID
	}
	
	Reed.remove(reed).then(successCallback).catch(failedCallback);
}

export { addReed, updateReed, removeReed }