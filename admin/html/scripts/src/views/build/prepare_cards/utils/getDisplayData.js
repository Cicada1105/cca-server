/*
	This file contains the helper functions for retrieving data from 
	display cards to be updated
*/

// Functions for displaying editable data that doesn't fall under basic input
import { 
	addInstrumentsToEditCard, addImageToEditCard, 
	reverFormattedDate, revertTime
} from './helperFunctions.js';

/*   Past Performances Page   */
function getPastPerformanceData(displayCard) {
	// Create map for easy addition of items (better than object performance wise for addition and deletion)
	let performanceData = new Map();

	/*   Get past performance data and put into map   */
	// Name of performance
	let title = displayCard.getElementsByClassName("title")[0].textContent;
	performanceData.set("title",title);
	// Performance location
	let location = displayCard.getElementsByClassName("location")[0].textContent;
	performanceData.set("location",location);
	// Date performance occurred
	let date = displayCard.getElementsByClassName("date")[0].textContent;
	// Revert date from formatted date into a valid time
	let revertedDate = reverFormattedDate(date);
	performanceData.set("date",revertedDate);
	// Brief description about performance
	let description = displayCard.getElementsByClassName("description")[0].textContent;
	performanceData.set("description",description);
	// Image paired along with performance

	// Instruments are not apart of normal inputs. Addd to edit card separately
	let instrumentsCont = displayCard.getElementsByClassName("instrumentsCont")[0];
	let instruments = instrumentsCont.getElementsByTagName("h4");
	addInstrumentsToEditCard(instruments);
	// Image does not have a value property which is used in generic card
	let img = displayCard.getElementsByTagName("img")[0].src;
	addImageToEditCard(img);

	return performanceData;
}
/*   Collaborators Page   */
function getCollaboratorData(displayCard) {
	let collaboratorData = new Map();

	/*   Get past collaborator data and put into map   */
	// Collaborator name
	let name = displayCard.getElementsByClassName("name")[0].textContent;
	collaboratorData.set("name",name);
	// Collaborator professional title
	let title = displayCard.getElementsByClassName("title")[0].textContent;
	collaboratorData.set("title",title);
	// Collaborator's description
	let description = displayCard.getElementsByClassName("description")[0].textContent;
	collaboratorData.set("description", description);

	// Image does not have a value property which is used in generic card
	let img = displayCard.getElementsByTagName("img")[0].src;
	addImageToEditCard(img);

	return collaboratorData;
}
/*   Anecdotes Page   */
function getAnecdoteData(displayCard) {
	// Create map to hold input data
	let anecdoteData = new Map();

	/*   Get anecdote data and put into map   */
	// Name of person anecdote belongs to
	let name = displayCard.getElementsByClassName("name")[0].textContent;
	anecdoteData.set("name",name);
	// Person's professional title
	let title = displayCard.getElementsByClassName("title")[0].textContent;
	anecdoteData.set("title",title);
	// Actual anecdote
	let anecdote = displayCard.getElementsByClassName("anecdote")[0].textContent;
	anecdoteData.set("anecdote",anecdote);

	// Image does not have a value property which is used in generic card
	let img = displayCard.getElementsByTagName("img")[0].src;
	addImageToEditCard(img);

	return anecdoteData;
}
/*   Current Music Page   */
function getPresentPerformanceData(displayCard) {
	// Create map to hold input data
	let performanceData = new Map();

	/*   Get present performance data and put into map   */
	let songTitle = displayCard.getElementsByClassName("name")[0].textContent;
	performanceData.set("name",songTitle);
	let songComposer = displayCard.getElementsByClassName("composer")[0].textContent;
	performanceData.set("composer",songComposer);
	let songDescription = displayCard.getElementsByClassName("description")[0].textContent;
	performanceData.set("description",songDescription);
	
	return performanceData;
}
/*   Future Performances Page   */
function getFuturePerformanceData(displayCard) {
	// Create map to hold input data
	let performanceData = new Map();

	/*   Get future performance data and put into map   */
	// Title of future perforance
	let title = displayCard.getElementsByClassName("title")[0].textContent;
	performanceData.set("title",title);

	// Locaation of where performance will be held
	let location = displayCard.getElementsByClassName("location")[0].textContent;
	performanceData.set("location",location);

	// Date the performance will be help on
	let date = displayCard.getElementsByClassName("date")[0].textContent;
	// Revert date from formatted date into a valid time
	let revertedDate = reverFormattedDate(date);
	performanceData.set("date",revertedDate);

	// Brief description about the performance
	let description = displayCard.getElementsByClassName("description")[0].textContent;
	performanceData.set("description",description);

	/* Instruments and time are not apart of normal inputs. Addd to edit card separately */
	// Time at which the performance will take place
	let timeRange = displayCard.getElementsByClassName("time")[0].textContent;	// start_time - end_time
	let times = timeRange.split(" - ");	// [start_time,end_time]

	// Revert times back into ms to store into edit card
	let start_time = times[0];
	let revertedStartTime = revertTime(start_time);
	// Add start time to input
	document.getElementById("start").valueAsNumber = revertedStartTime;

	let end_time = times[1];
	let revertedEndTime = revertTime(end_time);
	// Add end time to input
	document.getElementById("end").valueAsNumber = revertedEndTime;

	let instrumentsCont = displayCard.getElementsByClassName("instrumentsCont")[0];
	let instruments = instrumentsCont.getElementsByTagName("h4");
	addInstrumentsToEditCard(instruments);

	return performanceData;
}
/*   Editing Page   */
function getLitDisplayData(event) {
	// Create map to hold input data
	let litMap = new Map();
	
	// Get displayed data for selected literature type
	let header = event.target.previousElementSibling;
	litMap.set("single_input",header);	// form single input is used for multiple functions on page

	return litMap;
}
function getGenreDisplayData(event) {
	// Create map to hold input data
	let genreMap = new Map();

	/* Get displayed data for selected genre and put into map */
	let controlsCont = event.target.parentElement;
	let genreEl = controlsCont.previousElementSibling;
	genreMap.set("single_input",genreEl.textContent);	// form single input is used for multiple functions on page
	
	return genreMap;
}
function getEditingRateDisplayData(event) {
	// Create map to hold input data
	let rateMap = new Map();
	
	// Get displayed data for selected rate
	let controlsCont = event.target.parentElement;
	let rateRow = controlsCont.parentElement;
	let rateTds = rateRow.getElementsByTagName("td");
	// Get td’s of row and convert to array
	let tdArray = Array.from(rateTds);
	// Only store td’s that don’t include controls (last eleent contains controls)
	/*
		splice(index, deleteCount, ...items)
		starts at index and deletes number of items from array specified by
		deleteCount. Returns removed elements and original array is updated
	*/
	let rates = tdArray.slice(0,-1);

	if (rates.length === 4) {
		rateMap.set("min",rates[0].textContent);
		rateMap.set("max",rates[1].textContent);
		rateMap.set("perHour",rates[2].textContent);
		rateMap.set("perWord",rates[3].textContent);
	}
	else if (rates.length === 5) {
		rateMap.set("min",rates[0].textContent);
		rateMap.set("max",rates[1].textContent);
		rateMap.set("flatRate",rates[2].textContent);
		rateMap.set("perHour",rates[3].textContent);
		rateMap.set("perWord",rates[4].textContent);
	}

	return rateMap;
}
/*   Reedmaking Page   */
function getReedNameDisplayData(event) {
	// Create new map to hold input data
	let nameMap = new Map();

	let editBtn = event.target;
	// Retrieve name of reed and then put into map
	let reedName = editBtn.previousElementSibling.textContent;
	nameMap.set("name",reedName);

	return nameMap;
}
function getReedDescriptionDisplayData(event) {
	// Create map to hold input data
	let descriptionMap = new Map();

	let editBtn = event.target;
	// Retrieve reed description and then put into map
	let reedDescrription = editBtn.nextElementSibling.textContent;
	descriptionMap.set("description",reedDescrription);

	return descriptionMap;
}
function getReedRateDisplayData(event) {
	// Create map to hold input data
	let rateMap = new Map();

	/* Get rate data and put into map */
	// Retrieve conrols cont
	let editBtn = event.target;
	let controlsCont = editBtn.parentElement;
	// Retrieve row
	let rateRow = controlsCont.parentElement;
	// Retrieve all table data elemets for row
	let rateTds = rateRow.getElementsByTagName("td");
	// Convert to array
	let tdArray = Array.from(rateTds);
	// Remove controls (last) container
	let rates = tdArray.slice(0,-1);
	// Reed rate quantity
	rateMap.set("quantity",rates[0].textContent);
	// Reed rate pricing
	rateMap.set("price",rates[1].textContent);

	return rateMap;
}

export {
	getPastPerformanceData, getCollaboratorData, getAnecdoteData,
	getPresentPerformanceData, getFuturePerformanceData,
	getLitDisplayData, getGenreDisplayData, getEditingRateDisplayData,
	getReedNameDisplayData, getReedDescriptionDisplayData,
	getReedRateDisplayData
}