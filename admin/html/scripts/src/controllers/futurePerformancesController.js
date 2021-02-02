// Controller for connecting future performances view with future performances model

// Require future performance model
import * as FuturePerformances from "../models/futurePerformancesModel.js";
/*
	Future addFuturePerformance documentation
*/
function addFuturePerformance(event) {
	let addCard = event.path[3];
	let form = addCard.firstElementChild;

	// Convert start and end times to proper format
	const CONVERSION_TO_HOURS = 60 * 60 * 1000; // 60min in hour, 60 sec in min, 1000 ms in s
	let startTime = form.elements["start_time"].valueAsNumber / CONVERSION_TO_HOURS;
	let endTime = form.elements["end_time"].valueAsNumber / CONVERSION_TO_HOURS;
	// Store instruments in array
	let instrumentsArray = []
	let instrumentsUL = form.querySelector("#instruments");
	instrumentsUL.childNodes.forEach(instrumentLI => instrumentsArray.push(instrumentLI.innerText));

	let futurePerformanceData = {
		name: form.elements["name"].value,
		location: form.elements["location"].value,
		instruments: instrumentsArray,
		date_time: {
			date: form.elements["date"].value,
			time: {
				start: startTime.toString(),
				end: endTime.toString()
			}	
		},
		description: form.elements["description"].value
	}

	FuturePerformances.add(futurePerformanceData).then((result) => {
		let { msg, status } = result;
		alert(`${status}: ${msg}`);
		document.location.reload();
	}).catch((error) => {
		console.log("Error:");
		console.log(error);
	});
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