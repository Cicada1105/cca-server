/*
	This file handles the listeners for specific pages
*/
import { addControlsFunctioanlity, addEditingRatesTableFunctionality } from './generic.js';
import { handleDeleteClickStyle } from "./display_card/";

/*   Performances Controllers   */
import * as PastController from "../controllers/performances/past/";
import * as PresentController from "../controllers/performances/currentMusicController.js";
import * as FutureController from "../controllers/performances/futureController.js";
import * as EditingController from "../controllers/editing/";
import * as ReedmakingController from "../controllers/reedmaking/";

import * as Build from "./build/";

/*
	addControlsFunctioanlity({
		displayCardsClass: "",
		addInfoMethod: () => {},
		editInfoMethod: () => {},
		deleteInfoMethod: () => {}
	})
	constructServiceControlsFunctioanlity({
	
	})
*/
const initPastPerformanceListeners = () => {
	addControlsFunctioanlity({
		addInfoMethod: Build.PastPerformance.bind(PastController.addPastPerformance),
		displayCardsClass: "pastCard",
		editInfoMethod: Build.PastPerformance.bind(PastController.updatePastPerformance),
		deleteInfoMethod: handleDeleteClickStyle.bind(PastController.removePastPerformance)
	});
}
const initAnecdoteListeners = () => {
	addControlsFunctioanlity({
		addInfoMethod: Build.PastAnecdote.bind(PastController.addAnecdote),
		displayCardsClass: "anecdoteCard",
		editInfoMethod: Build.PastAnecdote.bind(PastController.updateAnecdote),
		deleteInfoMethod: handleDeleteClickStyle.bind(PastController.removeAnecdote)
	});
}
const initCollaboratorListeners = () => {
	addControlsFunctioanlity({
		addInfoMethod: Build.PastCollaborator.bind(PastController.addCollaborator),
		displayCardsClass: "collaboratorCard",
		editInfoMethod: Build.PastCollaborator.bind(PastController.updateCollaborator),
		deleteInfoMethod: handleDeleteClickStyle.bind(PastController.removeCollaborator)
	});
}
const initMusicStandListeners = () => {
	addControlsFunctioanlity({
		addInfoMethod: Build.PresentPerformance.bind(PresentController.addSong),
		displayCardsClass: "presentCard",
		editInfoMethod: Build.PresentPerformance.bind(PresentController.updateSong),
		deleteInfoMethod: handleDeleteClickStyle.bind(PresentController.removeSong)
	});
}
const initFuturePerformancesListeners = () => {
	addControlsFunctioanlity({
		addInfoMethod: Build.FuturePerformance.bind(FutureController.addFuturePerformance),
		displayCardsClass: "futureCard",
		editInfoMethod: Build.FuturePerformance.bind(FutureController.updateFuturePerformance),
		deleteInfoMethod: handleDeleteClickStyle.bind(FutureController.removeFuturePerformance)
	});
}

