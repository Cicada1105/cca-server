/*
	This file is for constructing the basis of add/edit
	cards that can add additional functionality in their
	own implementation of the build card functions
*/

// Imports
import {
	applyPastCardListeners, applyCollaboratorCardListeners, applyAnecdoteCardListeners, 
	applyPresentCardListeners, applyFutureCardListeners, applySingleInpuutListeners,
	applyRateCardListeners, applyAddLiteratureTypeListeners, applyReedmakinglisteners
} from "./applyListeners.js";
import { 
	clearPastForm, clearAnecdoteForm, clearCollaboratorForm,
	clearPresentForm, clearFutureForm, clearSingleInputForm, 
	clearRatesInputForm, clearAddLitTypeInputForm, clearReedmakingForm
} from "./clearFunctions.js";
import { displayCardListener, displayEditingCardListener } from "../generic.js";

function buildPastCardListener(event) {
	let { submitMethod, displayData } = this;
	// Get input card 
	let inputCard = document.getElementById("addCard");
	// Access form for applying listeners and for clear method
	let form = document.getElementById("addForm");
	
	// If edit button was pressed, remove image border and placeholder
	if (event.target.classList.contains("fa-edit")) {
		let imgCont = form.querySelector("#imgCont");
		let icon = imgCont.firstElementChild;

		// Remove dashed border
		imgCont.style.border = "none";
		// Remove icon so image can be displayed
		icon.style.display = "none";
	}

	// Apply listeners to current card
	applyPastCardListeners(form);

	// Call generic listener, binding and passing proper arguments
	// Define value of 'this'
	let controlMethods = {
		submitMethod,
		clearMethod: () => clearPastForm(form) // clearPastForm needs access to current form
	}
	// Bind and call controlMethods to value of 'this' for displayCardListener and pass in event as only argument
	displayCardListener.call({
		controlMethods,
		displayEl: inputCard,
		displayData
	}, event); // First param = value of 'this', ...rest = arguments
}
function buildAnecdoteCardListener(event) {
	let { submitMethod, displayData } = this;
	// Get input card 
	let inputCard = document.getElementById("addCard");
	// Access form for applying listeners and for clear method
	let form = document.getElementById("addForm");

	// Apply listeners to current card
	applyAnecdoteCardListeners(form);

	// If edit button was pressed, remove image border and placeholder
	if (event.target.classList.contains("fa-edit")) {
		let imgCont = form.querySelector("#imgCont");
		let icon = imgCont.firstElementChild;

		// Remove dashed border
		imgCont.style.border = "none";
		// Remove icon so image can be displayed
		icon.style.display = "none";
	}

	// Call generic listener, binding and passing proper arguments
	// Define value of 'this'
	let controlMethods = {
		submitMethod,
		clearMethod: () => clearAnecdoteForm(form) // clearAnecdoteForm needs access to current form
	}
	// Bind and call controlMethods to value of 'this' for displayCardListener and pass in event as only argument
	displayCardListener.call({
		controlMethods,
		displayEl: inputCard,
		displayData
	}, event); // First param = value of 'this', ...rest = arguments
}
function buildCollaboratorCardListener(event) {
	let { submitMethod, displayData } = this;
	// Get input card 
	let inputCard = document.getElementById("addCard");
	// Access form for applying listeners and for clear method
	let form = document.getElementById("addForm");

	// Apply listeners to current card
	applyCollaboratorCardListeners(form);

	// If edit button was pressed, remove image border and placeholder
	if (event.target.classList.contains("fa-edit")) {
		let imgCont = form.querySelector("#imgCont");
		let icon = imgCont.firstElementChild;

		// Remove dashed border
		imgCont.style.border = "none";
		// Remove icon so image can be displayed
		icon.style.display = "none";
	}
	
	// Call generic listener, binding and passin proper arguments
	// Define value of 'this'
	let controlMethods = {
		submitMethod,
		clearMethod: () => clearCollaboratorForm(form) // clearCollaboratorForm needs access to current form
	}
	// Bind and call controlMethods to value of 'this' for displayCardListener and pass in event as only argument
	displayCardListener.call({
		controlMethods,
		displayEl: inputCard,
		displayData
	}, event); // First param = value of 'this', ...rest = arguments
}
function buildPresentCardListener(event) {
	let { submitMethod, displayData } = this;
	// Get input card 
	let inputCard = document.getElementById("addCard");
	// Access form for applying listeners and for clear method
	let form = document.getElementById("addForm");

	// Apply listeners to current card
	applyPresentCardListeners(form);

	// Call generic listener, binding and passing proper arguments
	// Define value of 'this'
	let controlMethods = {
		submitMethod,
		clearMethod: () => clearPresentForm(form) // clearPresentForm needs access to current form
	}

	// Bind and call controlMethods to value of 'this' for displayCardListener and pass in event as only argument
	displayCardListener.call({
		controlMethods,
		displayEl: inputCard,
		displayData
	}, event);// First param = value of 'this', ...rest = arguments
}
function buildFutureCardListener(event) {
	let { submitMethod, displayData } = this;
	// Get input card 
	let inputCard = document.getElementById("addCard");
	// Access form for applying listeners and for clear method
	let form = document.getElementById("addForm");

	// Apply listeners to current card
	applyFutureCardListeners(form);

	// Call generic listener, binding and passing proper arguments
	// Define value of 'this'
	let controlMethods = {
		submitMethod,
		clearMethod: () => clearFutureForm(form) // clearFutureForm needs access to current form
	}

	// Bind and call controlMethods to value of 'this' for displayCardListener and pass in event as only argument
	displayCardListener.call({
		controlMethods,
		displayEl: inputCard,
		displayData
	}, event); // First param = value of 'this', ...rest = arguments
}
function buildEditingAddLitCardListener(event) {
	let { submitMethod, ...rest } = this;
	let displayEl = document.getElementById("addLitTypeInputCard");

	// Apply listeners to current card
	applyAddLiteratureTypeListeners(displayEl);
	// Call generic listener, bind and passin proper arguments
	let controlMethods = { 
		submitMethod,
		clearMethod: () => clearAddLitTypeInputForm(displayEl)
	};

	displayEditingCardListener.call({
		controlMethods,
		displayEl,
		...rest
	}, event); // First param = value of 'this', ...rest = arguments
}
function buildSingleInputListener(event) {
	let { submitMethod, ...rest } = this;
	let displayEl = document.getElementById("singleInputCard");

	// Apply listeners to current card
	applySingleInpuutListeners(displayEl);

	// Call generic listener, binding and passing proper arguments
	let controlMethods = {
		submitMethod,
		clearMethod: () => clearSingleInputForm(displayEl) // clearSingleInputForm needs access to current element
	}

	displayEditingCardListener.call({
		controlMethods,
		displayEl,
		...rest
	},event); // First param = value of 'this', ...rest = arguments
}
function buildEditingRateCardListener(event) {
	let { submitMethod, ...rest } = this;
	let displayEl = document.getElementById("rateInputCard");

	// Apply listeners to current card
	applyRateCardListeners(displayEl);

	// Call generic listener, binding and passing proper arguments
	let controlMethods = {
		submitMethod,
		clearMethod: () => clearRatesInputForm(displayEl) // clearRatesInputForm needs access to current element
	}

	displayEditingCardListener.call({
		controlMethods,
		displayEl,
		...rest
	},event); // First param = value of 'this', ...rest = arguments
}
function buildReedmakingCardListener(event) {
	let { submitMethod, displayData } = this;
	// Get input card 
	let inputCard = document.getElementById("addCard");
	// Access form for applying listeners and for clear method
	let form = document.getElementById("addForm");

	// Apply listeners to current card
	applyReedmakinglisteners(form);

	// Call generic listener, binding and passing proper arguments
	// Define value of 'this'
	let controlMethods = {
		submitMethod,
		clearMethod: () => clearReedmakingForm(form) // clearReedmakingForm needs access to current form
	}
	// Bind and call controlMethods to value of 'this' for displayCardListener and pass in event as only argument
	displayCardListener.call({
		controlMethods,
		displayEl: inputCard,
		displayData
	}, event); // First param = value of 'this', ...rest = arguments
}

export { 
	buildPastCardListener, buildAnecdoteCardListener, buildCollaboratorCardListener,
	buildPresentCardListener, buildFutureCardListener, buildEditingAddLitCardListener,
	buildSingleInputListener, buildEditingRateCardListener, buildReedmakingCardListener
}