/*
	This file contains functions for retrieving id data
	used for uniquely identifying data on the editing
	page
*/
function getLitIdentifierData(event) {
	// Store title data type to describe literature data
	const dataType = "Literature Type";

	return {
		titleData: { dataType }
	}
}
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
			cardID: litID
		},
		titleData: { 
			cardType: literatureType, 
			dataType 
		}
	}
}
function getEditingRateIDData(event) {
	// Get editing type associated w/ rate
	let table;

	let selectedEl = event.target;
	if (selectedEl.classList.contains("fa-plus-square")) {
		let caption = selectedEl.parentElement;
		table = caption.parentElement;
	}
	else {
		// may or may not return table
		let controls = selectedEl.parentElement;
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
			cardID: litID,
			editingType
		},
		titleData: { 
			cardType: literatureType, 
			dataType 
		}
	}
}
function getAddReedIdentifierData(event) {
	// Store title data type to describe reed data
	const dataType = "Reed Type";

	return {
		titleData: { dataType }
	}
}
function getReedSingleInputIDData(event) {
	// Store title data type to describe reed data
	let reedType = "";

	let selectedEl = event.target;
	if (selectedEl.classList.contains("editNameBtn")) {
		let nameHeaderCont = selectedEl.parentElement;
		let reedSection = nameHeaderCont.parentElement;
		reedType = reedSection.dataset["reedtype"];
	}
	else {
		let reedSection = selectedEl.parentElement;
		reedType = reedSection.dataset["reedtype"];
	}

	const dataType = "Name";

	return {
		titleData: { 
			cardType:reedType, 
			dataType 
		}
	}
}
function getReedRateIDData(event) {
	// Get reed type associated w/ rate
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

	// Store title data type to describe rate data
	const reedType = table.dataset["reedtype"];
	const reedID = table.dataset["reedid"];
	const dataType = "Rate";

	return {
		idData: {
			cardID: reedID
		},
		titleData: { 
			cardType: reedType, 
			dataType 
		}
	}
}

export { 
	getLitIdentifierData, getGenreIdentifierData, 
	getEditingRateIDData, getReedSingleInputIDData,
	getAddReedIdentifierData, getReedRateIDData
}