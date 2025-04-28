/*
	File is for handling basic utility functions for the controllers
*/

const WEEK_DAYS = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
const MONTHS = ["January","February","March","April","May","June","July","August","September","October","November","December"];

function formatDate(date) {
	// Formatted date
	let formattedStr = "";

	// Format weekday
	let weekDay = WEEK_DAYS[date.getUTCDay()];
	// Format month
	let month = MONTHS[date.getMonth()];
	// Get month date 
	let utcDate = date.getUTCDate();
	// Get year
	let utcYear = date.getUTCFullYear();

	// Format data accordingly
	formattedStr = `${weekDay}, ${month} ${utcDate} ${utcYear}`;

	return formattedStr;
}
function successCallback(result) {
	let { msg, status } = result;
	alert(`${status}: ${msg}`);
	// Replace current location with current location to mimic refresh
	document.location.replace(`${document.location.origin}${document.location.pathname}${document.location.search}`);
}
function failedCallback(error) {
	console.log("Error:");
	console.log(error);
}

export { 
	formatDate, successCallback, failedCallback 
}