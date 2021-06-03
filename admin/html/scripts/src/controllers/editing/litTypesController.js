// Controller for connecting literature type view with literature type model

// Require literature type model
import * as LiteratureType from "../../models/editing/litTypesModel.js";

// Require callback functions shared by all controllers
import { successCallback, failedCallback } from '../utils.js';
/*
	Future addLiteratureType documentation
*/
function addLiteratureType(event) {
	// Retrieve form for adding new literature type
	let controlsFooter = event.path[1];
	let articleInput = controlsFooter.previousElementSibling;
	let form = articleInput.firstElementChild;
	let elements = form.elements;

	// Retrieve genres and store in array
	let genres = [];
	let genresUL = document.getElementById("genres");
	let genreLIs = Array.from(genresUL.children);
	genreLIs.forEach(genre => genres.push(genre.textContent));

	/* Retrieve rates user inputs */
	// Retrieve tables containing rates
	let ratesSection = form.lastElementChild;
	let rateTablesCollection = ratesSection.getElementsByTagName("table");
	let rateTables = Array.from(rateTablesCollection);

	// Loop through tables, accessing and storing 
	let ratesObj = {};
	rateTables.forEach(table => {
		// Retrieve table caption to retrieve key value for rates object
		let tableCaption = table.firstElementChild;
		let tableHeader = tableCaption.firstElementChild;
		let rateObjKey = tableHeader.textContent.split(" ").join("_").toLowerCase();
		// Retrieve table boddy to obtain rates
		let tableBody = table.lastElementChild;
		let tableRows = Array.from(tableBody.getElementsByTagName("tr"));
		// Filter out the first row containing inputs
		let completedTableRows = tableRows.filter(row => !row.classList.contains("inputRates"));

		// Loop through "submitted" rates, retrieving proper data
		let rates = [];
		completedTableRows.forEach(tableRow => {
			let tableEls = tableRow.getElementsByTagName("td");
			let rate = {
				min: tableEls[0].textContent,
				max: tableEls[1].textContent,
				perHour: tableEls[3].textContent,
				perWord: tableEls[4].textContent
			}
			// Include flat rate if included
			getComputedStyle(tableEls[2]).display === "block" && (rate["flatRate"] = tableEls[2].textContent)

			// Push rate onto array of other rates
			rates.push(rate);
		});
		// Add rates to rates object
		ratesObj[rateObjKey] = rates;
	})

	// Form new literature type object from inputted values
	let newLitType = {
		type: elements["litType"].value,
		genres,
		rates: ratesObj
	}

	LiteratureType.add(newLitType).then(successCallback).catch(failedCallback);
}
/*
	Future updateLiteratureType documentation
*/
function updateLiteratureType(event) {
	// Get and store literature ID of current type being updated
	let litTypeID = event.target.dataset["id"];
	
	LiteratureType.edit(litTypeID).then(successCallback).catch(failedCallback);
}
/*
	Future removeLiteratureType documentation
*/
function removeLiteratureType(event) {
	// Get and store literature ID of current editing price
	let litTypeID = event.target.dataset["id"];

	LiteratureType.remove(litTypeID).then(successCallback).catch(failedCallback);
}

export { addLiteratureType, updateLiteratureType, removeLiteratureType }