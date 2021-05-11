/*
	This file is for "building" data for displaying add cards
*/

// Imports
import { 
	buildPastCardListener, buildAnecdoteCardListener, buildCollaboratorCardListener,
	buildPresentCardListener, buildFutureCardListener, buildEditingAddLitCardListener,
	buildSingleInputListener, buildEditingRateCardListener, buildReedmakingCardListener
} from "../utils/buildCardListeners.js";
// import apply listeners functions that are different from their "edit" counterpart
import { getGenreIdentifierData, getRateIdentifierData, getLitIdentifierData } from "../utils/getEditingIdData.js";

function addPastCardListener(event) {
	let addPastPerformance = this;

	/* 
		Build basic past performance card, binding functions and 
		data associated with addPastCardListener to value of "this"
	*/
	buildPastCardListener.call({ 
		submitMethod: addPastPerformance
	}, event);
}
function addAnecdoteCardListener(event) {
	let addAnecdote = this;

	/* 
		Build basic anecdote card, binding functions and 
		data associated with addAnecdoteCardListener to 
		value of "this"
	*/
	buildAnecdoteCardListener.call({
		submitMethod: addAnecdote
	}, event); // First param = value of 'this', ...rest = arguments
}
function addCollaboratorCardListener(event) {
	let addCollaborator = this;

	/* 
		Build basic collaborator card, binding functions and 
		data associated with addCollaboratorCardListener to 
		value of "this"
	*/
	buildCollaboratorCardListener.call({
		submitMethod: addCollaborator
	}, event); // First param = value of 'this', ...rest = arguments
}
function addPresentCardListener(event) {
	let addSong = this;

	/* 
		Build basic present performance card, binding functions and 
		data associated with addPresentCardListener to 
		value of "this"
	*/
	buildPresentCardListener.call({
		submitMethod: addSong
	}, event);// First param = value of 'this', ...rest = arguments
}
function addFutureCardListener(event) {
	let addFuturePerformance = this;

	/* 
		Build basic future performance card, binding functions and 
		data associated with addFutureCardListener to 
		value of "this"
	*/
	buildFutureCardListener.call({
		submitMethod: addFuturePerformance
	}, event); // First param = value of 'this', ...rest = arguments
}
function addEditingLiteratureTypeListener(event) {
	// Specify cardID here
	let addLitType = this;

	// Get identifier data for card
	let { titleData } = getLitIdentifierData(event);

	/* 
		Build basic editing lit card, binding functions and 
		data associated with addEditingLiteratureTypeListener 
		to value of "this"
	*/
	buildEditingAddLitCardListener.call({
		submitMethod: addLitType,
		titleData
	}, event); // First param = value of 'this', ...rest = arguments
}
function addEditingGenreListener(event) {
	// Specify cardID here
	let addGenre = this;

	// Get identifier data for card
	let { idData, titleData } = getGenreIdentifierData(event);

	/* 
		Build basic editing genre card, binding functions and 
		data associated with addEditingGenreListener to value 
		of "this"
	*/
	buildSingleInputListener.call({
		submitMethod: addGenre,
		idData,
		titleData
	}, event); // First param = value of 'this', ...rest = arguments
}
function addEditingRateListener(event) {
	let addRate = this;

	// Get identifier data for card
	let { idData, titleData } = getRateIdentifierData(event);

	/* 
		Build basic editing rate card, binding functions and 
		data associated with addEditingRateListener to value of "this"
	*/
	buildEditingRateCardListener.call({
		submitMethod: addRate,
		idData,
		titleData
	}, event); // First param = value of 'this', ...rest = arguments
}
function addReedmakingCardListener(event) {
	let addReed = this 

	/* 
		Build basic reedmaking card, binding functions and 
		data associated with addReedmakingCardListener to 
		value of "this"
	*/
	buildReedmakingCardListener.call({
		submitMethod:addReed
	},event);
}

export { 
	addPastCardListener, addAnecdoteCardListener, 
	addCollaboratorCardListener, addPresentCardListener, 
	addFutureCardListener, addEditingLiteratureTypeListener,
	addEditingGenreListener, addEditingRateListener,
	addReedmakingCardListener
}