/*
	File for handling individual listeners that are
	needed for both add and edit cards
*/

// Util imports
import { fileSelect, addToList, addGenreToList, addRateToList } from "./helperFunctions.js";

/*********************************/
/*   Apply Past Card Listeners   */
/*********************************/
function applyPastCardListeners(addForm) {
	// Get access to file input button
	let fileInputBtn = addForm.getElementsByClassName("fileCont")[0].firstElementChild;

	let instrumentsCont = document.getElementById("instrumentsCont");
	let addInstrumentBtn = instrumentsCont.querySelector("input[type='button']");
	
	if (getComputedStyle(addForm).display === "block") {
		// Add event listener to file input
		fileInputBtn.addEventListener("change",fileSelect, { capture: false });
		// Add event listener to button
		addInstrumentBtn.addEventListener("click",addToList,{ capture: false })
	}
	else {
		// Remove event listener for file input
		fileInputBtn.removeEventListener("change",fileSelect, { capture: false });
		// Remove event listener from button
		addInstrumentBtn.removeEventListener("click",addToList,{ capture: false })
	}
}
/*************************************/
/*	Add Collaborators Card Listener  */
/*************************************/
function applyCollaboratorCardListeners(addForm) {
	// Get access to file input button
	let fileInputBtn = addForm.getElementsByClassName("fileCont")[0].firstElementChild;
	
	if (getComputedStyle(addForm).display === "block")
		// Add event listener to file input
		fileInputBtn.addEventListener("change",fileSelect, { capture: false });
	else
		// Remove event listener for file input
		fileInputBtn.removeEventListener("change",fileSelect, { capture: false });
}
/*********************************/
/*	Add Anecdotes Card Listener  */
/*********************************/
function applyAnecdoteCardListeners(addForm) {
	// Get access to file input button
	let fileInputBtn = addForm.getElementsByClassName("fileCont")[0].firstElementChild;

	if (getComputedStyle(addForm).display === "block")
		// Add event listener to file input
		fileInputBtn.addEventListener("change",fileSelect, { capture: false });
	else
		// Remove event listener for file input
		fileInputBtn.removeEventListener("change",fileSelect, { capture: false });
}
/*********************************/
/*   Add Present Card Listener   */
/*********************************/
function applyPresentCardListeners(addForm) {
	// Apply any listeners specific to collaborators cardd
}
function applyFutureCardListeners(addForm) {
	let instrumentsCont = addForm.querySelector("#instrumentsCont");
	let addInstrumentBtn = instrumentsCont.querySelector("input[type='button']");

	if (getComputedStyle(addForm).display === "none") 
		// Add event listener to button
		addInstrumentBtn.addEventListener("click",addToList,{ capture: false })
	else
		// Remove event listener from button
		addInstrumentBtn.removeEventListener("click",addToList,{ capture: false })
}
/********************/
/*   Editing page   */
/********************/
function applySingleInpuutListeners(inputCard) {
	// Access form of inputCard
	let form = inputCard.firstElementChild;

	// Apply any listeners specific to collaborators cardd	
}
function applyRateCardListeners(inputCard) {
	// Access form of inputCard
	let form = inputCard.firstElementChild;

	// Apply any listeners specific to collaborators cardd
}
function applyAddLiteratureTypeListeners(addCard) {
	// Access form of addCard
	let form = addCard.firstElementChild;
	// Apply add/delete genre listenerr
	// Apply add/delete rate listener
}
/***********************/
/*   Reedmaking Page   */
/***********************/
function applyReedmakinglisteners(addForm) {

}

export {
	applyPastCardListeners, applyCollaboratorCardListeners,
	applyAnecdoteCardListeners, applyPresentCardListeners, 
	applyFutureCardListeners, applySingleInpuutListeners,
	applyRateCardListeners, applyAddLiteratureTypeListeners,
	applyReedmakinglisteners
}