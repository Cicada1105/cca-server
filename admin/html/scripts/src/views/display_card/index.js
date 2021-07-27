import { revertControlBtns } from './utils.js';

var confirmListenerRef;
function confirmBtnStyleCleanup(event) {
	// Prevent handleGenericClick from being called when updated visual button is clicked again
	event.stopPropagation();

	// Store function, bounded by value of this, to be called when user confirms
	let fn = this;
	// path[0] === icon#; path[1] === icon#Cont; path[2] === div.controlsCont;
	let elCont = event.path[1];
	let ctrlsCont = event.path[2];
	let icons = ctrlsCont.getElementsByTagName("i");
	let icon2 = icons[1];	// Decline icon
	// Remove event listener of other button that didn't get pressed
	icon2.removeEventListener("click",declineBtnStyleCleanup, { capture: false });

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
function declineBtnStyleCleanup(event) {
	// Prevent handleGenericClick from being called when updated visual button is clicked again
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
function handleGenericClickStyle(confirmBtnCont, declineBtnCont) {
	// Store individual icons
	let confirmBtn = confirmBtnCont.firstElementChild;
	let declineBtn = declineBtnCont.firstElementChild;
	// Change edit icon to check for "confirm" 
	confirmBtn.classList.replace("far","fas");
	confirmBtn.classList.replace("fa-edit","fa-check-circle");
	// Change delete icon to X for "decline"
	declineBtn.classList.replace("far","fas");
	// Add respective listeners to confirming or declining user action of editing or deleting
	confirmListenerRef = confirmBtnStyleCleanup.bind(this);
	confirmBtn.addEventListener("click", confirmListenerRef, { capture: false, once: true });
	declineBtn.addEventListener("click", declineBtnStyleCleanup, { capture: false, once: true });
}
function handleAddEditClickStyle(event) {
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

	// Call generic handle click function
	handleGenericClickStyle.call(this,icon1Cont, icon2Cont);

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
function handleDeleteClickStyle(event) {
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

	// Call generic handle click function
	handleGenericClickStyle.call(this,icon1Cont, icon2Cont);
	
	// Replace icon containers' class to match that of user selected option
	icon1Cont.classList.replace("ctrlBtnEdit","deleteBtnConfirm");
	icon2Cont.classList.replace("ctrlBtnDelete","deleteBtnDecline");
	// Set msg text to get confirmation from user
	msgCont.innerHTML = "Are you sure you want to delete?";
}

export { handleDeleteClickStyle, handleAddEditClickStyle }