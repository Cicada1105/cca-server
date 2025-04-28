import * as PageListeners from './views/';

const initListeners = () => {
	/* Set evet listener for navigation */
	// background overlay
	let bg_overlay = document.getElementById("bg_block");
	// navigation bar container
	let nav_bar_cont = document.getElementById("nav_bar_cont");
	// Navigation element
	let nav_element = nav_bar_cont.lastElementChild;
	// Navigation links
	let nav_links = nav_element.getElementsByTagName("a");
	// Get access to X button
	let i_btn = nav_bar_cont.getElementsByTagName("i")[0];

	// Add click evennt litener to button
	i_btn.addEventListener("click",function() {
		let is_displayed = bg_overlay.style.display === "block";

		// Set attributes depending on state of navigation bar
		bg_overlay.style.display = is_displayed ? "none" : "block";
		nav_bar_cont.style.left = is_displayed ? "-21rem" : "0rem";
		i_btn.style.right = is_displayed ? "-30px" : "20px";
		// Change class of i_btn between "X" and "hamburger bars" once transition is done
		i_btn.addEventListener("transitionend",function() {
			let oldClassName = i_btn.classList[1];
			let newClassName = is_displayed ? "fa-bars" : "fa-times";

			i_btn.classList.replace(oldClassName,newClassName);
		},{once:true});
	});

	let pathname = document.location.pathname; // Get current path of file
	// Split up pathname into sub paths
	let paths = pathname.split("/"); // returns ["","cca-admin-control-panel","rest","of","path",""]
	let starting_path = paths[1]; // returns "cca-admin-control-panel" or "cca-admin-login"

	// Check if in control panel
	if (starting_path === "cca-admin-control-panel") {
		// Remove first part of path to figure out rest of path
		starting_path = paths.slice(2)[0];

		// Call specific listeners depending on path name
		switch(starting_path) {

			case "performance":
				// Get rest of path after 'performance' to determine subdirectory
				starting_path = paths.slice(3)[0];
				switch(starting_path) {

					case "past":
						// Get rest of path after 'past' to determine subdirectory
						starting_path = paths.slice(4)[0]
						switch(starting_path) {

							case "collaborators":
								PageListeners.initCollaboratorListeners();
							break;
							case "anecdotes":
								PageListeners.initAnecdoteListeners();
							break;
							case "":
								PageListeners.initPastPerformanceListeners();
							break;

						}
					break;
					case "present":
						PageListeners.initMusicStandListeners();
					break;
					case "future":
						PageListeners.initFuturePerformancesListeners();
					break;	

				}
			break;
			case "editing":
				PageListeners.initEditingListeners();
			break
			case "reedmaking":
				starting_path = paths.slice(3)[0];
				switch(starting_path) {
					case '':
						PageListeners.initListReedListeners();
					break;
					case 'add':
						PageListeners.initAddReedListeners();
					break;
					case 'edit':
						PageListeners.initEditReedListeners();
					break;
					case 'category':
						// Get the rest of the path after 'category' to determine subdirectory
						starting_path = paths.slice(4)[0];
						switch(starting_path) {
							case 'add':
								PageListeners.initAddReedCategoryListeners();
							break;
							case 'edit':
								PageListeners.initEditReedCategoryListeners();
							break;
						}
					break
				}
			break;
		}
	}
}

export { initListeners }