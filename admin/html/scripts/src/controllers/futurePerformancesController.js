// Controller for connecting future performances view with future performances model

// Require future performance model
import * as FuturePerformances from "../models/futurePerformancesModel.js";
/*
	Future addFuturePerformance documentation
*/
function addFuturePerformance(event) {
	console.log(event);
	let newPerformance = "ADDING NEW PERFORMANCE";
	FuturePerformances.add(newPerformance);
}
/*
	Future updateFuturePerformance documentation
*/
function updateFuturePerformance(event) {
	console.log(event);
	let updatedPerformance = "UPDATED FUTURE PERFORMANCE";
	FuturePerformances.edit(updatedPerformance);
}
/*
	Future removeFuturePerformance documentation
*/
function removeFuturePerformance(event) {
	let performanceID = event.target.dataset.id;
	FuturePerformances.remove(performanceID);
}

export { addFuturePerformance, updateFuturePerformance, removeFuturePerformance }