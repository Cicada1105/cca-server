// Controller for connecting past performances view with past performances model

// Require past performance model
import * as PastPerformances from "../models/pastPerformancesModel.js";
/*
	Future addPastPerformance documentation
*/
function addPastPerformance(event) {
	console.log(event);
	let newPerformance = "NEW PAST PERFORMANCE";
	PastPerformances.add(newPerformance);
}
/*
	Future updatePastPerformance documentation
*/
function updatePastPerformance(event) {
	console.log(event);
	let updatedPerformance = "UPDATED PAST PERFORMANCE";
	PastPerformances.edit(updatedPerformance);
}
/*
	Future removePastPerformance documentation
*/
function removePastPerformance(event) {
	console.log(event);
	console.log("REMOVING PAST PERFORMANCE");
	// Get and store id of current past performance
	let performanceID = event.target.dataset.id;
	// Get icons by first getting parent container
	//let cont = event.

	// Update controls
	//setControlBtns(event);


	PastPerformances.remove(performanceID);
}

export { addPastPerformance, updatePastPerformance, removePastPerformance }