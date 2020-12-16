// Controller for connecting future performances view with future performances model

// Require future performance model
import * as FuturePerformances from "../models/futurePerformancesModel.js";
/*
	Future addFuturePerformance documentation
*/
function addFuturePerformance(event) {
	let newPerformance = "ADDING NEW PERFORMANCE";
	FuturePerformances.add(newPerformance);
}
/*
	Future updateFuturePerformance documentation
*/
function updateFuturePerformance(event) {
	let updatedPerformance = "UPDATED FUTURE PERFORMANCE";
	FuturePerformances.edit(updatedPerformance);
}
/*
	Future removeFuturePerformance documentation
*/
function removeFuturePerformance(event) {
	// Get and store id of current past performance
	let performanceID = event.target.dataset.id;

	FuturePerformances.remove(performanceID).then((result) => {
		let { msg, status } = result;
		alert(`${status}: ${msg}`);
		document.location.reload();
	}).catch((error) => {
		console.log("Error:");
		console.log(error);
	});
}

export { addFuturePerformance, updateFuturePerformance, removeFuturePerformance }