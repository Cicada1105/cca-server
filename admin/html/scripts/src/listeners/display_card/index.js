import { revertControlBtns } from './utils.js';

var confirmListenerRef;
function handleDeleteClick(event) {
	/* 
		Event pathing:
		path[0] === icon#; path[1] === icon#Cont; path[2] === divcontrolsCont
	*/
	// Get container of icon that was selected
	let selectedIconCont = event.path[1];
	// Store parent container of individual icon containers
	let ctrlsCont = event.path[2];
	// Store reference to message container for deleting confirmation
	let msgCont = ctrlsCont.firstElementChild;
	let iconConts = ctrlsCont.querySelectorAll("[class *= ctrlBtn]");
	// Store reference to container holding the icons
	let icon1Cont = iconConts[0];	// Edit icon containter
	let icon2Cont = iconConts[1];	// Delete icon containter
	// Store individual icons
	let icon1 = icon1Cont.firstElementChild;	// Edit icon
	let icon2 = icon2Cont.firstElementChild;	// Delete icon

	// Change edit icon to check for "confirm" 
	icon1.classList.replace("far","fas");
	icon1.classList.replace("fa-edit","fa-check-circle");
	// Change delete icon to X for "decline"
	icon2.classList.replace("far","fas");
	// Add respective listeners to confirming or declining user action of editing or deleting
	confirmListenerRef = confirmListener.bind(this);
	icon1.addEventListener("click", confirmListenerRef, { capture: false, once: true });
	icon2.addEventListener("click", declineListener, { capture: false, once: true });

	// Determ which button was selected
	let isEditBtn = selectedIconCont.className.includes("Edit");
	if (isEditBtn) {
		// Replace icon containers' class to match that of user selected option
		icon1Cont.classList.replace("ctrlBtnEdit","editBtnConfirm");
		icon2Cont.classList.replace("ctrlBtnDelete","editBtnDecline");
		// Display Confirm and Discard text before respective icons
		//   Create style rule for editConfirmBtn and editDeclineBtn
		let editConfirmRule = ".editBtnConfirm::before {position:absolute;content:'Save';font-size:1.1rem;top:5%;right:110%;}";
		let editDeclineRule = ".editBtnDecline::before {position:absolute;content:'Cancel';top:13%;right:110%}";
		document.styleSheets[6].insertRule(editConfirmRule);
		document.styleSheets[6].insertRule(editDeclineRule);
	}
	else {
		// Replace icon containers' class to match that of user selected option
		icon1Cont.classList.replace("ctrlBtnEdit","deleteBtnConfirm");
		icon2Cont.classList.replace("ctrlBtnDelete","deleteBtnDecline");
		// Set msg text to get confirmation from user
		msgCont.innerHTML = "Are you sure you want to delete?";
	}
}
function confirmListener(event) {
	// Prevent handleDeleteClick from being called when updated visual button is clicked again
	event.stopPropagation();

	// Store function, bounded by value of this, to be called when user confirms
	let fn = this;
	// path[0] === icon#; path[1] === icon#Cont; path[2] === div.controlsCont;
	let elCont = event.path[1];
	let ctrlsCont = event.path[2];
	let icons = ctrlsCont.getElementsByTagName("i");
	let icon2 = icons[1];	// Decline icon
	// Remove event listener of other button that didn't get pressed
	icon2.removeEventListener("click",declineListener, { capture: false });

	let wasEditBtn = elCont.className.includes("edit");
	if (wasEditBtn) {
		// Remove cssRule displayed for the edit confirmation buttons
		document.styleSheets[6].deleteRule(0);	// Remove editConfirmRule
		document.styleSheets[6].deleteRule(0);	// Remove editDeclineRul
	}
	else
		ctrlsCont.firstElementChild.innerHTML = "";	// Set delete message to empty
	
	fn(event);
	// Revert controls back to original state
	revertControlBtns(event);
}
function declineListener(event) {
	// Prevent handleDeleteClick from being called when updated visual button is clicked again
	event.stopPropagation();

	// path[0] === icon#; path[1] === icon#Cont; path[2] === div.controlsCont;
	let ctrlsCont = event.path[2];
	let icons = ctrlsCont.getElementsByTagName("i");
	let icon1 = icons[0];	// Confirm icon
	// Remove event listeners of other button that didn't get pressed
	icon1.removeEventListener("click",confirmListenerRef, { capture: false });
	// Remove text from message container
	let msgCont = ctrlsCont.firstElementChild;
	msgCont.innerHTML = "";
	// Revert controls back to original state
	revertControlBtns(event);
}
/*
	This function handles the ui for adding, 
	editing and deleting literature data
*/
function handleLiteratureCard(event) {

}
/*
	This function handles the ui for adding,
	editing and deleting rate date
*/
function handleRateCard(event) {

}
/*
	This function handles the ui for adding,
	editing and deleting genre data
*/
function handleGenre(event) {

}

export { handleDeleteClick, confirmListenerRef, declineListener }