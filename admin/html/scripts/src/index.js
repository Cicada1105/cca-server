import { addSong, updateSong, removeSong } from "./controllers/currentMusicController.js"
import { addEditingPricing, updateEditingPricing, removeEditingPricing } from "./controllers/editingController.js"
import { addFuturePerformance, updateFuturePerformance, removeFuturePerformance } from "./controllers/futurePerformancesController.js"
import { addPastPerformance, updatePastPerformance, removePastPerformance } from "./controllers/pastPerformancesController.js"
import { addReedmakingPricing, updateReedmakingPricing, removeReedmakingPricing } from "./controllers/reedmakingController.js"

import { handleEditDeleteClick } from "./utils.js";

const initListeners = () => {
	let headers = document.getElementsByClassName("headerCont");
	let pastCards = document.getElementsByClassName("pastCard");
	let presentCards = document.getElementsByClassName("presentCard");
	let futureCards = document.getElementsByClassName("futureCard");

	// Set click event listener for Add button of Past Performances
	headers[0].lastElementChild.addEventListener("click",addPastPerformance);
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
		editBtnCont.addEventListener("click", handleEditDeleteClick.bind(updatePastPerformance));
		deleteBtnCont.addEventListener("click",handleEditDeleteClick.bind(removePastPerformance));
	}
	// Set click event listener for Add button of Current Music
	headers[1].lastElementChild.addEventListener("click",addSong);
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
		editBtnCont.addEventListener("click",handleEditDeleteClick.bind(updateSong));
		deleteBtnCont.addEventListener("click",handleEditDeleteClick.bind(removeSong));
	}
	// Set click event listener for Add button of Future Performances
	headers[2].lastElementChild.addEventListener("click",addFuturePerformance);
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
		editBtnCont.addEventListener("click",handleEditDeleteClick.bind(updateFuturePerformance));
		deleteBtnCont.addEventListener("click",handleEditDeleteClick.bind(removeFuturePerformance));
	}
}
export { initListeners }