// Controller for connecting past performances view with past performances model

// Require past performance model
import * as PastPerformances from "../../../models/performances/past/rootModel.js";

// Import utility functions
import { formatDate } from '../../utils.js';
// Require callback functions shared by all controllers
import { successCallback, failedCallback } from '../../utils.js';
/*
	Future addPastPerformance documentation
*/
function addPastPerformance(event) {
	let path = event.composedPath();
	let controlsCont = path[2];
	let form = controlsCont.previousElementSibling;
	let formEls = form.elements;

	let file = formEls["imgFile"].files[0];
	let imgAlt = file.name;
	// Store values of instruments in array
	let instrumentsArray = [];
	let instrumentsUL = form.querySelector("#instruments");
	instrumentsUL.childNodes.forEach(instrument => instrumentsArray.push(instrument.innerText));
	// Format date 
	let formattedDate = formatDate(form.elements["date"].valueAsDate);
	// Convert file to array buffer to be sent and stored in request
	let myReader = new FileReader();
	myReader.readAsDataURL(file);
	myReader.onloadend = function() {
		let testData = {
			name: formEls["title"].value,
			description: formEls['description'].value,
			location:formEls['location'].value,
			instruments:instrumentsArray,
			date:formattedDate,
			img: {
				src: myReader.result,
				alt: imgAlt
			}
		}

		PastPerformances.add(testData).then(successCallback).catch(failedCallback);
	}
}
/*
	Future updatePastPerformance documentation
*/
function updatePastPerformance(event) {
	let path = event.composedPath();
	let controlsCont = path[2];
	let form = controlsCont.previousElementSibling;
	let formEls = form.elements;

	// Retrieve Unique ID assocaited with past performance
	let id = event.target.dataset["id"];

	// Store values of instruments in array
	let instrumentsArray = [];
	let instrumentsUL = form.querySelector("#instruments");
	instrumentsUL.childNodes.forEach(instrument => instrumentsArray.push(instrument.innerText));
	// Format date 
	let formattedDate = formatDate(form.elements["date"].valueAsDate);

	// Store known data
	let updatedPerformance = {
		id,
		name: formEls["title"].value,
		description: formEls['description'].value,
		location:formEls['location'].value,
		instruments:instrumentsArray,
		date:formattedDate,
		img: {
			src: undefined,
			alt: undefined
		}
	}

	// Retrieve files from input
	let files = formEls["imgFile"].files;
	// Check if new image was chosen
	if (files.length === 1) { // Create file reader to retrieve file
		let file = files[0];
		let imgAlt = file.name;
		// Convert file to array buffer to be sent and stored in request
		let myReader = new FileReader();
		myReader.readAsDataURL(file);
		myReader.onloadend = function() {
			// Add image data to updatedPerformance
			updatedPerformance.img["src"] = myReader.result;
			updatedPerformance.img["alt"] = imgAlt;

			PastPerformances.update(updatedPerformance).then(successCallback).catch(failedCallback);
		}
	}
	else 
		// No need to wait for fileread, just update performance
		PastPerformances.update(updatedPerformance).then(successCallback).catch(failedCallback);
}
/*
	Future removePastPerformance documentation
*/
function removePastPerformance(event) {
	// Get and store id of current past performance
	let performanceID = event.target.dataset.id;

	PastPerformances.remove(performanceID).then(successCallback).catch(failedCallback);
}

export { addPastPerformance, updatePastPerformance, removePastPerformance }