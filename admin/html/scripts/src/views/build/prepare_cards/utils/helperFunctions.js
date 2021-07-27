/*
	This file contains functions that aid in displaying edit card data
	to the input card that cannot be grouped along with the normal
	inputs
*/

// Import function for creating list item
import { createListItem } from '../../utils/helperFunctions.js';

/* This function can be used by both past and future performances pages */
const addInstrumentsToEditCard = (instruments) => {
	let instrumentsArray = Array.from(instruments);
	// Replace any possiple ",&nbsp;&nbsp;&nbsp;" used for multiple instruments
	instrumentsArray = instrumentsArray.map(instrument => instrument.textContent.replace(/,\s{3}/,""));
	let instrumentsUl = document.getElementById("instruments");
	// Remove any instruments that may already be displyed
	instrumentsUl.replaceChildren();
	// Loop through instruments, displaying them to editable list
	instrumentsArray.forEach(instrument => instrumentsUl.appendChild(createListItem(instrument)));
}
const addImageToEditCard = (imgPath) => {
	let imgCont = document.getElementById("imgCont");
	let imgInput = imgCont.lastElementChild;
	// Set img src property
	imgInput.src = imgPath;
}
const reverFormattedDate = (formattedDate) => {
	const MONTHS = ["January","February","March","April","May","June","July","August","September","October","November","December"];

	let revertedStr;

	// Convert string to array to be manipulated
	let dateContentArr = formattedDate.replace(/,/,"").split(" ");	// [[Week_Day],[Month],[Day], [Year]]
	/* Valid date needs to be inform YYYY-MM-DD */
	// Retrieve year
	let year = parseInt(dateContentArr[3]);
	// Retrieve Month
	let monthIndex = MONTHS.indexOf(dateContentArr[1]) + 1; // Adding '1' allows month to be accurate MM value of YYYY-MM-DD
	let month = monthIndex < 10 ? `0${monthIndex}` : monthIndex.toString();
	// Retrieve Day
	let day = (parseInt(dateContentArr[2]) < 10 ? "0" : "") + dateContentArr[2];

	// Collate proper info into formatted reverted string
	revertedStr = `${year}-${month}-${day}`;

	return revertedStr;
}
const revertTime = (timeStr) => {
	// Constant conversions
	const MS_IN_MINUTES = 1000 * 60;	// 1000ms in s, 60s in min
	const MS_IN_HOURS = MS_IN_MINUTES * 60;	// 60min in hour

	// timeStr in format: hh:mm followed directly by "am" or "pm"
	let timeInMs;

	// Get time of day "am" or "pm"
	let am_pm = timeStr.slice(-2);	// Returns "am" or "pm"
	// Get hour:minute without am_pm
	let time = timeStr.slice(0,-2);	// Returns "hh:mm"
	// Split up hour and minute
	let hourMin = time.split(":");	// Returns ["hh","mm"]
	let hour = parseInt(hourMin[0]);
	let min = parseInt(hourMin[1]);

	// Calculate hours and minutes in ms, add, and include additional 12 hours in ms if 
	let hoursInMs = hour * MS_IN_HOURS;
	let minutesInMs = min * MS_IN_MINUTES;
	let afterMidday = am_pm.localeCompare("pm") === 0 ? (12 * MS_IN_HOURS) : 0;

	timeInMs = hoursInMs + minutesInMs + afterMidday;

	return timeInMs;
}

export { 
	addInstrumentsToEditCard, addImageToEditCard, 
	reverFormattedDate, revertTime
}