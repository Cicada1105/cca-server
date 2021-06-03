/*
	This file contains functions for retrieving id data
	used for uniquely identifying data on the editing
	page
*/
function getGenreIdentifierData(event) {
	// Store data needed to uniquely and quickly identify genre data
	let table;

	let selectedEl = event.target;
	if (selectedEl.classList.contains("fa-plus-square")) {
		let caption = selectedEl.parentElement;
		table = caption.parentElement;
	}
	else {
		let controls = selectedEl.parentElement;
		let row = controls.parentElement;
		let tableBody = row.parentElement;
		table = tableBody.parentElement;	
	}

	let literatureType = table.dataset["littype"];
	let litID = table.dataset["litid"];
	const dataType = "Genre";

	return {
		idData: {
			litID
		},
		titleData: { literatureType, dataType }
	}
}
function getRateIdentifierData(event) {
	// Get editing type associated w/ rates
	let table;

	let selectedEl = event.target;
	if (selectedEl.classList.contains("fa-plus-square")) {
		let caption = selectedEl.parentElement;
		table = caption.parentElement;
	}
	else {
		// may or may not return table
		let controls = event.target.parentElement;
		let row = controls.parentElement;
		let tableBody = row.parentElement;
		table = tableBody.parentElement;	
	}

	let editingType = table.dataset["editingtype"];
	// Store title data type to describe rate data
	const literatureType = table.dataset["littype"];
	let litID = table.dataset["litid"];
	const dataType = "Rate";

	return {
		idData: {
			litID,
			editingType
		},
		titleData: { literatureType, dataType }
	}
}
function getLitIdentifierData(event) {
	// Store title data type to describe literature data
	const dataType = "Literature Type";

	return {
		titleData: { dataType }
	}
}

export { getGenreIdentifierData, getRateIdentifierData, getLitIdentifierData }