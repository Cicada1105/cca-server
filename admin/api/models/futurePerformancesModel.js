/*
	File contains request methods for dealing directly with the corresponding data
*/

// Import performance data to be used by the model
const performancesPath = "./site_data/performance.json";
// Import fs to handle file calls
const fs = require("fs");
// Import uuid for adding new resource
const { v4: uuidv4 } = require("uuid");

/*
	Future add documentation
*/
function add(newPerformance) {
	return new Promise((resolve,reject) => {
		// Get performances from file
		let performancesBuffer = fs.readFileSync(performancesPath);
		let performancesJSON = performancesBuffer.toString();
		let parsedPerformances = JSON.parse(performancesJSON);
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

		// Write newly updated music to file writeFileSync
		fs.writeFile(performancesPath,JSON.stringify(parsedPerformances),"utf8",(err) => {
			if (err) {
				console.log(err);
				reject("Internal Server Error. Try again later");
			}
			else 
				resolve("Successfully added new future performance");
		})
	})
}
/*
	Future update documentation
*/
function update(performance) {
	console.log(`Updating existing future performance: ${performance}`)
}
/*
	Future remove documentation
*/
function remove(performanceID) {
	return new Promise((resolve,reject) => {
		console.log(`Removing future performance with id of: ${performanceID}`);

		// Get performances from file
		const performancesBuffer = fs.readFileSync(performancesPath);
		const performancesJSON = performancesBuffer.toString();
		const performances = JSON.parse(performancesJSON);
		
		let index = performances["future"].findIndex((performance) => performance.id === performanceID);
		if (index === -1)
			reject(`Unable to find future performance with id of: ${performanceID}`);
		else {
			// Filter out future performance who's ID matches that of performanceID
			let updatedFuturePerformances = performances["future"].filter((performance) => performance.id !== performanceID );
			// Update future performances with rest of data
			let updatedPerformances = {...performances,"future":updatedFuturePerformances};
			// Update file, reflectting new performances
			fs.writeFile("./site_data/performance.json",JSON.stringify(updatedPerformances),"utf8",(err) => {
				if (err) {
					console.log(err);
					reject("Internal Server Error. Try again later");
				}
				else {
					console.log("Removed future performance");
					console.log(updatedPerformances);
					resolve("Successfully removed future performance!");
				}
			});
		}
	})
}

module.exports = {
	add,
	update,
	remove
}