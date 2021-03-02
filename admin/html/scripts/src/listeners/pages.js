/*
	This file handles the listeners for specific pages
*/
import { handleEditDeleteClick } from "./display_card/";

import * as PastController from "../controllers/pastPerformancesController.js"
import * as PresentController from "../controllers/currentMusicController.js"
import * as FutureController from "../controllers/futurePerformancesController.js"
import * as EditingController from "../controllers/editingController.js"
import * as ReedmakingController from "../controllers/reedmakingController.js"

import { addPastCardListener, addPresentCardListener, addFutureCardListener } from "./add_card/";

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
const initCollaboratorListener = () => {
	console.log("Init collaborattors listeners");
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
	initCollaboratorListener,
	initAnecdoteListeners,
	initMusicStandListeners,
	initFuturePerformancesListeners,
	initEditingListeners,
	initReedmakingListeners
}