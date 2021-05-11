/*
	This file is for "building" data for displaying edit cards
*/

// Imports
import { 
	buildPastCardListener, buildAnecdoteCardListener, buildCollaboratorCardListener,
	buildPresentCardListener, buildFutureCardListener, buildSingleInputListener, 
	buildEditingRateCardListener, buildReedmakingCardListener
} from "../utils/buildCardListeners.js";
import { getGenreIdentifierData, getRateIdentifierData, getLitIdentifierData } from "../utils/getEditingIdData.js";
import { 
	getPastPerformanceData, getCollaboratorData, getAnecdoteData,
	getPresentPerformanceData, getFuturePerformanceData,
	getLitDisplayData, getGenreDisplayData, getRateDisplayData,
	getReedmakingDisplayData
} from "./utils/getDisplayData.js";

/***************************/
/*   Edit Card Listeners   */
/***************************/
function editPastCardListener(event) {
	let editPastPerformance = this;

	// Get display card to retrieve access all data of current card
	// path[0] === icon, path[1] === edit button container, path[2] === controls cont, path[3] === displayCard
	let displayCard = event.path[3];
	// Get data from current card
	let displayData = getPastPerformanceData(displayCard);
	
	/* 
		Build basic past performance card, binding functions and 
		data associated with editPastCardListener to value of "this"
	*/
	buildPastCardListener.call({
		submitMethod: editPastPerformance,
		displayData
	}, event); // First param = value of 'this', ...rest = arguments
}
function editAnecdoteCardListener(event) {
	let editAnecdote = this;

	// Get display card to retrieve access all data of current card
	// path[0] === icon, path[1] === edit button container, path[2] === controls cont, path[3] === displayCard
	let displayCard = event.path[3];

	// Get data from current card
	let displayData = getAnecdoteData(displayCard);

	/* 
		Build basic anecdote card, binding functions and 
		data associated with editAnecdoteCardListener to 
		value of "this"
	*/
	buildAnecdoteCardListener.call({
		submitMethod: editAnecdote,
		displayData
	}, event); // First param = value of 'this', ...rest = arguments
}
function editCollaboratorCardListener(event) {
	let editCollaborator = this;

	// Get display card to retrieve access all data of current card
	// path[0] === icon, path[1] === edit button container, path[2] === controls cont, path[3] === displayCard
	let displayCard = event.path[3];

	// Get data from current card
	let displayData = getCollaboratorData(displayCard);

	/* 
		Build basic collaborator card, binding functions and 
		data associated with editCollaboratorCardListener to 
		value of "this"
	*/
	buildCollaboratorCardListener.call({
		submitMethod: editCollaborator,
		displayData
	}, event); // First param = value of 'this', ...rest = arguments
}
function editPresentCardListener(event) {
	let editSong = this;

	// Get display card to retrieve access all data of current card
	// path[0] === icon, path[1] === edit button container, path[2] === controls cont, path[3] === displayCard
	let displayCard = event.path[3];

	// Get data from current card
	let displayData = getPresentPerformanceData(displayCard);
	
	/* 
		Build basic present performance card, binding functions and 
		data associated with addCollaboratorCardListener to 
		value of "this"
	*/
	buildPresentCardListener.call({
		submitMethod: editSong,
		displayData
	}, event);// First param = value of 'this', ...rest = arguments
}
function editFutureCardListener(event) {
	let editFuturePerformance = this;

	// Get display card to retrieve access all data of current card
	// path[0] === icon, path[1] === edit button container, path[2] === controls cont, path[3] === displayCard
	let displayCard = event.path[3];

	// Get data from current card
	let displayData = getFuturePerformanceData(displayCard);

	/* 
		Build basic future performance card, binding functions and 
		data associated with editFutureCardListener to 
		value of "this"
	*/
	buildFutureCardListener.call({
		submitMethod: editFuturePerformance,
		displayData
	}, event);// First param = value of 'this', ...rest = arguments
}
function editEditingLiteratureTypeListener(event) {
	let editLitType = this;

	// Get identifier data for card
	let { titleData } = getLitIdentifierData(event);

	// Get data for current card
	let displayData = getLitDisplayData(event);

	/* 
		Build basic editing literature card, binding functions and 
		data associated with editEditingLiteratureTypeListener to 
		value of "this"
	*/
	buildSingleInputListener.call({
		submitMethod: editLitType,
		displayData,
		titleData
	}, event); // First param = value of 'this', ...rest = arguments
}
function editEditingGenreListener(event) {
	let editGenre = this;

	// Get identifier data for card
	let { idData, titleData } = getGenreIdentifierData(event);

	// Get data from current card
	let displayData = getGenreDisplayData(event);
	
	/* 
		Build basic editing genre card, binding functions and 
		data associated with editEditingGenreListener to value of "this"
	*/
	buildSingleInputListener.call({
		submitMethod: editGenre,
		displayData,
		idData,
		titleData
	}, event); // First param = value of 'this', ...rest = arguments
}
function editEditingRateListener(event) {
	let editRate = this;

	// Get identifier data for card
	let { idData, titleData } = getRateIdentifierData(event);

	// Get data from current card
	let displayData = getRateDisplayData(event);

	/* 
		Build basic editing genre card, binding functions and 
		data associated with editEditingRateListener to value of "this"
	*/
	buildEditingRateCardListener.call({
		submitMethod: editRate,
		displayData,
		idData,
		titleData
	}, event); // First param = value of 'this', ...rest = arguments
}
function editReedmakingCardListener(event) {
	let editReedPrice = this;

	// Get display card to retrieve access all data of current card
	// path[0] === icon, path[1] === edit button container, path[2] === controls cont, path[3] === displayCard
	let displayCard = event.path[3];
	// Get data from current card
	let displayData = getReedmakingDisplayData(displayCard);

	/* 
		Build basic reedmaking card, binding functions and 
		data associated with addReedmakingCardListener to 
		value of "this"
	*/
	buildReedmakingCardListener.call({
		submitMethod:editReedPrice,
		displayData
	},event);
}

export {
	editPastCardListener, editAnecdoteCardListener,
	editCollaboratorCardListener, editPresentCardListener,
	editFutureCardListener, editEditingLiteratureTypeListener,
	editEditingGenreListener, editEditingRateListener,
	editReedmakingCardListener
}