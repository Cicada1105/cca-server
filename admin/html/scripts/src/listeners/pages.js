/*
	This file handles the listeners for specific pages
*/
import { handleDeleteClick } from "./display_card/";

/*   Performances Controllers   */
import * as PastController from "../controllers/performances/past/";
import * as PresentController from "../controllers/performances/currentMusicController.js";
import * as FutureController from "../controllers/performances/futureController.js";
import * as EditingController from "../controllers/editing/";
import * as ReedmakingController from "../controllers/reedmakingController.js";

import * as Listeners from "./input_card/";

const initPastPerformanceListeners = () => {
	// Get header contaier to access add button
	let addBtn = document.getElementById("addBtn");
	// Access displayed cards
	let pastCards = document.getElementsByClassName("pastCard");
	// Set click event listener for Add button of Past Performances
	addBtn.addEventListener("click",Listeners.addPastCard.bind(PastController.addPastPerformance));
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
		editBtnCont.addEventListener("click", Listeners.editPastCard.bind(PastController.updatePastPerformance));
		deleteBtnCont.addEventListener("click",handleDeleteClick.bind(PastController.removePastPerformance));
	}
}
const initCollaboratorListeners = () => {
	// Get access to add button
	let addBtn = document.getElementById("addBtn");
	// Access display cards
	let collaboratorCards = document.getElementsByClassName("collaboratorCard");
	// Set click event listener for Add button of Collaborators
	addBtn.addEventListener("click",Listeners.addCollaboratorCard.bind(PastController.addCollaborator));
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
		editBtnCont.addEventListener("click", Listeners.editCollaboratorCard.bind(PastController.updateCollaborator));
		deleteBtnCont.addEventListener("click",handleDeleteClick.bind(PastController.removeCollaborator));
	}
}
const initAnecdoteListeners = () => {
	// Get access to add button
	let addBtn = document.getElementById("addBtn");
	// Access display cards
	let anecdoteCards = document.getElementsByClassName("anecdoteCard");
	// Set click event listener to add button of Anecdotes
	addBtn.addEventListener("click",Listeners.addAnecdoteCard.bind(PastController.addAnecdote));
	// Loop through anecdote cards, adding event listeners to edit and delte buttons
	for (let card of anecdoteCards) {
		// Get controls container
		let controlsCont = card.lastElementChild;
		// Get access to edit and delete buttons containers
		let controlsConts = controlsCont.querySelectorAll("[class *= ctrlBtn]");
		// Access each individual container 
		let editBtnCont = controlsConts[0];
		let deleteBtnCont = controlsConts[1];

		// Add event listeners to control buttons containers
		editBtnCont.addEventListener("click",Listeners.editAnecdoteCard.bind(PastController.updateAnecdote));
		deleteBtnCont.addEventListener("click",handleDeleteClick.bind(PastController.removeAnecdote));
	}
}
const initMusicStandListeners = () => {
	// Get header contaier to access add button
	let addBtn = document.getElementById("addBtn");
	// Access displayed cards
	let presentCards = document.getElementsByClassName("presentCard");

	// Set click event listener for Add button of Current Music
	addBtn.addEventListener("click", Listeners.addPresentCard.bind(PresentController.addSong));
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
		editBtnCont.addEventListener("click",Listeners.editPresentCard.bind(PresentController.updateSong));
		deleteBtnCont.addEventListener("click",handleDeleteClick.bind(PresentController.removeSong));
	}
}
const initFuturePerformancesListeners = () => {
	// Get header contaier to access add button
	let addBtn = document.getElementById("addBtn");
	// Access displayed cards
	let futureCards = document.getElementsByClassName("futureCard");

	// Set click event listener for Add button of Future Performances
	addBtn.addEventListener("click",Listeners.addFutureCard.bind(FutureController.addFuturePerformance));
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
		editBtnCont.addEventListener("click",Listeners.editFutureCard.bind(FutureController.updateFuturePerformance));
		deleteBtnCont.addEventListener("click",handleDeleteClick.bind(FutureController.removeFuturePerformance));
	}
}
const initEditingListeners = () => {
	// Get literature containers to access the add button
	let litCards = document.getElementsByClassName("literatureCard");
	/* 
		Get tables containing displayed genres to access add, edit and delete buttons

		Following returns all genre tables from literature containers. Tables are 1-to-1
		resulting in parallel collection with literature containers
	*/
	let genresTables = document.getElementsByClassName("displayGenres");
	/*
		Get tables containing rates for each editing type of each literature type

		To prevent looping within the literature loop, each literature loop will access
		it's fixed number of editing type rates (standard proofreading, experiemental
		editing, both) through the following indices: 0 + 3i (Standard proofreadings),
		1 + 3i (Experimental Editing) and 2 + 3i (Both)
	*/
	let ratesTables = document.getElementsByClassName("displayRates");

	// Add listener to literature add button
	let addLitCont = document.getElementById("addLitTypeCont");
	let addBtn = addLitCont.lastElementChild;

	addBtn.addEventListener("click",Listeners.addEditingLitTypeCard.bind(EditingController.addLiteratureType));

	// Loop through literature cards, adding listeners to add, edit and delete buttons
	for (let i = 0; i < litCards.length; i++) {
		// Add listener to genres add button
		let genresCaption = genresTables[i].firstElementChild; // caption holding table title and add button
		let addGenreBtn = genresCaption.lastElementChild; 
		addGenreBtn.addEventListener("click",Listeners.addEditingGenreCard.bind(EditingController.addGenre));

		// Loop through genres, access edit and delete buttons
		let genresControls = genresTables[i].getElementsByClassName("controls");
		for (const genreControl of genresControls) {
			// Add listener to edit buttton
			let controls = genreControl.getElementsByTagName("i");
			// Retrieve genre to display in delete confirmation
			let genre = genreControl.previousElementSibling.textContent;
			// Edit button
			controls[0].addEventListener("click",Listeners.editEditingGenreCard.bind(EditingController.updateGenre));
			// Delete button
			controls[1].addEventListener("click",(event) => confirm(`Are you sure you want to delete ${genre}?`) && EditingController.removeGenre(event));
		}

		// Access standard proofreading rates table
		let stndrdProofRatesTable = ratesTables[0 + (3 * i)]
		/*   Add button   */
		// Add listener to editing types add buttons
		let stndrdProofRatesCaption = stndrdProofRatesTable.firstElementChild;
		let addStandardProofRateBtn = stndrdProofRatesCaption.lastElementChild;
		addStandardProofRateBtn.addEventListener("click",Listeners.addEditingRateCard.bind(EditingController.addRate));
		/*   Edit/Delete buttons   */
		// Access rates
		let stndProofRates = stndrdProofRatesTable.lastElementChild.getElementsByTagName("tr");
		// Loop through standard proofreading rates, adding listeners to edit and delete buttons
		for (const ratesRow of stndProofRates) {
			// Store and format data to clarify to admin
			let rowEls = ratesRow.getElementsByTagName("td");
			let formatText = "";
			if (rowEls.length === 5) { // Does not include flatrate
				formatText += ` - Min: ${rowEls[0].textContent}\n`;
				formatText += ` - Max: ${rowEls[1].textContent}\n`;
				formatText += ` - Per Hour: ${rowEls[2].textContent}\n`;
				formatText += ` - Per Word: ${rowEls[3].textContent}`;
			}
			else { // Includes flatrate
				formatText += ` - Min: ${rowEls[0].textContent}\n`;
				formatText += ` - Max: ${rowEls[1].textContent}\n`;
				formatText += ` - Flat Rate: ${rowEls[2].textContent}\n`;
				formatText += ` - Per Hour: ${rowEls[3].textContent}\n`;	
				formatText += ` - Per Word: ${rowEls[4].textContent}`;	
			}
			// Access controls
			let controls = ratesRow.getElementsByTagName("i");
			// Edit button
			controls[0].addEventListener("click",Listeners.editEditingRateCard.bind(EditingController.updateRate));
			// Delete button
			controls[1].addEventListener("click",(event) => confirm(`Are you sure you want to remove the following rate: \n${formatText}`) && EditingController.removeRate(event));
		}

		// Access Experimental editing rates table
		let expEditRatesTable = ratesTables[1 + (3 * i)];
		/*   Add button   */
		let expEditRatesCaption = expEditRatesTable.firstElementChild;
		let addExpEditRateBtn = expEditRatesCaption.lastElementChild;
		addExpEditRateBtn.addEventListener("click",Listeners.addEditingRateCard.bind(EditingController.addRate));
		/*   Edit/Delete buttons   */
		// Access rates
		let expEditRates = expEditRatesTable.lastElementChild.getElementsByTagName("tr");
		// Loop through experimental editing rates, adding listeners to edit and delete buttons
		for (const ratesRow of expEditRates) {
			// Store and format data to clarify to admin
			let rowEls = ratesRow.getElementsByTagName("td");
			let formatText = "";
			if (rowEls.length === 5) { // Does not include flatrate
				formatText += ` - Min: ${rowEls[0].textContent}\n`;
				formatText += ` - Max: ${rowEls[1].textContent}\n`;
				formatText += ` - Per Hour: ${rowEls[2].textContent}\n`;
				formatText += ` - Per Word: ${rowEls[3].textContent}`;
			}
			else { // Includes flatrate
				formatText += ` - Min: ${rowEls[0].textContent}\n`;
				formatText += ` - Max: ${rowEls[1].textContent}\n`;
				formatText += ` - Flat Rate: ${rowEls[2].textContent}\n`;
				formatText += ` - Per Hour: ${rowEls[3].textContent}\n`;	
				formatText += ` - Per Word: ${rowEls[4].textContent}`;	
			}
			// Access controls
			let controls = ratesRow.getElementsByTagName("i");
			// Edit button
			controls[0].addEventListener("click",Listeners.editEditingRateCard.bind(EditingController.updateRate));
			// Delete button
			controls[1].addEventListener("click",(event) => confirm(`Are you sure you want to remove the following rate: \n${formatText}`) && EditingController.removeRate(event));
		}

		// Access Both rates table
		let bothEditingRatesTable = ratesTables[2 + (3 * i)];
		/*   Add button   */
		let bothEditingRatesCaption = bothEditingRatesTable.firstElementChild;
		let addBothEditingRateBtn = bothEditingRatesCaption.lastElementChild;
		addBothEditingRateBtn.addEventListener("click",Listeners.addEditingRateCard.bind(EditingController.addRate));
		/*   Edit/Delete buttons   */
		// Access rates
		let bothEditRates = bothEditingRatesTable.lastElementChild.getElementsByTagName("tr");
		// Loop through both editing rates, adding listeners to edit and delte buttons
		for (const ratesRow of bothEditRates) {
			// Store and format data to clarify to admin
			let rowEls = ratesRow.getElementsByTagName("td");
			let formatText = "";
			if (rowEls.length === 5) { // Does not include flatrate
				formatText += ` - Min: ${rowEls[0].textContent}\n`;
				formatText += ` - Max: ${rowEls[1].textContent}\n`;
				formatText += ` - Per Hour: ${rowEls[2].textContent}\n`;
				formatText += ` - Per Word: ${rowEls[3].textContent}`;
			}
			else { // Includes flatrate
				formatText += ` - Min: ${rowEls[0].textContent}\n`;
				formatText += ` - Max: ${rowEls[1].textContent}\n`;
				formatText += ` - Flat Rate: ${rowEls[2].textContent}\n`;
				formatText += ` - Per Hour: ${rowEls[3].textContent}\n`;	
				formatText += ` - Per Word: ${rowEls[4].textContent}`;	
			}
			// Access controls
			let controls = ratesRow.getElementsByTagName("i");
			// Edit button
			controls[0].addEventListener("click",Listeners.editEditingRateCard.bind(EditingController.updateRate));
			// Delete button
			controls[1].addEventListener("click",() => confirm(`Are you sure you want to remove the following rate: \n${formatText}`) && EditingController.removeRate);
		}
	}
}
const initReedmakingListeners = () => {
	// Get access to add button
	let addBtn = document.getElementById("addBtn");
	// Access display cards
	let reedmakingCards = document.getElementsByClassName("reedmakingCard");

	// Set click event listener for Add button of Reedmaking
	addBtn.addEventListener("click", Listeners.addReedmakingCard.bind(ReedmakingController.addReedmakingPricing));
	// Loop through reedmaking cards, adding event listeners to edit and delete buttons
	for (let card of reedmakingCards) {
		// Get controls conntainer
		let controlsCont = card.lastElementChild;
		// Get access to edit and delete button containers
		let controlsConts = controlsCont.querySelectorAll("[class *= ctrlBtn]");
		// Access each individual container
		let editBtnCont = controlsConts[0];
		let deleteBtnCont = controlsConts[1];

		// Add event listeners to control buttons containers
		editBtnCont.addEventListener("click",Listeners.editReedmakingCard.bind(ReedmakingController.updateReedmakingPricing));
		deleteBtnCont.addEventListener("click",handleDeleteClick.bind(ReedmakingController.removeReedmakingPricing));
	}
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