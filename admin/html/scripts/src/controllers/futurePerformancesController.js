// Controller for connecting future performances view with future performances model

// Require future performance model
import * as FuturePerformances from "../models/futurePerformancesModel.js";
// Import utility functions
import { formatDate } from './utils.js';

// timeMS is time of entered time input in milliseconds
function formatTime(timeMS) {
	let formatStr = "";

	const CONVERSION_TO_HOURS = 1000 * 60 * 60; // 100s in m; 60s in m; 60m in h

	// Get hours from ms by dividing
	let hourFloat = timeMS / CONVERSION_TO_HOURS;
	// Round hour float down to get full hour
	let hour = Math.floor(hourFloat);
	// Store time of day am/pm
	let amPm = hour < 12 ? "am" : "pm";
	// Subtract hours from time to extract minutes
	let minutesFloat = hourFloat - hour;
	// If hour is greater than 12, subtract 12 (time is in 24 hour time)
	if (hour > 12)
		hour -= 12;
	// Multiple remaining decimal (in hours) by 60 to convert to minutes
	let minutes = (minutesFloat * 60).toFixed();

	formatStr = `${hour}:${minutes} ${amPm}`;

	return formatStr;
}
/*
	Future addFuturePerformance documentation
*/
function addFuturePerformance(event) {
	let addCard = event.path[3];
	let form = addCard.firstElementChild;

	// Store instruments in array
	let instrumentsArray = []
	let instrumentsUL = form.querySelector("#instruments");
	instrumentsUL.childNodes.forEach(instrumentLI => instrumentsArray.push(instrumentLI.innerText));
	// Format date 
	let formattedDate = formatDate(form.elements["date"].valueAsDate);
	// Format times
	let start = formatTime(form.elements["start_time"].valueAsNumber);
	let end = formatTime(form.elements["end_time"].valueAsNumber);


	let futurePerformanceData = {
		name: form.elements["name"].value,
		location: form.elements["location"].value,
		instruments: instrumentsArray,
		date: formattedDate,
		time: {
			start,
			end
		},
		description: form.elements["description"].value
	}
	FuturePerformances.add(futurePerformanceData).then((result) => {
		let { msg, status } = result;
		alert(`${status}: ${msg}`);
		// Replace current location with current location to mimic refresh, including token
		// Get token
		let token = window.sessionStorage.getItem("token");
		// Replace location
		document.location.replace(`${document.location.origin}${document.location.pathname}?token=${token}`);
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
		// Replace current location with current location to mimic refresh, including token
		// Get token
		let token = window.sessionStorage.getItem("token");
		// Replace location
		document.location.replace(`${document.location.origin}${document.location.pathname}?token=${token}`);
	}).catch((error) => {
		console.log("Error:");
		console.log(error);
	});
}

export { addFuturePerformance, updateFuturePerformance, removeFuturePerformance }