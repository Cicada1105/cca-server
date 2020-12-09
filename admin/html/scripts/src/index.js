import { addSong, updateSong, removeSong } from "./controllers/currentMusicController.js"
import { addEditingPricing, updateEditingPricing, removeEditingPricing } from "./controllers/editingController.js"
import { addFuturePerformance, updateFuturePerformance, removeFuturePerformance } from "./controllers/futurePerformancesController.js"
import { addPastPerformance, updatePastPerformance, removePastPerformance } from "./controllers/pastPerformancesController.js"
import { addReedmakingPricing, updateReedmakingPricing, removeReedmakingPricing } from "./controllers/reedmakingController.js"

const initListeners = () => {
	let pastCards = document.getElementsByClassName("pastCard");
	let presentCards = document.getElementsByClassName("presentCard");
	let futureCards = document.getElementsByClassName("futureCard");

	// Loop throuh past cards, adding event listeners to edit and delete buttons
	for (let card of pastCards) {
		// Get controls container 
		let controlsCont = card.lastElementChild;
		// Get access to edit and delete button tags
		let controls = controlsCont.getElementsByTagName("i");
		// Access each individual icon
		let editBtn = controls[0];
		let deleteBtn = controls[1];

		// Add event listeners to control buttons
		editBtn.addEventListener("click",updatePastPerformance);
		deleteBtn.addEventListener("click",removePastPerformance);
	}
	// Loop through present cards, adding event listeners to edit and delete buttons
	for (let card of presentCards) {
		// Get controls conntainer
		let controlsCont = card.lastElementChild;
		// Get access to edit and delete button tags
		let controls = controlsCont.getElementsByTagName("i");
		// Access each individual icon
		let editBtn = controls[0];
		let deleteBtn = controls[1];

		// Add event listeners to control buttons
		editBtn.addEventListener("click",updateSong);
		deleteBtn.addEventListener("click",removeSong);
	}
	// Loop through future cards, adding event listeners to edit and delete buttons
	for (let card of futureCards) {
		// Get controls conntainer
		let controlsCont = card.lastElementChild;
		// Get access to edit and delete button tags
		let controls = controlsCont.getElementsByTagName("i");
		// Access each individual icon
		let editBtn = controls[0];
		let deleteBtn = controls[1];

		// Add event listeners to control buttons
		editBtn.addEventListener("click",updateFuturePerformance);
		deleteBtn.addEventListener("click",removeFuturePerformance);
	}
}
export { initListeners }