// Controller for connecting past performances view with past performances model

// Require past performance model
import * as PastPerformances from "../models/pastPerformancesModel.js";
/*
	Future addPastPerformance documentation
*/
function addPastPerformance(event) {
	let testData = {
		name: "Performance D",
		description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur id erat vel nisl tincidunt interdum. Nam mattis luctus neque. Vivamus at nibh libero. Phasellus maximus dictum posuere.",
		img: {
			src: "",
			alt: "PerformanceD"
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