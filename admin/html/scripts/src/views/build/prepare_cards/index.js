/*
	This file is for "preparing" data by collecting
	display data and identifier data
*/

import { 
	getLitIdentifierData, getGenreIdentifierData, getEditingRateIDData, 
	getReedSingleInputIDData, getAddReedIdentifierData, getReedRateIDData
} from "./utils/getIdentifierData.js";
import { 
	getPastPerformanceData, getCollaboratorData, getAnecdoteData,
	getPresentPerformanceData, getFuturePerformanceData,
	getLitDisplayData, getGenreDisplayData, getEditingRateDisplayData,
	getReedNameDisplayData, getReedDescriptionDisplayData, 
	getReedRateDisplayData
} from "./utils/getDisplayData.js";

function removeImgBorder() {
	let form = document.getElementById("addForm");

	let imgCont = form.querySelector("#imgCont");
	let icon = imgCont.firstElementChild;

	// Remove dashed border
	imgCont.style.border = "none";
	// Remove icon so image can be displayed
	icon.style.display = "none";
}

function preparePastCardData(event) {
	// Retrieve target and store if it's add or edit button
	const el = event.target;
	const isEditBtn = el.classList.contains("fa-edit");

	let displayData;
	// If edit button was pressed, remove image border and get data
	if (isEditBtn) {
		removeImgBorder();
		// Get display card to retrieve access all data of current card
		// path[0] === icon, path[1] === edit button container, path[2] === controls cont, path[3] === displayCard
		let path = event.composedPath();
		let displayCard = path[3];
		// Get data from current card
		displayData = getPastPerformanceData(displayCard);
	}

	return {
		displayData
	}
}
function prepareAnecdoteCardData(event) {
	// Retrieve target and store if it's add or edit button
	const el = event.target;
	const isEditBtn = el.classList.contains("fa-edit");

	let displayData;
	// If edit button was pressed, remove image border and get data
	if (isEditBtn) {
		removeImgBorder();
		// Get display card to retrieve access all data of current card
		// path[0] === icon, path[1] === edit button container, path[2] === controls cont, path[3] === displayCard
		let path = event.composedPath();
		let displayCard = path[3];
		// Get data from current card
		displayData = getAnecdoteData(displayCard);
	}

	return {
		displayData
	}
}
function prepareCollaboratorCardData(event) {
	// Retrieve target and store if it's add or edit button
	const el = event.target;
	const isEditBtn = el.classList.contains("fa-edit");

	let displayData;
	// If edit button was pressed, remove image border and get data
	if (isEditBtn) {
		removeImgBorder();
		// Get display card to retrieve access all data of current card
		// path[0] === icon, path[1] === edit button container, path[2] === controls cont, path[3] === displayCard
		let path = event.composedPath();
		let displayCard = path[3];
		// Get data from current card
		displayData = getCollaboratorData(displayCard);
	}

	return {
		displayData
	}
}
function preparePresentCardData(event) {
	// Retrieve target and store if it's add or edit button
	const el = event.target;
	const isEditBtn = el.classList.contains("fa-edit");

	let displayData;
	// If edit button was pressed retrieve data
	if (isEditBtn) {
		// Get display card to retrieve access all data of current card
		// path[0] === icon, path[1] === edit button container, path[2] === controls cont, path[3] === displayCard
		let path = event.composedPath();
		let displayCard = path[3];
		// Get data from current card
		displayData = getPresentPerformanceData(displayCard);
	}

	return {
		displayData
	}
}
function prepareFutureCardData(event) {
	// Retrieve target and store if it's add or edit button
	const el = event.target;
	const isEditBtn = el.classList.contains("fa-edit");

	let displayData;
	// If edit button was pressed retrieve data
	if (isEditBtn) {
		// Get display card to retrieve access all data of current card
		// path[0] === icon, path[1] === edit button container, path[2] === controls cont, path[3] === displayCard
		let path = event.composedPath();
		let displayCard = path[3];
		// Get data from current card
		displayData = getFuturePerformanceData(displayCard);
	}

	return {
		displayData
	}
}
function prepareEditingLitTypeCardData(event) {
	// Get identifier data for card
	let { titleData } = getLitIdentifierData(event);

	// Retrieve target and store if it's add or edit button
	const el = event.target;
	const isEditBtn = el.classList.contains("fa-edit");

	let displayData;
	// If edit button was pressed retrieve data
	if (isEditBtn)
		// Get data for current card
		displayData = getLitDisplayData(event);

	return {
		titleData,
		displayData
	}
}
function prepareEditingGenreCardData(event) {
	// Get identifier data for card
	let { idData, titleData } = getGenreIdentifierData(event);

	// Retrieve target and store if it's add or edit button
	const el = event.target;
	const isEditBtn = el.classList.contains("fa-edit");

	let displayData;
	// If edit button was pressed retrieve data
	if (isEditBtn)
		// Get data for current card
		displayData = getGenreDisplayData(event);

	return {
		idData,
		titleData,
		displayData
	}
}
function prepareEditingRateCardData(event) {
	// Get identifier data for card
	let { idData, titleData } = getEditingRateIDData(event);

	// Retrieve target and store if it's add or edit button
	const el = event.target;
	const isEditBtn = el.classList.contains("fa-edit");

	let displayData;
	// If edit button was pressed retrieve data
	if (isEditBtn)
		// Get data for current card
		displayData = getEditingRateDisplayData(event);

	return {
		idData,
		titleData,
		displayData
	}
}
// prepareReedCardData is only used by adding new reed
function prepareReedCardData(event) {
	// Get identifier data for card
	let { titleData } = getAddReedIdentifierData(event);

	return {
		titleData
	}
}
// prepareReedNameCardData is only used by editing reed name
function prepareReedNameCardData(event) {
	// Get identifier data for card
	let { titleData } = getReedSingleInputIDData(event);
	// Get data from current card
	let displayData = getReedNameDisplayData(event);

	return {
		titleData,
		displayData
	}
}
// prepareReedDescriptionCardData is only usedby edit reed description
function prepareReedDescriptionCardData(event) {
	// Get identifier data for card
	let { titleData } = getReedSingleInputIDData(event);
	// Get data from current card
	let displayData = getReedDescriptionDisplayData(event);

	return {
		titleData,
		displayData
	}
}
function prepareReedRateCardData(event) {
	// Get identifier data for card
	let { idData, titleData } = getReedRateIDData(event);

	// Retrieve target and store if it's add or edit button
	const el = event.target;
	const isEditBtn = el.classList.contains("fa-edit");

	let displayData;
	if (isEditBtn)
		// Get data from current card
		displayData = getReedRateDisplayData(event);

	return {
		idData,
		titleData,
		displayData
	}
}

export { 
	preparePastCardData as PastPerformance, prepareAnecdoteCardData as PastAnecdote, 
	prepareCollaboratorCardData as PastCollaborator, preparePresentCardData as PresentPerformance, 
	prepareFutureCardData as FuturePerformance, prepareEditingLitTypeCardData as EditingLitType, 
	prepareEditingGenreCardData as EditingGenre, prepareEditingRateCardData as EditingRate, 
	prepareReedCardData as Reed, prepareReedNameCardData as ReedName, 
	prepareReedDescriptionCardData as ReedDescription, prepareReedRateCardData as ReedRate
}