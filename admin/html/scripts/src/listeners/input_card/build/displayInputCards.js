/*
	This file contains methods that can be applied to all add/edit cards
*/

/*************************************/
/*   Add/Edit Card Generic Listener  */
/*************************************/
function handleControlListeners(displayEl) {
	let controlMethods = this;

	// Get cotainer holding the confirm and cancel buttons
	let controlsCont = displayEl.lastElementChild;
	// Access individual tags
	let icons = controlsCont.getElementsByTagName("i");
	// If icon has ID (added as ID for editting), store and add to new icon
	let id = undefined;
	icons[0].hasAttribute("data-id") && (id = icons[0].dataset["id"]);
	// Remove icons to remove previous event listeners
	icons[0].remove();
	icons[0].remove();
	// Add butons back to respective continers
	let addBtnCont = document.getElementById("ctrlBtnAdd");
	let clearBtnCont = document.getElementById("ctrlBtnClear");
	// Create icons and add respective classes
	let addIcon = document.createElement("i");
	addIcon.classList.add("fas","fa-check-circle");
	let clearIcon = document.createElement("i");
	clearIcon.classList.add("fas","fa-times-circle");
	// Add icons to their respective containers
	addBtnCont.appendChild(addIcon);
	clearBtnCont.appendChild(clearIcon);

	let icon1 = icons[0];
	let icon2 = icons[1];

	// Re-add ID if not undefined
	id && icon1.setAttribute("data-id",id);
	if (getComputedStyle(displayEl).display === "block") {
		// Add event listeners to icons
		icon1.addEventListener("click",controlMethods.submitMethod, { capture: false, once:true });
		icon2.addEventListener("click",controlMethods.clearMethod, { capture: false, once:true });
	}
}
function displayInputCard(event) {
	// displayData is a map containing the 
	const { displayEl, displayData, controlMethods } = this;

	// Store target info
	let targetEl = event.target;
	// Set header according to which button was pressed
	let cardFunction = targetEl.classList.contains("fa-edit") ? "Edit" : "Add";
	displayEl.getElementsByClassName("cardFunction")[0].textContent = cardFunction;
	
	// If displayData is not undefined, display data to be edited, else clear any previous data
	if (displayData) {
		// Get access to form to display edit data
		const form = document.getElementById("addForm");
		const elements = form.elements;
		// Loop through displayData Map, accessing corresponding input field with mapped item
		displayData.forEach((val,key) => elements[key].value = val);

		const id = targetEl.dataset["id"];
		// Get access to edit button control and add unique ID
		const editBtnConfirm = document.getElementById("ctrlBtnAdd");
		const editBtnConfirmIcon = editBtnConfirm.firstElementChild;
		editBtnConfirm.firstElementChild.setAttribute("data-id",targetEl.dataset["id"]);

		// Scroll to top for user to view edit data
		window.scrollTo({top:0,behavior:"smooth"});
	}
	else {
		// Clear card of any previous data
		let clearBtnCont = document.getElementById("ctrlBtnClear");
		let icon = clearBtnCont.firstElementChild;
		// Create new click event to imitate user click
		let clickEvent = new MouseEvent("click");
		icon.dispatchEvent(clickEvent);
		// Remove data-id attribute from if edit button was clicked previously
		const editBtnConfirm = document.getElementById("ctrlBtnAdd");
		editBtnConfirm.firstElementChild.removeAttribute("data-id");
	}

	// Toggle display data only if add button is pressed again
	displayEl.style.display = (displayEl.style.display === "block") && (cardFunction.localeCompare("Add") === 0) ? "none" : "block";

	// Handle button controls
	handleControlListeners.call(controlMethods,displayEl);
}
function genericServiceInputCardListener(event) {
	const data = this;

	const submitMethod = data.controlMethods["submitMethod"];
	const clearMethod = data.controlMethods["clearMethod"];
	const displayEl = data["displayEl"];

	// Access control buttons container
	let controlsCont = displayEl.getElementsByClassName("confirmDeclineBtns")[0];
	let cancelBtn = controlsCont.firstElementChild;
	let confirmBtn = controlsCont.lastElementChild;

	/*   
		Header:
			${cardFunction} ${cardType} ${dataType}   
	*/
	/* Card function */
	let cardFunction = event.target.classList.contains("fa-edit") ? "Edit" : "Add";
	displayEl.getElementsByClassName("cardFunction")[0].textContent = cardFunction;
	/* Card type */
	// Use optional chaining to store items that could possibly be omitted
	const cardType = data.titleData?.cardType || "";
	cardType && (displayEl.getElementsByClassName("cardType")[0].textContent = cardType);
	/* Data type */
	// Retrieve items that are required in each generic editing input card listener
	const dataType = data.titleData["dataType"];
	displayEl.getElementsByClassName("dataType")[0].textContent = dataType;

	/*
		Footer:
			Add listeners
			Set confirm button to value of card function
			Add attributes to confirm button that uniquely ID current data
	*/
	cancelBtn.addEventListener("click", clearMethod, { capture: false, once: true });
	confirmBtn.addEventListener("click",submitMethod, { capture: false })
	confirmBtn.value = cardFunction;

	const dataID = event.target.dataset["id"] || "";
	dataID && confirmBtn.setAttribute("data-id",dataID);

	if (data.idData) {
		confirmBtn.setAttribute("data-cardid", data.idData.cardID);
		// If a rate is being edited, the editing type is needed for unique identification
		const editingType = data.idData.editingType || "";
		editingType && confirmBtn.setAttribute("data-editingtype",editingType);
	}
}
// Generic body listener
function displayServiceInputCard(event) {
	const { displayEl, displayData } = this;
	const layOver = document.getElementById("backDropCont");
	// If displayData is not undefined, contains edit data to be displayed
	if (displayData) {
		// Store display data to possibly be updated
		//let data = displayData.concat();
		// Get access to form element
		let articleInput = displayEl.getElementsByClassName("input")[0];
		let formEl =  articleInput.firstElementChild;
		// Get access to all inputs to then pre-fill fields
		let elements = formEl.elements;
		// If data has flatRate, display flat rate input
		if (displayData.has("flatRate"))
			// Display flat rate row
			elements["flatRate"].parentElement.style.display = "block";
		else if (displayData.has("min")) // Only runs if displaydata does not have flat rate but is part of the editing rate
			// Remove flat rate row
			elements["flatRate"].parentElement.style.display = "none";

		// Loop through displayData Map, accessing corresponding input field with mapped item
		displayData.forEach((val,key) => elements[key].value = val);
	}
	// Display background layover and form element
	layOver.style.display = "block";
	displayEl.style.display =  "block";
	// Prevent document scrolling to limit it to visible card
	document.body.style.overflowY = "hidden";

	// Bind data and displayed element to generic card listener and call, passing in event
	genericServiceInputCardListener.call({ ...this, displayEl },event);	// call([value of this],...args);
}

export { displayInputCard, displayServiceInputCard }