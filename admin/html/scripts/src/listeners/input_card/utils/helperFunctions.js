/*
	This file contains miscellaneous functions to extract
	logic from the input cards to help make the code 
	cleaner and easier to understand
*/

/**************************************/
/*   Add/Edit past performance card   */
/**************************************/
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
		// Display dashed border
		imgCont.style.border = "2px dashed black";
		// Display image icon
		icon.style.display = "block";
	}
}
/****************************************/
/*   Add/Edit future performance card   */
/****************************************/
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
/********************************/
/*   Add literature type card   */
/********************************/
function addGenreToList(event) {
	let genreInput = event.target.previousElementSibling;
	let genreTableBody = event.path[3];

	// Create genre item based on user input, then add to table
	let genreRow = createGenreRow(genreInput);
	genreTableBody.appendChild(genreRow);
	// Clear user input
	genreInput.value = "";
}
function createGenreRow(genre) {
	// Create a new row to hold new table data
	let row = document.createElement("tr");
	// Create a new table data element to hold the gennre and delete icon
	let td = document.createElement("td");
	// Create text node to hold actual genre text
	let genreTxtNode = document.createTextNode(genre);
	// Create delete icon
	let iEl = document.createElement("i");
	// Set classes for 'i' element
	iEl.setAttribute("class","fas fa-times");

	// Add event listener to delete icon to remove row if desired
	iEl.addEventListener("click",(event) => {
		// Retrieve row and remove
		let row = event[2];
		row.remove();
	},{once:true});

	// Append genre text and icon to table data element
	td.appendChild(genreTxtNode);
	td.appendChild(iEl);
	// Append table data element to row and return
	row.appendChild(td);

	return row;
}
function addRateToList(event) {
	let rateInputRow = event.path[2];
	let rateTableBody = event.path[3];

	// Get values from inputs
	let inputs = Array.from(rateInputRow.getElementsByTagName("input"));
	// Create a new row based on inputted data and add to table
	let rateRow = createRateRow(inputs);
	rateTableBody.appendChild(rateRow);
	// Clear inputs
	inputs.forEach(input => input.value = "");
}
function createRateRow(rateInputs) {
	// Create a new row to hold the table data
	let row = document.createElement("tr");
	// Loop through input values, creating table data elements and adding values to them
	rateInputs.forEach(input => {
		let td = document.createElement("td");
		let txtNode = document.createTextNode(input);
		// Append text node containing user inputted value to table data element
		td.appendChild(txtNode);
		// Append table data element to row
		row.appendChild(td);
	});

	// Return row
	return row;
}

export { fileSelect, addToList, createListItem, addGenreToList, addRateToList }