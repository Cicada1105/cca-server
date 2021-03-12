/*
	This file handles the listeners for specific pages
*/
import { handleEditDeleteClick } from "./display_card/";

/*   Performances Controllers   */
import * as PastController from "../controllers/performances/past/";
import * as PresentController from "../controllers/performances/currentMusicController.js";
import * as FutureController from "../controllers/performances/futureController.js";
import * as EditingController from "../controllers/editing/";
import * as ReedmakingController from "../controllers/reedmakingController.js";

import { addPastCardListener, addCollaboratorCardListener, addPresentCardListener, addFutureCardListener } from "./add_card/";

const initPastPerformanceListeners = () => {
	// Get header contaier to access add button
	let addBtn = document.getElementById("addBtn");
	// Access displayed cards
	let pastCards = document.getElementsByClassName("pastCard");
	// Set click event listener for Add button of Past Performances
	addBtn.addEventListener("click",addPastCardListener.bind(PastController.addPastPerformance));
	// Loop throuh past cards, adding event listeners to edit and delete buttons
	for (let card of pastCards) {
		// Get controls container 
		let controlsCont = card.lastElementChild;
		// Get access to edit and delete button containers
		let controlsConts = controlsCont.querySelectorAll("[class *= ctrlBtn]");
		// Access each individual container
		let editBtnCont = controlsConts[0];
		let deleteBtnCont = controlsConts[1];
		
		// Add event listeners to control buttons containers
		editBtnCont.addEventListener("click", handleEditDeleteClick.bind(PastController.updatePastPerformance));
		deleteBtnCont.addEventListener("click",handleEditDeleteClick.bind(PastController.removePastPerformance));
	}
}
const initCollaboratorListeners = () => {
	// Get access to add button
	let addBtn = document.getElementById("addBtn");
	// Access display cards
	let collaboratorCards = document.getElementsByClassName("collaboratorCard");
	// Set click event listener for Add button of Collaborators
	addBtn.addEventListener("click",addCollaboratorCardListener.bind(PastController.addCollaborator));
	// Loop through collaborator cards, adding event listeners to edit and delete buttons
	for (let card of collaboratorCards) {
		// Get controls container 
		let controlsCont = card.lastElementChild;
		// Get access to edit and delete button containers
		let controlsConts = controlsCont.querySelectorAll("[class *= ctrlBtn]");
		// Access each individual container
		let editBtnCont = controlsConts[0];
		let deleteBtnCont = controlsConts[1];
		
		// Add event listeners to control buttons containers
		editBtnCont.addEventListener("click", handleEditDeleteClick.bind(PastController.updateCollaborator));
		deleteBtnCont.addEventListener("click",handleEditDeleteClick.bind(PastController.removeCollaborator));
	}
}
const initAnecdoteListeners = () => {
	console.log("Init anecdotes listeners");
}
const initMusicStandListeners = () => {
	// Get header contaier to access add button
	let addBtn = document.getElementById("addBtn");
	// Access displayed cards
	let presentCards = document.getElementsByClassName("presentCard");

	// Set click event listener for Add button of Current Music
	addBtn.addEventListener("click", addPresentCardListener.bind(PresentController.addSong));
	// Loop through present cards, adding event listeners to edit and delete buttons
	for (let card of presentCards) {
		// Get controls conntainer
		let controlsCont = card.lastElementChild;
		// Get access to edit and delete button containers
		let controlsConts = controlsCont.querySelectorAll("[class *= ctrlBtn]");
		// Access each individual container
		let editBtnCont = controlsConts[0];
		let deleteBtnCont = controlsConts[1];

		// Add event listeners to control buttons containers
		editBtnCont.addEventListener("click",handleEditDeleteClick.bind(PresentController.updateSong));
		deleteBtnCont.addEventListener("click",handleEditDeleteClick.bind(PresentController.removeSong));
	}
}
const initFuturePerformancesListeners = () => {
	// Get header contaier to access add button
	let addBtn = document.getElementById("addBtn");
	// Access displayed cards
	let futureCards = document.getElementsByClassName("futureCard");

	// Set click event listener for Add button of Future Performances
	addBtn.addEventListener("click",addFutureCardListener.bind(FutureController.addFuturePerformance));
	// Loop through future cards, adding event listeners to edit and delete buttons
	for (let card of futureCards) {
		// Get controls conntainer
		let controlsCont = card.lastElementChild;
		// Get access to edit and delete button containers
		let controlsConts = controlsCont.querySelectorAll("[class *= ctrlBtn]");
		// Access each individual containers
		let editBtnCont = controlsConts[0];
		let deleteBtnCont = controlsConts[1];

		// Add event listeners to control buttons containers
		editBtnCont.addEventListener("click",handleEditDeleteClick.bind(FutureController.updateFuturePerformance));
		deleteBtnCont.addEventListener("click",handleEditDeleteClick.bind(FutureController.removeFuturePerformance));
	}
}
const initEditingListeners = () => {
	console.log("Init editing listeners");
}
const initReedmakingListeners = () => {
	console.log("Init reedmaking listeners");
}

export { 
	initPastPerformanceListeners,
	initCollaboratorListeners,
	initAnecdoteListeners,
	initMusicStandListeners,
	initFuturePerformancesListeners,
	initEditingListeners,
	initReedmakingListeners
}