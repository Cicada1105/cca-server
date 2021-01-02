import { addCardListener } from "./generic.js";
import { 
	fileSelect, addToList, 
	clearPastForm, clearPresentForm, clearFutureForm 
} from "./utils.js";

/*******************************/
/*   Add Past Card Listeners   */
/*******************************/
function addPastCardListener(event) {
	let addPastPerformance = this;
	// path[0] === add button; path[1] === div.headerCont
	let headerCont = event.path[1];
	let addCard = headerCont.nextElementSibling;
	/*Children of addCard*/
	let form = addCard.firstElementChild;
	// Get access to file input button
	let fileInputBtn = form.getElementsByClassName("fileCont")[0].firstElementChild;

	if (getComputedStyle(addCard).display === "none") {
		// Add event listener to file input
		fileInputBtn.addEventListener("change",fileSelect, { capture: false });
	}
	else {
		// Remove event listener for file input
		fileInputBtn.removeEventListener("change",fileSelect, { capture: false });
	}

	// Call generic listener, binding and passing proper arguments
	// Define value of 'this'
	let cardControlMethods = {
		submitMethod: addPastPerformance,
		clearMethod: clearPastForm.bind(form) // clearPastForm needs access to current form
	}
	// Bind cardControlMethods to value of 'this' for addCardListener and pass in event as only argument
	let cardListener = addCardListener.bind(cardControlMethods, event);	// First param = value of 'this', ...rest = arguments
	// Call bounded function
	cardListener();
}
/*********************************/
/*   Add Present Card Listener   */
/*********************************/
function addPresentCardListener(event) {
	let addSong = this;
	// path[0] === add button; path[1] === div.headerCont
	let headerCont = event.path[1];
	let addCard = headerCont.nextElementSibling;
	// Access form of addCard
	let form = addCard.firstElementChild;

	// Call generic listener, binding and passing proper arguments
	// Define value of 'this'
	let cardControlMethods = {
		submitMethod: addSong,
		clearMethod: clearPresentForm.bind(form) // clearPresentForm needs access to current form
	}
	// Bind cardControlMethods to value of 'this' for addCardListener and pass in event as only argument
	let cardListener = addCardListener.bind(cardControlMethods, event);	// First param = value of 'this', ...rest = arguments
	// Call bounded function
	cardListener();
}
function addFutureCardListener(event) {
	let addFuturePerformance = this;
	// path[0] === add button; path[1] === div.headerCont
	let headerCont = event.path[1];
	let addCard = headerCont.nextElementSibling;
	// Access form of addCard
	let form = addCard.firstElementChild;

	let instrumentsCont = document.getElementById("instrumentsCont");
	let addInstrumentBtn = instrumentsCont.querySelector("input[type='button']");

	if (getComputedStyle(addCard).display === "none") 
		// Add event listener to button
		addInstrumentBtn.addEventListener("click",addToList,{ capture: false })
	else
		// Remove event listener from button
		addInstrumentBtn.removeEventListener("click",addToList,{ capture: false })

	// Call generic listener, binding and passing proper arguments
	// Define value of 'this'
	let cardControlMethods = {
		submitMethod: addFuturePerformance,
		clearMethod: clearFutureForm.bind(form) // clearFutureForm needs access to current form
	}
	// Bind cardControlMethods to value of 'this' for addCardListener and pass in event as only argument
	let cardListener = addCardListener.bind(cardControlMethods, event);	// First param = value of 'this', ...rest = arguments
	// Call bounded function
	cardListener();
}

export { addPastCardListener, addPresentCardListener, addFutureCardListener }