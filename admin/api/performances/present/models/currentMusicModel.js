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
function add(newSong) {
	return new Promise((resolve,reject) => {
		// Get performances from file
		let parsedPerformances = getFileData(performancesPath);

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

		// Write data to file, catching any error that may occur
		try {
			writeToFile(performancesPath,JSON.stringify(parsedPerformances));
			resolve("Successfully added new present performance");
		} catch(e) {
			console.log(err);
			reject("Internal Server Error. Try again later");
		}
	})
}
/*
	Future update documentation
*/
function update(editedSong) {
	return new Promise((resolve,reject) => {
		// Get performances from file
		let parsedPerformances = getFileData(performancesPath);

		// Pull out present music
		let currentMusic = parsedPerformances["present"];

		// Find index in storage of song that matches the id of the edited song
		let index = currentMusic.findIndex(song => song.id === editedSong.id);
		if (index === -1)
			reject(`Unable to find ${editedSong.name} by ${editedSong.by}`)
		else {
			// Update stored music
			Object.assign(currentMusic[index],editedSong);
			// Update present music with rest of performances
			let updatedPerformances = { ...parsedPerformances, "present": currentMusic };
			// Update file, reflecting changes to current music
			try {
				writeToFile(performancesPath,JSON.stringify(parsedPerformances));
				resolve(`Successfully updated ${currentMusic[index].name} by ${currentMusic[index].by}`);
			} catch(e) {
				reject("Internal Server Error. Try again later");
			}
		}
	})
}
/*
	Future remove documentation
*/
function remove(songID) {
	return new Promise((resolve,reject) => {
		// Get performances from file
		const performances = getFileData(performancesPath);
		
		let index = performances["present"].findIndex((performance) => performance.id === songID);
		if (index === -1)
			reject(`Unable to find present performance with id of: ${songID}`);
		else {
			// Filter out present performance who's ID matches that of songID
			let updatedPresentPerformances = performances["present"].filter((performance) => performance.id !== songID );
			// Update present performances with rest of data
			let updatedPerformances = {...performances,"present":updatedPresentPerformances};
			// Update file, reflectting new performances
			try {
				writeToFile(performancesPath,JSON.stringify(updatedPerformances));
				resolve("Successfully removed present performance!");
			} catch(e) {
				console.log(err);
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