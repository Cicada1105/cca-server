/*
	This file contains additional functionality for clearing forms
*/

const resetImage = (form) => {
	let imgCont = form.querySelector("#imgCont");
	let icon = imgCont.firstElementChild;
	let img = imgCont.lastElementChild;
	img.src = "";
	img.alt = "";
	// Set border of image container and icon
	imgCont.style.border = "2px dotted black";
	icon.style.display = "block";
}
const resetInstruments = (form) => {
	let instrumentsCont = form.querySelector("#instrumentsCont");
	let instrumentsUL = instrumentsCont.lastElementChild;
	let instruments = instrumentsUL.childNodes;
	let numInstruments = instrumentsUL.childElementCount;

	for (let i = 0; i < numInstruments; i++) 
		instruments[0].remove();
}

function clearPastForm(form) {
	// Reset image attributes 
	resetImage(form);
	// Clear items in instrument list
	resetInstruments(form);

	// Clear form
	form.reset();
}
function clearCollaboratorForm(form) {
	// Reset image
	resetImage(form);

	// Clear form
	form.reset();
}
function clearAnecdoteForm(form) {
	// Reset image
	resetImage(form);

	// Clear form
	form.reset();
}
function clearPresentForm(form) {

	// Clear form
	form.reset();
}
function clearFutureForm(form) {
	// Clear items in instrument list
	resetInstruments(form);

	// Clear form
	form.reset();
}
/*  
	Clear functions for service pages (editing and reedmaking)
*/
/*   Functions applied across both pages   */
const removeEditingInputForm = (displayedEl) => {
	// Remove form and bg overlay from screen
	displayedEl.style.display = "none";
	// Remove form and bg overlay from screen
	let layOver = document.getElementById("backDropCont");
	layOver.style.display = "none";
	// Allow normal body scrolling
	document.body.style.overflowY = "scroll";
}
const clearBasicForm = (el) => {
	const form = el.querySelector("article.input > form");

	// Clear form
	form.reset();
	// Remove element and backdrop from screen
	removeEditingInputForm(el);
}
/*    Functions speciffic to individual forms  */
function clearSingleInputForm(el) {
	// Clear data specific to single input form

	// Clear basic form
	clearBasicForm(el);
}
function clearRatesInputForm(el) {
	// Clear data specific to rate input form

	// Clear basic form
	clearBasicForm(el);
}
function clearAddLitTypeInputForm(el) {
	const form = el.querySelector("article.input > form");
	// Clear Genres from list

	// Clear Rates from list

	// Clear basic form
	clearBasicForm(el);
}
function clearAddReedInputForm(el) {
	// Clear data specific to add reed form

	// Clear basic form
	clearBasicForm(el);
}
function clearReedmNameForm(el) {
	// Clear data specific to edit reed name form

	// Clear basic form
	clearBasicForm(el);
}
function clearReedDescriptionForm(el) {
	// Clear data specific to edit reed description form

	// Clear basic form
	clearBasicForm(el);
}
function clearReedRatesForm(el) {
	// Clear data specific to add/edit reed rate form

	// Clear basic form
	clearBasicForm(el);
}

export {
	clearPastForm, clearCollaboratorForm, clearAnecdoteForm,
	clearPresentForm, clearFutureForm, clearSingleInputForm, 
	clearRatesInputForm, clearAddLitTypeInputForm, clearAddReedInputForm,
	clearReedmNameForm, clearReedDescriptionForm, clearReedRatesForm
}