/*
	This file holds generic functions that add
	event listeners to the display cards of the
	current page
*/

function addControlsFunctioanlity({ addInfoMethod, displayCardsClass, editInfoMethod, deleteInfoMethod }) {
	// Access add buton
	let addBtn = document.getElementById("addBtn");
	// Set click event listeners for add button
	addBtn.addEventListener("click",addInfoMethod);

	// Access displayed cards
	let displayCards = document.getElementsByClassName(displayCardsClass);
	// Loop through display cards, adding event listeners to edit and delete buttons
	for (let card of displayCards) {
		// Get controls container 
		let controlsCont = card.lastElementChild;
		// Get access to edit and delete button containers
		let controlsConts = controlsCont.querySelectorAll("[class *= ctrlBtn]");
		// Access each individual container
		let editBtnCont = controlsConts[0];
		let deleteBtnCont = controlsConts[1];

		// Add listeners to control buttons containers
		editBtnCont.addEventListener("click",editInfoMethod);
		deleteBtnCont.addEventListener("click",deleteInfoMethod)
	}
}
function addEditingRatesTableFunctionality({ addRateMethod, editRateMethod, deleteRateMethod }) {
	const table = this;
	/*   Add button   */
	let tableCaption = table.firstElementChild;
	let addRateBtn = tableCaption.lastElementChild;
	addRateBtn.addEventListener("click",addRateMethod);
	/*   Edit/Delete buttons   */
	// Access rates
	let rates = table.lastElementChild.getElementsByTagName("tr");
	const HAS_RATES = rates.length > 0;
	if (HAS_RATES) {
		// Loop through rates, adding listeners to edit and delete buttons
		for (const rateRow of rates) {
			// Access controls
			let controls = rateRow.getElementsByTagName("i");
			// Edit button
			controls[0].addEventListener("click",editRateMethod);
			// Delete button
			controls[1].addEventListener("click",deleteRateMethod, { once: true });
		}	
	}

	// Return weather table includes flat rate 
	// (Determining whether to display flat rate on empty rates table or not)
	const hasFlatRate = HAS_RATES && (rates[0].getElementsByTagName("td").length === 6);
	return hasFlatRate;
}
function addReedmakingControlsFunctionality({ Reed, Rate }) {
	// Access display cards
	let reedmakingCards = document.getElementsByClassName("reedmakingCard");

	// Loop through reedmaking cards, adding event listeners to edit and delete buttons
	for (let card of reedmakingCards) {
		// Access delete button for entire card
		let deleteBtn = card.getElementsByClassName("deleteReed")[0];
		deleteBtn.addEventListener("click",Reed.remove);
		// Access edit button for reed name
		let header = card.getElementsByClassName("nameHeaderCont")[0];
		let editBtn = header.lastElementChild;
		editBtn.addEventListener("click",Reed.editName);

		// Access edit button for reed description
		let reedDescrription = card.getElementsByClassName("descriptionHeader")[0];
		let editReedDescrBtn = reedDescrription.nextElementSibling;
		editReedDescrBtn.addEventListener("click",Reed.editDescription);

		// Access table containing rates
		let ratesTable = card.getElementsByClassName("displayRates")[0];

		// Access button for adding new rat
		let ratesTableCaption = ratesTable.firstElementChild;
		let addRateBtn = ratesTableCaption.lastElementChild;
		addRateBtn.addEventListener("click", Rate.add);

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
			editRateBtn.addEventListener("click", Rate.edit);
			deleteRateBtn.addEventListener("click", (event) => {confirm(`Are you sure you want to remove the following rate from ${header.firstElementChild.textContent}: \n${formatText}`) && Rate.remove(event)});
		}
	}
}

export { addControlsFunctioanlity, addEditingRatesTableFunctionality, addReedmakingControlsFunctionality }