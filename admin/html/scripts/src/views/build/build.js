/*
	This file is for constructing the basis of add/edit
	cards that can add additional functionality in their
	own implementation of the build card functions
*/

// Imports
import * as Clear from "./utils/clearFunctions.js";
import * as Listeners from "./utils/applyListeners.js";
import * as DataPrep from "./prepare_cards/";
import { 
	constructGenericInputCardData as constructInputCardData, 
	constructGenericServiceInputCardData as constructServiceInputCardData
} from "./constructInputCard.js";

/*
	GENERIC BUILD CARD

	- Define value of 'this' for constructInputCard function (accepts display data and/or submit method)
		- (Optional) Function for applying listeners specific to input card
		- DataPrep retrieves ID and display data, and makes changes to input card exclusive to build function card

	- Pass control methods object as first argument. Contains:
		- Submit method for add/edit card that is stored in build card function's 'this'
		- Clear method
	- Pass event as second argument
*/
function buildPastCard(event) {
	constructInputCardData.call({
		applyListenersFunc: Listeners.applyPastCardListeners,
		...DataPrep.PastPerformance(event)
	},{
		submitMethod: this,
		clearMethod: (form) => () => Clear.clearPastForm(form)
	}, event);
}
function buildAnecdoteCard(event) {
	constructInputCardData.call({
		applyListenersFunc: Listeners.applyAnecdoteCardListeners,
		...DataPrep.PastAnecdote(event)
	},{
		submitMethod: this,
		clearMethod: (form) => () => Clear.clearAnecdoteForm(form)
	}, event);
}
function buildCollaboratorCard(event) {
	constructInputCardData.call({
		applyListenersFunc: Listeners.applyCollaboratorCardListeners,
		...DataPrep.PastCollaborator(event)
	},{
		submitMethod: this,
		clearMethod: (form) => () => Clear.clearCollaboratorForm(form)
	}, event);
}
function buildPresentCard(event) {
	constructInputCardData.call({
		applyListenersFunc: Listeners.applyPresentCardListeners,
		...DataPrep.PresentPerformance(event)
	},{
		submitMethod: this,
		clearMethod: (form) => () => Clear.clearPresentForm(form)
	}, event);
}
function buildFutureCard(event) {
	constructInputCardData.call({
		applyListenersFunc: Listeners.applyFutureCardListeners,
		...DataPrep.FuturePerformance(event)
	},{
		submitMethod: this,
		clearMethod: (form) => () => Clear.clearFutureForm(form)
	}, event);
}
function buildEditingAddLitCard(event) {
	constructServiceInputCardData.call({
		applyListenersFunc: Listeners.applyAddLitTypeListeners,
		...DataPrep.EditingLitType(event)
	},{
		inputCardID: "addLitTypeInputCard",
		submitMethod: this,
		clearMethod: Clear.clearAddLitTypeInputForm
	}, event);
}
function buildSingleInputCard(event) {
	constructServiceInputCardData.call({
		applyListenersFunc: Listeners.applySingleInputListeners,
		...DataPrep.EditingGenre(event)
	},{
		inputCardID: "singleInputCard",
		submitMethod: this,
		clearMethod: Clear.clearSingleInputForm
	}, event);
}
function buildEditingRateCard(event) {
	/*vvvvvvvvvvvvvvvvvvvvvvvvvv*/
	/*   Relocate/Reconfigure   */
	/*vvvvvvvvvvvvvvvvvvvvvvvvvv*/
	const inputCard = document.getElementById("rateInputCard");
	// Access flat rate input row to handle display
	let inputArticle = inputCard.getElementsByClassName("input")[0];
	let form = inputArticle.firstElementChild;
	let flatRateInputRow = form.getElementsByClassName("inputRow")[2];

	let path = event.composedPath();
	// Access table rows based on button pressed
	let table;
	let btn = event.target;
	if (btn.classList.contains("fa-plus-square"))
		table = path[2];
	else if (btn.classList.contains("fa-edit"))
		table = path[4];

	let thead = table.getElementsByTagName("thead")[0];
	let tdsCollection = thead.getElementsByTagName("td");
	let tdsArray = Array.from(tdsCollection);
	let flatRateIndex = tdsArray.findIndex(td => td.textContent === "Flat Rate");

	if (flatRateIndex === -1)
		flatRateInputRow.style.display = "none";
	else
		flatRateInputRow.style.display = "block";
	/*^^^^^^^^^^^^^^^^^^^^^^^^^^*/
	/*   Relocate/Reconfigure   */
	/*^^^^^^^^^^^^^^^^^^^^^^^^^^*/

	constructServiceInputCardData.call({
		applyListenersFunc: Listeners.applyRateCardListeners,
		...DataPrep.EditingRate(event)
	},{
		inputCardID: "rateInputCard",
		submitMethod: this,
		clearMethod: Clear.clearRatesInputForm
	}, event);
}
function buildReedCard(event) {
	constructServiceInputCardData.call({
		applyListenersFunc: Listeners.applyAddReedListeners,
		...DataPrep.Reed(event)
	},{
		inputCardID: "reedInputCard",
		submitMethod: this,
		clearMethod: Clear.clearAddReedInputForm
	}, event);
}
function buildReedNameCard(event) {
	constructServiceInputCardData.call({
		...DataPrep.ReedName(event)
	},{
		inputCardID: "nameInputCard",
		submitMethod: this,
		clearMethod: Clear.clearReedmNameForm
	}, event);
}
function buildReedDescriptionCard(event) {
	constructServiceInputCardData.call({
		...DataPrep.ReedDescription(event)
	},{
		inputCardID: "descriptionInputCard",
		submitMethod: this,
		clearMethod: Clear.clearReedDescriptionForm
	}, event);
}
function buildReedRateCard(event) {
	constructServiceInputCardData.call({
		...DataPrep.ReedRate(event)
	},{
		inputCardID: "rateInputCard",
		submitMethod: this,
		clearMethod: Clear.clearReedRatesForm
	}, event);
}

export { 
	buildPastCard, buildAnecdoteCard, buildCollaboratorCard,
	buildPresentCard, buildFutureCard, buildEditingAddLitCard,
	buildSingleInputCard, buildEditingRateCard, buildReedCard,
	buildReedNameCard, buildReedDescriptionCard, buildReedRateCard
}