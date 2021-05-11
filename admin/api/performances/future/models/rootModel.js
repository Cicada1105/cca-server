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
		// Pull out future music
		let currentMusic = parsedPerformances["future"];
		// Add unique id to new song
		let newPerformanceWithID = {
			id:uuidv4(),
			...newPerformance
		}
		
		// Push new song into future performances array
		currentMusic.push(newPerformanceWithID);
		// Update performances data to reflect resent future performances change
		parsedPerformances["future"] = currentMusic;

		// Write to file, catching any error that may occur
		try {
			writeToFile(performancesPath,JSON.stringify(parsedPerformances));
			resolve("Successfully added new future performance");
		} catch(e) {
			reject("Internal Server Error. Try again later");
		}
	})
}
/*
	Future update documentation
*/
function update(performance) {
	return new Promise((resolve,reject) => {
		resolve(`Updating existing future performance: ${performance}`);
	})
}
/*
	Future remove documentation
*/
function remove(performanceID) {
	return new Promise((resolve,reject) => {
		// Get performances from file
		const performances = getFileData(performancesPath);
		
		let index = performances["future"].findIndex((performance) => performance.id === performanceID);
		if (index === -1)
			reject(`Unable to find future performance with id of: ${performanceID}`);
		else {
			// Filter out future performance who's ID matches that of performanceID
			let updatedFuturePerformances = performances["future"].filter((performance) => performance.id !== performanceID );
			// Update future performances with rest of data
			let updatedPerformances = {...performances,"future":updatedFuturePerformances};
			// Update file, reflectting new performances
			try {
				writeToFile(performancesPath,JSON.stringify(updatedPerformances));
				resolve("Successfully removed future performance!");
			} catch(e) {
				console.log(e);
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