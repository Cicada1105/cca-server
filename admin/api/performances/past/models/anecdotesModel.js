/*
	File contains request methods for dealing directly with the corresponding data
*/

// Import anecdotes data to be used by the model
const anecdotesPath = "./site_data/anecdotes.json";
// Require method to retrieve file data
const { getFileData } = require("../../../../utils.js");
// Require method for writing to file
const { writeToFile } = require("../../../utils.js");
// Import uuid for adding new resource
const { v4: uuidv4 } = require("uuid");

/*
	Futture add documentation
*/
function add(anecdote) {
	return new Promise((resolve,reject) => {
		// Get anecdotes from file
		let anecdotes = getFileData(anecdotesPath);
		// Add unique id to newly added anecdote
		let anecdoteWithID = {
			id: uuidv4(),
			...anecdote
		}

		// Push new anecdote into array with other anecdotes
		anecdotes.push(anecdoteWithID);

		// Write newly updated anecdotes to original file, catching any error that may occur
		try {
			writeToFile(anecdotesPath,JSON.stringify(anecdotes));
			resolve(`Successfully added anecdote by ${anecdote.name}`);
		} catch(e) {
			console.error(e);
			reject("Internal Server Error. Try again later");
		}
	})
}
/*
	Future update documentation
*/
function update(editedAnecdote) {
	return new Promise((resolve,reject) => {
		// Retrieve anecdotes from file
		let anecdotes = getFileData(anecdotesPath);

		// Find index of anecdote in storage that matches id of edited anecdote
		let index = anecdotes.findIndex(anecdote => anecdote.id === editedAnecdote.id);
		if (index === -1)
			reject(`Unable to find past anecdote by ${editedCollaborator.name}`)
		else {
			// If edited image was left alone, don't update image in storage
			if (editedAnecdote.img["src"] === undefined) {
				let { img, ...editedAnecdoteWithoutImg } = editedAnecdote;
				// Update stored aneccdotes
				Object.assign(anecdotes[index],editedAnecdoteWithoutImg);
			}
			else
				Object.assign(anecdotes[index],editedAnecdote)

			// Update file, reflecting changes to anecdote
			try {
				writeToFile(anecdotesPath,JSON.stringify(anecdotes));
				resolve(`Successfully updated anecdote by ${anecdotes[index].name}`);
			} catch(e) {
				reject("Internal Server Error. Try again later");
			}
		}
	})
}
/*
	Future delete documentation
*/
function remove(anecdoteID) {
	return new Promise((resolve,reject) => {
		// Get anecdotes from file
		let anecdotes = getFileData(anecdotesPath);

		// Locate index of anecdote to be removed
		let index = anecdotes.findIndex((anecdote) => anecdote.id === anecdoteID);
		if (index === -1)
			reject(`Unable to find anecdote with id of: ${anecdoteID}`);
		else {
			// Filter out anecdotes who's IDs do not match that of anecdoteID
			let updatedAnecdotes = anecdotes.filter((anecdote) => anecdote.id !== anecdoteID);
			// Update file, reflecting updated anecdotes
			try {
				writeToFile(anecdotesPath,JSON.stringify(updatedAnecdotes));
				resolve(`Successfully removed anecdote by ${anecdotes[index].name}`);
			} catch(e) {
				console.error(e);
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