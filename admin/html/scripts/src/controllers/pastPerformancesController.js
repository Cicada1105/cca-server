// Controller for connecting past performances view with past performances model

// Require past performance model
import * as PastPerformances from "../models/pastPerformancesModel.js";
// Import utility functions
import { formatDate } from './utils.js';
/*
	Future addPastPerformance documentation
*/
function addPastPerformance(event) {
	let addCard = event.path[3];
	let form = addCard.firstElementChild;
	let formEls = form.elements;

	let file = formEls["imgFile"].files[0];
	let imgAlt = file.name;
	// Store values of instruments in array
	let instrumentsArray = [];
	let instrumentsUL = form.querySelector("#instruments");
	instrumentsUL.childNodes.forEach(instrument => instrumentsArray.push(instrument.innerText));
	// Format date 
	let formattedDate = formatDate(form.elements["date"].valueAsDate);
	// Convert file to array buffer to be sennt and stored in request
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

		PastPerformances.add(testData).then((result) => {
			let { msg, status } = result;
			alert(`${status}: ${msg}`);
			document.location.reload();
		}).catch((error) => {
			console.log("Error:");
			console.log(error);
		});
	}
}
/*
	Future updatePastPerformance documentation
*/
function updatePastPerformance(event) {
	let updatedPerformance = "UPDATED PAST PERFORMANCE";
	PastPerformances.edit(updatedPerformance);
}
/*
	Future removePastPerformance documentation
*/
function removePastPerformance(event) {
	// Get and store id of current past performance
	let performanceID = event.target.dataset.id;

	PastPerformances.remove(performanceID).then((result) => {
		let { msg, status } = result;
		alert(`${status}: ${msg}`);
		document.location.reload();
	}).catch((error) => {
		console.log("Error:");
		console.log(error);
	});
}

export { addPastPerformance, updatePastPerformance, removePastPerformance }