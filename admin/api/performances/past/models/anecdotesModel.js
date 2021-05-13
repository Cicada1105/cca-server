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
			resolve(`Successfully added ${anecdote.name}'s anecdote`);
		} catch(e) {
			console.error(e);
			reject("Internal Server Error. Try again later");
		}
	})
}
/*
	Future update documentation
*/
function update(anecdote) {
	return new Promise((resolve,reject) => {
		resolve(`Updated anecdote: ${anecdote}`);
	})
}
/*
	Future delete documentation
*/
function remove(anecdoteID) {
	return new Promise((resolve,reject) => {
		resolve(`Delete anecdote with id of: ${anecdoteID}`);
	})
}

module.exports = { 
	add, 
	update, 
	remove 
}