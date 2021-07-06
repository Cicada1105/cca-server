/*
	File for handling individual listeners that are
	needed for both add and edit cards
*/

// Util imports
import { fileSelect, addToList, addGenreToList, addRateToList } from "../utils/helperFunctions.js";

/*********************************/
/*   Apply Past Card Listeners   */
/*********************************/
function applyPastCardListeners(addForm) {
	// Get access to file input button
	let fileInputBtn = addForm.getElementsByClassName("fileCont")[0].firstElementChild;

	let instrumentsCont = document.getElementById("instrumentsCont");
	let addInstrumentBtn = instrumentsCont.querySelector("input[type='button']");

	if (getComputedStyle(addForm).display === "block") {
		console.log(fileInputBtn);
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
	let instrumentsCont = document.getElementById("instrumentsCont");
	let addInstrumentBtn = instrumentsCont.querySelector("input[type='button']");

	if (getComputedStyle(addForm).display === "block") {
		// Add event listener to button
		addInstrumentBtn.addEventListener("click",addToList,{ capture: false })
	}
	else
		// Remove event listener from button
		addInstrumentBtn.removeEventListener("click",addToList,{ capture: false })
}
/********************/
/*   Editing page   */
/********************/
function applySingleInputListeners(inputCard) {
	// Access form of inputCard
	let form = inputCard.firstElementChild;

	// Apply any listeners specific to collaborators cardd	
}
function applyRateCardListeners(inputCard) {
	// Retrieve card function. If add, flat rate togg
	let article = inputCard.getElementsByClassName("input")[0];
	// Access form of inputCard
	let form = article.firstElementChild;

	/*// Add event listener to checkbox
	let checkbox = form.querySelector("input[type='checkbox']");
	let flatRateRow = form.getElementsByClassName("inputRow")[2];
	const checkFunction = function() { 
		flatRateRow.style.display = checkbox.checked ? "block" : "none";
	};

	checkbox.addEventListener("change",checkFunction);

	// Return function that is "cleanup" for when cancel button is pressed
	return () => checkbox.removeEventListener("change",checkFunction);*/
}
function applyAddLitTypeListeners(addCard) {
	// Access form of addCard
	let article = addCard.getElementsByClassName("input")[0];
	let form = article.firstElementChild;

	// Apply add genre listener
	let genreInputRow = document.getElementById("genresCont");
	let addGenreBtn = genreInputRow.getElementsByClassName("addIcon")[0];
	addGenreBtn.addEventListener("click",addGenreToList);

	/* Apply Rates listeners */
	// "global" variables used for rates lsiteners
	let ratesSection = form.getElementsByClassName("rates")[0];
	const rateTablesCssSelector = "table[class $= 'RatesInputTable']";
	const flatRateColsCssSelector = "td:nth-of-type(3)";

	// Retrieve include flat rate checkbox input and add event listener
	let checkBox = ratesSection.querySelector("input[type = 'checkbox']");
	// Access flat rate columns to toggle when checkbox is toggled
	let flatRateCols = ratesSection.querySelectorAll(flatRateColsCssSelector);
	// Define css rule to be add/removed when checkbox is toggled
	const colStyle = `${rateTablesCssSelector} ${flatRateColsCssSelector} { display:block; }`;
	// Toggle flaat rate column visibility
	let checkBoxCallback = () => {
		const COL_DISPLAY = checkBox.checked ? "block" : "none"
		flatRateCols.forEach(colItem => colItem.style.display = COL_DISPLAY);
		// Insert styling if checkox is checked for future added rows
		const documentStyleSheets = document.styleSheets;
		const localStyleSheet = documentStyleSheets[documentStyleSheets.length - 1];
		const localStyleSheetLen = localStyleSheet.cssRules.length;
		checkBox.checked ? localStyleSheet.insertRule(colStyle,localStyleSheetLen) : localStyleSheet.removeRule(localStyleSheetLen - 1);
	}
	checkBox.addEventListener("change",checkBoxCallback);

	// Retrieve all table rates
	let ratesTablesNodes = form.querySelectorAll(rateTablesCssSelector);
	let ratesTable = Array.from(ratesTablesNodes);

	// Create a map to contain "cleanup" functions for removing listeners
	let cleanupFunctions = new Map();
	// Loop through tables, applying proper listeners
	ratesTable.forEach(table => {
		// Apply listeners for adding and deleting rates
		let ratesTableBody = table.lastElementChild;
		let ratesInputRow = ratesTableBody.firstElementChild;
		let addBtnTD = ratesInputRow.lastElementChild;
		let addRateBtn = addBtnTD.firstElementChild;
		addRateBtn.addEventListener("click",addRateToList, { capture: false });

		// Apply toggle listener to flat rate checkbox
		let ratesTableCaption = table.firstElementChild;
		let ratesCaptionHeader = ratesTableCaption.firstElementChild

		// Add to map a cleanup function for removing listeners
		cleanupFunctions.set(`${ratesCaptionHeader.textContent} rate`,() => addRateBtn.removeEventListener("click",addRateToList, { capture: false }));
	})

	// Return function that is "cleanup" for when cancel button is pressed
	return () => {
		addGenreBtn.removeEventListener("click",addGenreToList);
		checkBox.removeEventListener("change",checkBoxCallback);
		cleanupFunctions.forEach(func => func());
	}
}
/***********************/
/*   Reedmaking Page   */
/***********************/
function applyAddReedListeners(addCard) {

}

export {
	applyPastCardListeners, applyCollaboratorCardListeners, applyAnecdoteCardListeners, 
	applyPresentCardListeners, applyFutureCardListeners, applySingleInputListeners,
	applyRateCardListeners, applyAddLitTypeListeners, applyAddReedListeners
}