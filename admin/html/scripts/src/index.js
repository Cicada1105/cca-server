import * as PastController from "./controllers/pastPerformancesController.js"
import * as PresentController from "./controllers/currentMusicController.js"
import * as FutureController from "./controllers/futurePerformancesController.js"
import * as EditingController from "./controllers/editingController.js"
import * as ReedmakingController from "./controllers/reedmakingController.js"

import { handleEditDeleteClick } from "./listeners/display_card/";
import { addPastCardListener, addPresentCardListener, addFutureCardListener } from "./listeners/add_card/";

const initListeners = () => {
	// Get header containers to access add buttons
	let headers = document.getElementsByClassName("headerCont");
	// Access displayed cards
	let pastCards = document.getElementsByClassName("pastCard");
	let presentCards = document.getElementsByClassName("presentCard");
	let futureCards = document.getElementsByClassName("futureCard");

	// Set click event listener for Add button of Past Performances
	headers[0].lastElementChild.addEventListener("click",addPastCardListener.bind(PastController.addPastPerformance));
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
	// Set click event listener for Add button of Current Music
	headers[1].lastElementChild.addEventListener("click", addPresentCardListener.bind(PresentController.addSong));
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
	// Set click event listener for Add button of Future Performances
	headers[2].lastElementChild.addEventListener("click",addFutureCardListener.bind(FutureController.addFuturePerformance));
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

export { initListeners }