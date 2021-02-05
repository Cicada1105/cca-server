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

	// Format data accordingly
	formattedStr = `${weekDay}, ${month} ${utcDate}`;

	return formattedStr;
}

export { formatDate }