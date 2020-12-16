// Controller for connecting past performances view with past performances model

// Require past performance model
import * as PastPerformances from "../models/pastPerformancesModel.js";
// Import button utils
import { setControlBtns, revertControlBtns } from "../utils.js";
/*
	Future addPastPerformance documentation
*/
function addPastPerformance(event) {
	let newPerformance = "NEW PAST PERFORMANCE";
	PastPerformances.add(newPerformance);
}
/*
	Future updatePastPerformance documentation
*/
function updatePastPerformance(event) {
	let updatedPerformance = "UPDATED PAST PERFORMANCE";
	PastPerformances.edit(updatedPerformance);
}
/*
	Future removePastPerformance documentation
*/
function removePastPerformance(event) {
	// Get and store id of current past performance
	let performanceID = event.target.dataset.id;

	PastPerformances.remove(performanceID).then((result) => {
		let { msg, status } = result;
		alert(`${status}: ${msg}`);
		document.location.reload();
	}).catch((error) => {
		console.log("Error:");
		console.log(error);
	});
}

export { addPastPerformance, updatePastPerformance, removePastPerformance }