/*
	This file is for constructing the basis of add/edit
	cards that can add additional functionality in their
	own implementation of the build card functions
*/

// Imports
import * as Clear from "./clearFunctions.js";
import * as Listeners from "./applyListeners.js";
import { buildGenericInputCard, buildGenericServiceInputCard } from "./genericBuildInputCard.js";

function buildPastCard(event) {
	// Retrieve and store function for applying listeners to past performances input card
	let applyListenersFunc = Listeners.applyPastCardListeners;
	// Retrieve and store function for clearing past performances input card
	let clearMethod = (form) => () => Clear.clearPastForm(form);

	/* 
		- Bind value of 'this' (contains display data and/or submit method)
		- Pass apply listeners function and clear method object as first argument
		- Pass event as second argument
	*/
	buildGenericInputCard.call(this,{
		applyListenersFunc,
		clearMethod
	}, event); // First param = value of 'this', ...rest = arguments
}
function buildAnecdoteCard(event) {
	// Retrieve and store function for applying listeners to anecdotes input card
	let applyListenersFunc = Listeners.applyAnecdoteCardListeners;
	// Retrieve and store function for clearing anecdotes input card
	let clearMethod = (form) => () => Clear.clearAnecdoteForm(form);

	/* 
		- Bind value of 'this' (contains display data and/or submit method)
		- Pass apply listeners function and clear method object as first argument
		- Pass event as second argument
	*/
	buildGenericInputCard.call(this, {
		applyListenersFunc,
		clearMethod
	}, event); // First param = value of 'this', ...rest = arguments
}
function buildCollaboratorCard(event) {
	// Retrieve and store function for applying listeners to collaborators input card
	let applyListenersFunc = Listeners.applyCollaboratorCardListeners;
	// Retrieve and store function for clearing collaborators input card
	let clearMethod = (form) => () => Clear.clearCollaboratorForm(form);
	
	/* 
		- Bind value of 'this' (contains display data and/or submit method)
		- Pass apply listeners function and clear method object as first argument
		- Pass event as second argument
	*/
	buildGenericInputCard.call(this, {
		applyListenersFunc,
		clearMethod
	}, event);// First param = value of 'this', ...rest = arguments
}
function buildPresentCard(event) {
	// Retrieve and store function for applying listeners to present performances input card
	let applyListenersFunc = Listeners.applyPresentCardListeners;
	// Retrieve and store function for clearing present performances input card
	let clearMethod = (form) => () => Clear.clearPresentForm(form)

	/* 
		- Bind value of 'this' (contains display data and/or submit method)
		- Pass apply listeners function and clear method object as first argument
		- Pass event as second argument
	*/
	buildGenericInputCard.call(this, {
		applyListenersFunc,
		clearMethod
	}, event);// First param = value of 'this', ...rest = arguments
}
function buildFutureCard(event) {
	// Retrieve and store function for applying listeners to future performances input card
	let applyListenersFunc = Listeners.applyFutureCardListeners;
	// Retrieve and store function for clearing future performances input card
	let clearMethod = (form) => () => Clear.clearFutureForm(form);

	/* 
		- Bind value of 'this' (contains display data and/or submit method)
		- Pass apply listeners function and clear method object as first argument
		- Pass event as second argument
	*/
	buildGenericInputCard.call(this, {
		applyListenersFunc,
		clearMethod
	}, event);// First param = value of 'this', ...rest = arguments
}
function buildEditingAddLitCard(event) {
	// Retrieve and store function for applying listeners to add editing literature type input card
	let applyListenersFunc = Listeners.applyAddLitTypeListeners;
	// Retrieve and store function for clearing add editing literature type input card
	let clearMethod = Clear.clearAddLitTypeInputForm;

	/* 
		- Bind value of 'this' (contains submit method and title data)
		- Pass id of input card, apply listeners function and clear method object as first argument
		- Pass event as second argument
	*/
	buildGenericServiceInputCard.call(this,{
		inputCardID: "addLitTypeInputCard",
		applyListenersFunc,
		clearMethod
	}, event); // First param = value of 'this', ...rest = arguments
}
function buildSingleInputCard(event) {
	// Retrieve and store function for applying listeners to single input card
	let applyListenersFunc = Listeners.applySingleInputListeners;
	// Retrieve and store function for clearing single input card
	let clearMethod = Clear.clearSingleInputForm;

	/* 
		- Bind value of 'this' (contains submit method and title data)
		- Pass id of input card, apply listeners function and clear method object as first argument
		- Pass event as second argument
	*/
	buildGenericServiceInputCard.call(this,{
		inputCardID: "singleInputCard",
		applyListenersFunc,
		clearMethod
	}, event); // First param = value of 'this', ...rest = arguments
}
function buildEditingRateCard(event) {
	// Retrieve and store function for applying listeners to rates input card
	let applyListenersFunc = Listeners.applyRateCardListeners;
	// Retrieve and store function for clearing rates input card
	let clearMethod = Clear.clearRatesInputForm;

	/* 
		- Bind value of 'this' (contains submit method and title data)
		- Pass id of input card, apply listeners function and clear method object as first argument
		- Pass event as second argument
	*/
	buildGenericServiceInputCard.call(this,{
		inputCardID: "rateInputCard",
		applyListenersFunc,
		clearMethod
	}, event); // First param = value of 'this', ...rest = arguments
}
function buildReedCard(event) {
	// Retrieve and store function for applying listeners to rates input card
	//let applyListenersFunc = Listeners.applyAddReedListeners;
	// Retrieve and store function for clearing rates input card
	let clearMethod = Clear.clearAddReedInputForm;

	/* 
		- Bind value of 'this' (contains submit method and title data)
		- Pass id of input card, apply listeners function and clear method object as first argument
		- Pass event as second argument
	*/
	buildGenericServiceInputCard.call(this,{
		inputCardID: "reedInputCard",
		clearMethod
	}, event); // First param = value of 'this', ...rest = arguments
}
function buildReedNameCard(event) {
	// Retrieve and store function for clearing rates input card
	let clearMethod = Clear.clearReedmNameForm;

	/* 
		- Bind value of 'this' (contains submit method and title data)
		- Pass id of input card and clear method object as first argument
		- Pass event as second argument
	*/
	buildGenericServiceInputCard.call(this,{
		inputCardID: "nameInputCard",
		clearMethod
	}, event); // First param = value of 'this', ...rest = arguments
}
function buildReedDescriptionCard(event) {
	// Retrieve and store function for clearing rates input card
	let clearMethod = Clear.clearReedDescriptionForm;

	/* 
		- Bind value of 'this' (contains submit method and title data)
		- Pass id of input card and clear method object as first argument
		- Pass event as second argument
	*/
	buildGenericServiceInputCard.call(this,{
		inputCardID: "descriptionInputCard",
		clearMethod
	}, event); // First param = value of 'this', ...rest = arguments
}
function buildReedRateCard(event) {
	// Retrieve and store function for clearing rates input card
	let clearMethod = Clear.clearReedRatesForm;

	/* 
		- Bind value of 'this' (contains submit method and title data)
		- Pass id of input card and clear method object as first argument
		- Pass event as second argument
	*/
	buildGenericServiceInputCard.call(this,{
		inputCardID: "rateInputCard",
		clearMethod
	}, event); // First param = value of 'this', ...rest = arguments
}

export { 
	buildPastCard, buildAnecdoteCard, buildCollaboratorCard,
	buildPresentCard, buildFutureCard, buildEditingAddLitCard,
	buildSingleInputCard, buildEditingRateCard, buildReedCard,
	buildReedNameCard, buildReedDescriptionCard, buildReedRateCard
}