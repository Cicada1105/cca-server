function setControlBtns(event) {
	let ctrlsCont = event.path[1];
	let icons = ctrlsCont.getElementsByTagName("i");
	let icon1 = icons[0];	// Edit icon
	let icon2 = icons[1];	// Delete icon
	// Change edit icon to check for "confirm" 
	icon1.classList.replace("far","fas");
	icon1.classList.replace("fa-edit","fa-check-circle");
	// Change delete icon to X for "decline"
	icon2.classList.replace("far","fas");
}
function revertControlBtns(event) {
	let ctrlsCont = event.path[1];
	let icons = ctrlsCont.getElementsByTagName("i");
	let icon1 = icons[0];	// Edit confirm
	let icon2 = icons[1];	// Edit decline
	// Revert "confirm" icon back to original state
	icon1.classList.replace("fas","far");
	icon1.classList.replace("fa-check-circle","fa-edit");
	// Revert X "decline" icon to original state
	icon2.classList.replace("fas","far");	
}

export { setControlBtns, revertControlBtns }