import * as PastController from "./controllers/pastPerformancesController.js"
import * as PresentController from "./controllers/currentMusicController.js"
import * as FutureController from "./controllers/futurePerformancesController.js"
import * as EditingController from "./controllers/editingController.js"
import * as ReedmakingController from "./controllers/reedmakingController.js"

import { handleEditDeleteClick } from "./listeners/display_card/";
import { addPastCardListener, addPresentCardListener, addFutureCardListener } from "./listeners/add_card/";

const initListeners = () => {
	/* Set evet listener for navigation */
	// background overlay
	let bg_overlay = document.getElementById("bg_block");
	// transparent container holding navigation bar container
	let side_nav_cont = document.getElementById("side_nav_cont");
	// navigation bar container
	let nav_bar_cont = document.getElementById("nav_bar_cont");
	// Get access to X button
	let i_btn = nav_bar_cont.getElementsByTagName("i")[0];

	// Add click evennt litener to button
	i_btn.addEventListener("click",function() {
		let is_displayed = bg_overlay.style.display === "block";

		// Set attributes depending on state of navigation bar
		bg_overlay.style.display = is_displayed ? "none" : "block";
		side_nav_cont.style.left = is_displayed ? "-21rem" : "0rem";
		nav_bar_cont.style.left = is_displayed ? "-21rem" : "0rem";
		i_btn.style.right = is_displayed ? "-30px" : "20px";
		// Change class of i_btn between "X" and "hamburger bars" once transition is done
		i_btn.addEventListener("transitionend",function() {
			let oldClassName = i_btn.classList[1];
			let newClassName = is_displayed ? "fa-bars" : "fa-times";

			i_btn.classList.replace(oldClassName,newClassName);
		},{once:true});
	});

	let pathname = document.location.pathname; // Get current path of file
	let paths = pathname.split("/"); // Split up pathname into sub paths
	let last_path = paths.slice(paths.length - 1); // Return last path to determine current location
	// Call specific listeners depending on path name
	switch(last_path[0]) {
		case "past":
			initPastPerformanceListeners();
		break;
		case "collaborators":
			initCollaboratorListener();
		break;
		case "anecdotes":
			initAnecdoteListeners();
		break;
		case "present":
			initMusicStandListeners();
		break;
		case "future":
			initFuturePerformancesListeners();
		break;
		case "editing":
			initEditingListeners();
		break
		case "reedmaking":
			initReedmakingListeners();
		break;
	}
}
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

export { initListeners }