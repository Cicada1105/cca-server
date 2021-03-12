/*
	This file contains methods used by specific, individual add cards
*/

/*********************************/
/*   Add past performance card   */
/*********************************/
// Function for displaying image file selected by user
function fileSelect(event) {
	// Get access to form from path to get reference to image
	let form = event.path[2];
	let imgCont = form.querySelector("#imgCont");
	let icon = imgCont.firstElementChild;
	let img = imgCont.lastElementChild;
	// Get user inputted image and convert to a usable img src
	let fileInput = event.path[0];

	if (fileInput.files[0]) {
		let file = fileInput.files[0];
		// Store file name to be used as alt
		let fileAlt = file.name;
		// Convert file to usable src
		let fileSrc = URL.createObjectURL(file);

		// Set src and alt for image
		img.src = fileSrc;
		img.alt = fileAlt;
		// Remove dashed border
		imgCont.style.border = "none";
		// Remove icon so image can be displayed
		icon.style.display = "none";
	}
	else {
		// Remove possible image that has been displayed
		img.src = "";
		img.alt = "";
		// Display dotted border
		imgCont.style.border = "2px dotted black";
		// Display image icon
		icon.style.display = "block";
	}
}
/***********************************/
/*   Add future performance card   */
/**********************************/
/*Function for handling adding to instrument list for add future performance card*/
function addToList(event) {
	let instrumentsCont = event.path[1];

	// Get reference to user input tag
	let instrumentsInput = instrumentsCont.firstElementChild;
	// Retrieve user inputted text
	let item = instrumentsInput.value;
	// get referece to ul container
	let ulEl = instrumentsCont.lastElementChild;

	ulEl.appendChild(createListItem(item));
}
function createListItem(item) {
	let li = document.createElement("li");

	let liTextNode = document.createTextNode(item);
	// Create 'i' element to display "x" for deleting individual instruments
	let iEl = document.createElement("i");
	// Set classes for 'i' element
	iEl.setAttribute("class","fas fa-times");

	// Add event listener to 'x' to remove list item
	iEl.addEventListener("click",(event) => {
		// Retrieve li and remove
		let li = event.path[1];
		li.remove();
	},{once:true});

	li.appendChild(liTextNode);
	li.appendChild(iEl);

	return li;
}
/**************************/
/*   Clear form methods   */
/**************************/
function clearPastForm() {
	const form = this;
	// Reset image attributes 
	let imgCont = form.querySelector("#imgCont");
	let icon = imgCont.firstElementChild;
	let img = imgCont.lastElementChild;
	img.src = "";
	img.alt = "";
	// Set border of image container and icon
	imgCont.style.border = "2px dotted black";
	icon.style.display = "block";

	// Clear items in instrument list
	let instrumentsCont = form.querySelector("#instrumentsCont");
	let instrumentsUL = instrumentsCont.lastElementChild;
	let instruments = instrumentsUL.childNodes;
	let numInstruments = instrumentsUL.childElementCount;

	for (let i = 0; i < numInstruments; i++) {
		console.log(instruments[0]);
		instruments[0].remove();
	}
	// Clear form
	form.reset();
}
function clearCollaboratorForm() {
	const form = this;

	// Clear form
	form.reset();
}
function clearPresentForm() {
	const form = this;

	// Clear form
	form.reset();
}
function clearFutureForm() {
	const form = this;

	// Clear items in instrument list
	let instrumentsCont = form.querySelector("#instrumentsCont");
	let instrumentsUL = instrumentsCont.lastElementChild;
	let instruments = instrumentsUL.childNodes;
	let numInstruments = instrumentsUL.childElementCount;

	for (let i = 0; i < numInstruments; i++) {
		console.log(instruments[0]);
		instruments[0].remove();
	}

	// Clear form
	form.reset();
}

export { 
	fileSelect, addToList,
	clearPastForm, clearCollaboratorForm, 
	clearPresentForm, clearFutureForm
}