function deleteRatesListener(event) {
	const row = event.path[2];
	const rowEls = row.getElementsByTagName("td");

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
	confirm(`Are you sure you want to remove the following rate: \n${formatText}`) && EditingController.removeRate(event)
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

	addBtn.addEventListener("click",Build.EditingAddLit.bind(EditingController.addLiteratureType));

	// Loop through literature cards, adding listeners to add, edit and delete buttons
	for (let i = 0; i < litCards.length; i++) {
		// Add listener to genres add button
		let genresCaption = genresTables[i].firstElementChild; // caption holding table title and add button
		let addGenreBtn = genresCaption.lastElementChild; 
		addGenreBtn.addEventListener("click",Build.SingleInput.bind(EditingController.addGenre));

		// Loop through genres, access edit and delete buttons
		let genresControls = genresTables[i].getElementsByClassName("controls");
		for (const genreControl of genresControls) {
			// Add listener to edit buttton
			let controls = genreControl.getElementsByTagName("i");
			// Retrieve genre to display in delete confirmation
			let genre = genreControl.previousElementSibling.textContent;
			// Edit button
			controls[0].addEventListener("click",Build.SingleInput.bind(EditingController.updateGenre));
			// Delete button
			controls[1].addEventListener("click",(event) => {confirm(`Are you sure you want to delete ${genre}?`) && EditingController.removeGenre(event)});
		}

		// Add rates listeners to standard proofreading editing rates table
		let stndrdProofRatesTable = ratesTables[0 + (3 * i)]
		const stndTableHasFlatRate = addEditingRatesTableFunctionality.call(stndrdProofRatesTable,{
			addRateMethod: Build.EditingRate.bind(EditingController.addRate), 
			editRateMethod: Build.EditingRate.bind(EditingController.updateRate), 
			deleteRateMethod: deleteRatesListener
		})

		// Add rates listeners to experimental editing rates table
		let devEditRatesTable = ratesTables[1 + (3 * i)];
		const expTableHasFlatRate = addEditingRatesTableFunctionality.call(devEditRatesTable,{
			addRateMethod: Build.EditingRate.bind(EditingController.addRate), 
			editRateMethod: Build.EditingRate.bind(EditingController.updateRate), 
			deleteRateMethod: deleteRatesListener
		})

		// Access Both rates table
		let bothEditingRatesTable = ratesTables[2 + (3 * i)];
		const bothTableHasFlatRate = addEditingRatesTableFunctionality.call(bothEditingRatesTable,{
			addRateMethod: Build.EditingRate.bind(EditingController.addRate), 
			editRateMethod: Build.EditingRate.bind(EditingController.updateRate), 
			deleteRateMethod: deleteRatesListener
		})

		// If any of the tables contain data that includes flat rate, make sure each one contains header
		if (stndTableHasFlatRate || expTableHasFlatRate || bothTableHasFlatRate) {
			stndrdProofRatesTable.getElementsByClassName("flatRate")[0].style.display = "block";
			devEditRatesTable.getElementsByClassName("flatRate")[0].style.display = "block";
			bothEditingRatesTable.getElementsByClassName("flatRate")[0].style.display = "block";
		}
	}
}

const initReedmakingListeners = () => {
	// Get access to add button
	let addReedCont = document.getElementById("addReedCont");
	let addReedBtn = addReedCont.lastElementChild;
	// Access display cards
	let reedmakingCards = document.getElementsByClassName("reedmakingCard");

	// Set click event listener for Add button of Reedmaking
	addReedBtn.addEventListener("click", Build.Reed.bind(ReedmakingController.addReed));
	// Loop through reedmaking cards, adding event listeners to edit and delete buttons
	for (let card of reedmakingCards) {
		// Access delete button for entire card
		let deleteBtn = card.getElementsByClassName("deleteReed")[0];
		deleteBtn.addEventListener("click",ReedmakingController.removeReed);
		// Access edit button for reed name
		let header = card.getElementsByClassName("nameHeaderCont")[0];
		let editBtn = header.lastElementChild;
		editBtn.addEventListener("click",Build.ReedName.bind(ReedmakingController.updateName));

		// Access edit button for reed description
		let reedDescrription = card.getElementsByClassName("descriptionHeader")[0];
		let editReedDescrBtn = reedDescrription.nextElementSibling;
		editReedDescrBtn.addEventListener("click",Build.ReedDescription.bind(ReedmakingController.updateDescription));

		// Access table containing rates
		let ratesTable = card.getElementsByClassName("displayRates")[0];

		// Access button for adding new rat
		let ratesTableCaption = ratesTable.firstElementChild;
		let addRateBtn = ratesTableCaption.lastElementChild;
		addRateBtn.addEventListener("click", Build.ReedRate.bind(ReedmakingController.addRate));

		// Retrieve and loop through rates, adding listeners accordingly
		let ratesTableBody = ratesTable.lastElementChild;
		let ratesRows = ratesTableBody.getElementsByTagName("tr");

		for (const ratesRow of ratesRows) {
			// Store and format data to clarify to admin
			let rowEls = ratesRow.getElementsByTagName("td");
			let formatText = "";

			formatText += ` - Quantity: ${rowEls[0].textContent}\n`;
			formatText += ` - Price: ${rowEls[1].textContent}`

			// Access controls
			let controls = ratesRow.getElementsByTagName("i");
			// Access element buttons
			let editRateBtn = controls[0];
			let deleteRateBtn = controls[1];

			// Add listeners
			editRateBtn.addEventListener("click", Build.ReedRate.bind(ReedmakingController.updateRate));
			deleteRateBtn.addEventListener("click", (event) => {confirm(`Are you sure you want to remove the following rate from ${header.firstElementChild.textContent}: \n${formatText}`) && ReedmakingController.removeRate(event)});
		}
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