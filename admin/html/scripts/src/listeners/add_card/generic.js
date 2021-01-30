/*
	This file contains methods that can be applied to all add cards
*/

/********************************/
/*   Add Card Generic Listener  */
/********************************/
export function addCardListener(event) {
	let controlMethods = this;

	// path[0] === add button
	let headerCont = event.path[0];
	let addCard = headerCont.nextElementSibling;
	/*Children of addCard*/
	let form = addCard.firstElementChild;
	// Get cotainer holding the confirm and cancel buttons
	let controlsCont = addCard.lastElementChild;
	// Access individual tags
	let icons = controlsCont.getElementsByTagName("i");
	let icon1 = icons[0];
	let icon2 = icons[1];

	if (getComputedStyle(addCard).display === "none") {
		// Display add card
		addCard.style.display = "block";

		// Add event listeners to icons
		icon1.addEventListener("click",controlMethods.submitMethod, { capture: false});
		icon2.addEventListener("click",controlMethods.clearMethod, { capture: false});
	}
	else {
		// Add event listeners to icons
		icon1.removeEventListener("click",controlMethods.submitMethod, { capture: false});
		icon2.removeEventListener("click",controlMethods.clearMethod, { capture: false});
		// Remove add card
		addCard.style.display = "none";
	}
}