/*
	File contains request methods for dealing directly with the corresponding data
*/

// Import performance data to be used by the model
const performancesPath = "./site_data/performance.json";
// Require method to retrieve file data
const { getFileData } = require("../../../../utils.js");
// Require method for writing to file
const { writeToFile } = require("../../../utils.js");
// Import uuid for adding new resource
const { v4: uuidv4 } = require("uuid");

/*
	Future add documentation
*/
function add(newPerformance) {
	return new Promise((resolve,reject) => {
		// Get performances from file
		let parsedPerformances = getFileData(performancesPath);
		// Pull out past music
		let pastPerformances = parsedPerformances["past"];
		// Add unique id to new past performance
		let newPerformanceWithID = { 
			id:uuidv4(),
			...newPerformance
		}

		// Push new song into past performances array
		pastPerformances.push(newPerformanceWithID);
		// Update performances data to reflect resent past performances change
		parsedPerformances["past"] = pastPerformances;

		// Write data to file, catching any error that may occur
		try {
			writeToFile(performancesPath,JSON.stringify(parsedPerformances));
			resolve("Successfully added new past performance");
		} catch(e) {
			console.log(err);
			reject("Internal Server Error. Try again later");
		}
	})
}
/*
	Future update documentation
*/
function update(editedPerformance) {
	return new Promise((resolve,reject) => {
		// Get performances from file
		let parsedPerformances = getFileData(performancesPath);
		// Pull out past performance
		let pastPerformances = parsedPerformances["past"];

		// Find index of performance in storage that matches id of updated performance
		let index = pastPerformances.findIndex((performance) => performance.id === editedPerformance.id);
		if (index === -1)
			reject(`Unable to find past performance with id of: ${editedPerformance.id}`);
		else {
			// If edited image was left alone, don't update image
			if (editedPerformance.img["src"] === undefined) {
				let { img, ...editedPerformanceWithoutImg } = editedPerformance;
				// Update stored performance
				Object.assign(pastPerformances[index],editedPerformanceWithoutImg);
			}
			else 
				Object.assign(pastPerformances[index],editedPerformance)
			// Update past performances with rest of data
			let updatedPerformances = { ...parsedPerformances, "past": pastPerformances }
			// Update file, reflecting updated performance
			try {
				writeToFile(performancesPath,JSON.stringify(updatedPerformances));
				resolve(`Successfully updated ${pastPerformances[index].name}`);
			} catch(e) {
				reject("Internal Server Error. Try again later");
			}
		}
	})
}
/*
	Future remove documentation
*/
function remove(performanceID) {
	return new Promise((resolve,reject) => {
		// Get performances from file
		const performances = getFileData(performancesPath);
		// Pull out past performance
		let pastPerformances = performances["past"];

		let index = pastPerformances.findIndex((performance) => performance.id === performanceID);
		if (index === -1)
			reject(`Unable to find past performance with id of: ${performanceID}`);
		else {
			// Filter out past performance who's ID matches that of performanceID
			let updatedPastPerformances = pastPerformances.filter((performance) => performance.id !== performanceID );
			// Update past performances with rest of data
			let updatedPerformances = {...performances,"past":updatedPastPerformances};
			// Update file, reflectting new performances
			try {
				writeToFile(performancesPath,JSON.stringify(updatedPerformances));
				resolve("Successfully removed past performance!");

			} catch(e) {
				reject("Internal Server Error. Try again later");
			}
		}
	})
}

module.exports = {
	add,
	update,
	remove
}