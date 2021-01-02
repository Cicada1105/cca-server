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
function add(newSong) {
	return new Promise((resolve,reject) => {
		// Get performances from file
		let performancesBuffer = fs.readFileSync(performancesPath);
		let performancesJSON = performancesBuffer.toString();
		let parsedPerformances = JSON.parse(performancesJSON);
		// Pull out present music
		let currentMusic = parsedPerformances["present"];
		// Add unique id to new song
		let newSongWithID = {
			id:uuidv4(),
			...newSong
		}
		
		// Push new song into present performances array
		currentMusic.push(newSongWithID);
		// Update performances data to reflect resent present performances change
		parsedPerformances["present"] = currentMusic;

		// Write newly updated music to file writeFileSync
		fs.writeFile(performancesPath,JSON.stringify(parsedPerformances),"utf8",(err) => {
			if (err) {
				console.log(err);
				reject("Internal Server Error. Try again later");
			}
			else 
				resolve("Successfully added new present performance");
		})
	})
}
/*
	Future update documentation
*/
function update(song) {
	console.log(`Updating existing song: ${song}`);
}
/*
	Future remove documentation
*/
function remove(songID) {
	return new Promise((resolve,reject) => {
		console.log(`Removing present performance with id of: ${songID}`);

		// Get performances from file
		const performancesBuffer = fs.readFileSync(performancesPath);
		const performancesJSON = performancesBuffer.toString();
		const performances = JSON.parse(performancesJSON);
		
		let index = performances["present"].findIndex((performance) => performance.id === songID);
		if (index === -1)
			reject(`Unable to find present performance with id of: ${songID}`);
		else {
			// Filter out present performance who's ID matches that of songID
			let updatedPresentPerformances = performances["present"].filter((performance) => performance.id !== songID );
			// Update present performances with rest of data
			let updatedPerformances = {...performances,"present":updatedPresentPerformances};
			// Update file, reflectting new performances
			fs.writeFile(performancesPath,JSON.stringify(updatedPerformances),"utf8",(err) => {
				if (err) {
					console.log(err);
					reject("Internal Server Error. Try again later");
				}
				else {
					console.log("Updated present performances");
					resolve("Successfully removed present performance!");
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