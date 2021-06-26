/*
	This file is for "building" data for displaying add cards
*/

// Imports
import * as Build from "../build/";
// import apply listeners functions that are different from their "edit" counterpart
import { 
	getLitIdentifierData, getGenreIdentifierData, getEditingRateIDData, 
	getAddReedIdentifierData, getReedRateIDData
} from "../utils/getIdentifierData.js";

function addPastCard(event) {
	let addPastPerformance = this;

	/* 
		Build basic past performance card, binding functions and 
		data associated with addPastCard to value of "this"
	*/
	Build.buildPastCard.call({ 
		submitMethod: addPastPerformance
	}, event);
}
function addAnecdoteCard(event) {
	let addAnecdote = this;

	/* 
		Build basic anecdote card, binding functions and 
		data associated with addAnecdoteCard to 
		value of "this"
	*/
	Build.buildAnecdoteCard.call({
		submitMethod: addAnecdote
	}, event); // First param = value of 'this', ...rest = arguments
}
function addCollaboratorCard(event) {
	let addCollaborator = this;

	/* 
		Build basic collaborator card, binding functions and 
		data associated with addCollaboratorCard to 
		value of "this"
	*/
	Build.buildCollaboratorCard.call({
		submitMethod: addCollaborator
	}, event); // First param = value of 'this', ...rest = arguments
}
function addPresentCard(event) {
	let addSong = this;

	/* 
		Build basic present performance card, binding functions and 
		data associated with addPresentCard to 
		value of "this"
	*/
	Build.buildPresentCard.call({
		submitMethod: addSong
	}, event);// First param = value of 'this', ...rest = arguments
}
function addFutureCard(event) {
	let addFuturePerformance = this;

	/* 
		Build basic future performance card, binding functions and 
		data associated with addFutureCard to 
		value of "this"
	*/
	Build.buildFutureCard.call({
		submitMethod: addFuturePerformance
	}, event); // First param = value of 'this', ...rest = arguments
}
function addEditingLitTypeCard(event) {
	// Specify cardID here
	let addLitType = this;

	// Get identifier data for card
	let { titleData } = getLitIdentifierData(event);

	/* 
		Build basic editing lit card, binding functions and 
		data associated with addEditingLitTypeCard 
		to value of "this"
	*/
	Build.buildEditingAddLitCard.call({
		submitMethod: addLitType,
		titleData
	}, event); // First param = value of 'this', ...rest = arguments
}
function addEditingGenreCard(event) {
	// Specify cardID here
	let addGenre = this;

	// Get identifier data for card
	let { idData, titleData } = getGenreIdentifierData(event);

	/* 
		Build basic editing genre card, binding functions and 
		data associated with addEditingGenreCard to value 
		of "this"
	*/
	Build.buildSingleInputCard.call({
		submitMethod: addGenre,
		idData,
		titleData
	}, event); // First param = value of 'this', ...rest = arguments
}
function addEditingRateCard(event) {
	let addRate = this;

	// Get identifier data for card
	let { idData, titleData } = getEditingRateIDData(event);

	/* 
		Build basic editing rate card, binding functions and 
		data associated with addEditingRateCard to value of "this"
	*/
	Build.buildEditingRateCard.call({
		submitMethod: addRate,
		idData,
		titleData
	}, event); // First param = value of 'this', ...rest = arguments
}
function addReedCard(event) {
	let addReed = this;

	// Get identifier data for card
	let { titleData } = getAddReedIdentifierData(event);
	/* 
		Build basic reedmaking card, binding functions and 
		data associated with addReedCard to 
		value of "this"
	*/
	Build.buildReedCard.call({
		submitMethod:addReed,
		titleData
	},event);
}
function addReedRateCard(event) {
	let addRate = this;

	// Get identifier data for card
	let { titleData } = getReedRateIDData(event);
	/* 
		Build basic reed rate card, binding functions and 
		data associated with addReedRateCard to 
		value of "this"
	*/
	Build.buildReedRateCard.call({
		submitMethod:addRate,
		titleData
	},event);
}

export { 
	addPastCard, addAnecdoteCard, addCollaboratorCard, addPresentCard, 
	addFutureCard, addEditingLitTypeCard, addEditingGenreCard, 
	addEditingRateCard, addReedCard, addReedRateCard
}