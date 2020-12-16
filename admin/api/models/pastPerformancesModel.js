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

		// Write newly updated music to file writeFileSync
		fs.writeFile(performancesPath,JSON.stringify(parsedPerformances),"utf8",(err) => {
			if (err) {
				console.log(err);
				reject("Internal Server Error. Try again later");
			}
			else 
				resolve("Successfully added new past performance");
		})
	})
}
/*
	Future update documentation
*/
function update(performance) {
	console.log(`Updating existing past performance: ${performance}`)
}
/*
	Future remove documentation
*/
function remove(performanceID) {
	return new Promise((resolve,reject) => {
		console.log(`Removing past performance with id of: ${performanceID}`);

		// Get performances from file
		const performancesBuffer = fs.readFileSync(performancesPath);
		const performancesJSON = performancesBuffer.toString();
		const performances = JSON.parse(performancesJSON);
		
		let index = performances["past"].findIndex((performance) => performance.id === performanceID);
		if (index === -1)
			reject(`Unable to find past performance with id of: ${performanceID}`);
		else {
			// Filter out past performance who's ID matches that of performanceID
			let updatedPastPerformances = performances["past"].filter((performance) => performance.id !== performanceID );
			// Update past performances with rest of data
			let updatedPerformances = {...performances,"past":updatedPastPerformances};
			// Update file, reflectting new performances
			fs.writeFile("./site_data/performance.json",JSON.stringify(updatedPerformances),"utf8",(err) => {
				if (err) 
					reject("Internal Server Error. Try again later");
				else 
					resolve("Successfully removed past performance!");
			});
		}
	})
}

module.exports = {
	add,
	update,
	remove
}