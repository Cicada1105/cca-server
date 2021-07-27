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

export { addControlsFunctioanlity, addEditingRatesTableFunctionality }