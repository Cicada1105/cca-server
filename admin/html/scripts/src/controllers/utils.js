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
function removeFileExtension( file ) {
	// Split file name by '.' to locate extension
	let fileNameComponents = file.split('.');
	// Remove only the extension (Account for names possibly with additionl periods)
	let fileExtension = fileNameComponents.splice(-1);
	// Join remaining name of file by understcore
	let fileName = fileNameComponents.join("_");

	return { fileName, fileExtension ];
}
function successCallback(result) {
	let { msg, status } = result;
	alert(`${status}: ${msg}`);
	// Replace current location with current location to mimic refresh, including token
	// Get token
	let token = window.sessionStorage.getItem("token");
	// Replace location
	document.location.replace(`${document.location.origin}${document.location.pathname}?token=${token}`);
}
function failedCallback(error) {
	console.log("Error:");
	console.log(error);
}

export { 
	formatDate, removeFileExtension,
	successCallback, failedCallback 
}