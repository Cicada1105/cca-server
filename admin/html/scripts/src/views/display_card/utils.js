export function revertControlBtns(event) {
	let ctrlsCont = event.path[2];	// path[0] === icon#; path[1]  === icon#Cont; path[2] === div.controlsCont
	// Retrieve containers holding icons
	let iconConts = ctrlsCont.querySelectorAll("[class *= Btn]");
	// Store individual icon containers
	let icon1Cont = iconConts[0];	// Edit confirm container
	let icon2Cont = iconConts[1];	// Edit decline container
	// Store individual icons
	let icon1 = icon1Cont.firstElementChild;
	let icon2 = icon2Cont.firstElementChild;

	// Check if icons were used for confirming or declining editting changes
	let wasEditBtn = icon1Cont.className.includes("edit");
	let oldConfirmClass = (wasEditBtn ? "editBtnConfirm" : "deleteBtnConfirm");
	let oldDeclineClass = (wasEditBtn ? "editBtnDecline" : "deleteBtnDecline");
	icon1Cont.classList.replace(oldConfirmClass,"ctrlBtnEdit");
	icon2Cont.classList.replace(oldDeclineClass,"ctrlBtnDelete");

	// Revert "confirm" icon back to original state
	icon1.classList.replace("fas","far");
	icon1.classList.replace("fa-check-circle","fa-edit");
	// Revert X "decline" icon to original state
	icon2.classList.replace("fas","far");
}