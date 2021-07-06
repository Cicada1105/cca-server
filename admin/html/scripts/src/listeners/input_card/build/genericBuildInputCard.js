/*
	This file contains functions to build generic input cards
*/
import { displayInputCard, displayServiceInputCard } from "./displayInputCards.js";

function buildGenericInputCard({ applyListenersFunc, clearMethod }, event) {
	let { submitMethod, displayData } = this;

	// Retrieve non-services add input card section
	let inputCard = document.getElementById("addCard");
	// Retrieve input card form for non-services
	let form = document.getElementById("addForm");

	// Apply listeners to input card by calling passed in listeners function, using input card as single argument
	applyListenersFunc(form);

	// Define control methods object containing submit method from 'this' object and clear method parameter object field
	let controlMethods = {
		submitMethod,
		clearMethod
	}
	
	controlMethods["clearMethod"] = controlMethods.clearMethod(form);

	displayInputCard.call({
		controlMethods,
		displayEl: inputCard,
		displayData
	}, event); // First param = value of 'this', ...rest = arguments
}
function buildGenericServiceInputCard({ inputCardID, applyListenersFunc = "", clearMethod }, event) {
	let { submitMethod, ...rest } = this;

	let inputCard = document.getElementById(inputCardID);
	let callBack;
	applyListenersFunc && (callBack = applyListenersFunc(inputCard));

	// If rate card is to be displayed, add/remove flat rate input based on number of rows
	if (inputCardID === "rateInputCard") {
		// Access flat rate input row to handle display
		let inputArticle = inputCard.getElementsByClassName("input")[0];
		let form = inputArticle.firstElementChild;
		let flatRateInputRow = form.getElementsByClassName("inputRow")[2];

		// Access table rows based on button pressed
		let table;
		let btn = event.target;
		if (btn.classList.contains("fa-plus-square"))
			table = event.path[2];
		else if (btn.classList.contains("fa-edit"))
			table = event.path[4];

		let thead = table.getElementsByTagName("thead")[0];
		let tdsCollection = thead.getElementsByTagName("td");
		let tdsArray = Array.from(tdsCollection);
		let flatRateIndex = tdsArray.findIndex(td => td.textContent === "Flat Rate");

		if (flatRateIndex === -1)
			flatRateInputRow.style.display = "none";
		else
			flatRateInputRow.style.display = "block";
	}

	// Clear method will 
	let controlMethods = {
		submitMethod,
		clearMethod: () => {
			callBack && callBack();
			clearMethod(inputCard);
		}
	}

	displayServiceInputCard.call({
		controlMethods,
		displayEl: inputCard,
		...rest
	}, event); // First param = value of 'this', ...rest = arguments
}

export { buildGenericInputCard, buildGenericServiceInputCard }