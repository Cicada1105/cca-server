/*
	This file is for "building" data for displaying edit cards
*/

// Imports
import * as Build from "../build/";
import { 
	getGenreIdentifierData, getEditingRateIDData, 
	getLitIdentifierData,getReedSingleInputIDData,
	getAddReedIdentifierData, getReedRateIDData 
} from "../utils/getIdentifierData.js";
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
/***************************/
/*   Edit Card Listeners   */
/***************************/
function editPastCard(event) {
	let editPastPerformance = this;

	// Remove image border and icon from input card since selected past card image will replace it
	removeImgBorder();

	// Get display card to retrieve access all data of current card
	// path[0] === icon, path[1] === edit button container, path[2] === controls cont, path[3] === displayCard
	let displayCard = event.path[3];
	// Get data from current card
	let displayData = getPastPerformanceData(displayCard);

	/* 
		Build basic past performance card, binding functions and 
		data associated with editPastCard to value of "this"
	*/
	Build.buildPastCard.call({
		submitMethod: editPastPerformance,
		displayData
	}, event); // First param = value of 'this', ...rest = arguments
}
function editAnecdoteCard(event) {
	let editAnecdote = this;

	// Remove image border and icon from input card since selected past card image will replace it
	removeImgBorder();

	// Get display card to retrieve access all data of current card
	// path[0] === icon, path[1] === edit button container, path[2] === controls cont, path[3] === displayCard
	let displayCard = event.path[3];

	// Get data from current card
	let displayData = getAnecdoteData(displayCard);

	/* 
		Build basic anecdote card, binding functions and 
		data associated with editAnecdoteCard to 
		value of "this"
	*/
	Build.buildAnecdoteCard.call({
		submitMethod: editAnecdote,
		displayData
	}, event); // First param = value of 'this', ...rest = arguments
}
function editCollaboratorCard(event) {
	let editCollaborator = this;

	// Remove image border and icon from input card since selected past card image will replace it
	removeImgBorder();
	
	// Get display card to retrieve access all data of current card
	// path[0] === icon, path[1] === edit button container, path[2] === controls cont, path[3] === displayCard
	let displayCard = event.path[3];

	// Get data from current card
	let displayData = getCollaboratorData(displayCard);

	/* 
		Build basic collaborator card, binding functions and 
		data associated with editCollaboratorCard to 
		value of "this"
	*/
	Build.buildCollaboratorCard.call({
		submitMethod: editCollaborator,
		displayData
	}, event); // First param = value of 'this', ...rest = arguments
}
function editPresentCard(event) {
	let editSong = this;

	// Get display card to retrieve access all data of current card
	// path[0] === icon, path[1] === edit button container, path[2] === controls cont, path[3] === displayCard
	let displayCard = event.path[3];

	// Get data from current card
	let displayData = getPresentPerformanceData(displayCard);

	/* 
		Build basic present performance card, binding functions and 
		data associated with editPresentCard to 
		value of "this"
	*/
	Build.buildPresentCard.call({
		submitMethod: editSong,
		displayData
	}, event);// First param = value of 'this', ...rest = arguments
}
function editFutureCard(event) {
	let editFuturePerformance = this;

	// Get display card to retrieve access all data of current card
	// path[0] === icon, path[1] === edit button container, path[2] === controls cont, path[3] === displayCard
	let displayCard = event.path[3];

	// Get data from current card
	let displayData = getFuturePerformanceData(displayCard);

	/* 
		Build basic future performance card, binding functions and 
		data associated with editFutureCard to 
		value of "this"
	*/
	Build.buildFutureCard.call({
		submitMethod: editFuturePerformance,
		displayData
	}, event);// First param = value of 'this', ...rest = arguments
}
function editEditingLitTypeCard(event) {
	let editLitType = this;

	// Get identifier data for card
	let { titleData } = getLitIdentifierData(event);

	// Get data for current card
	let displayData = getLitDisplayData(event);

	/* 
		Build basic editing literature card, binding functions and 
		data associated with editEditingLitTypeCard to 
		value of "this"
	*/
	Build.buildSingleInputCard.call({
		submitMethod: editLitType,
		displayData,
		titleData
	}, event); // First param = value of 'this', ...rest = arguments
}
function editEditingGenreCard(event) {
	let editGenre = this;

	// Get identifier data for card
	let { idData, titleData } = getGenreIdentifierData(event);

	// Get data from current card
	let displayData = getGenreDisplayData(event);
	
	/* 
		Build basic editing genre card, binding functions and 
		data associated with editEditingGenreCard to value of "this"
	*/
	Build.buildSingleInputCard.call({
		submitMethod: editGenre,
		displayData,
		idData,
		titleData
	}, event); // First param = value of 'this', ...rest = arguments
}
function editEditingRateCard(event) {
	let editRate = this;

	// Get identifier data for card
	let { idData, titleData } = getEditingRateIDData(event);

	// Get data from current card
	let displayData = getEditingRateDisplayData(event);
	
	/* 
		Build basic editing genre card, binding functions and 
		data associated with editEditingRateCard to value of "this"
	*/
	Build.buildEditingRateCard.call({
		submitMethod: editRate,
		displayData,
		idData,
		titleData
	}, event); // First param = value of 'this', ...rest = arguments
}
function editReedNameCard(event) {
	let editReedName = this;

	// Get identifier data for card
	let { titleData } = getReedSingleInputIDData(event);
	// Get data from current card
	let displayData = getReedNameDisplayData(event);

	/* 
		Build basic reedmaking card, binding functions and 
		data associated with editReedNameCard to 
		value of "this"
	*/
	Build.buildReedNameCard.call({
		submitMethod:editReedName,
		titleData,
		displayData
	},event);
}
function editReedDescriptionCard(event) {
	let editReedDescription = this;

	// Get identifier data for card
	let { titleData } = getReedSingleInputIDData(event);
	// Get data from current card
	let displayData = getReedDescriptionDisplayData(event);

	/* 
		Build basic reedmaking card, binding functions and 
		data associated with editReedDescriptionCard to 
		value of "this"
	*/
	Build.buildReedDescriptionCard.call({
		submitMethod:editReedDescription,
		titleData,
		displayData
	},event);
}
function editReedRateCard(event) {
	let editReedRate = this;

	// Get identifier data for card
	let { idData, titleData } = getReedRateIDData(event);
	// Get data from current card
	let displayData = getReedRateDisplayData(event);

	/* 
		Build basic reedmaking card, binding functions and 
		data associated with editReedRateCard to 
		value of "this"
	*/
	Build.buildReedRateCard.call({
		submitMethod:editReedRate,
		idData,
		titleData,
		displayData
	},event);
}

export {
	editPastCard, editAnecdoteCard, editCollaboratorCard, 
	editPresentCard, editFutureCard, editEditingLitTypeCard,
	editEditingGenreCard, editEditingRateCard, editReedNameCard, 
	editReedDescriptionCard, editReedRateCard
}