/*
	Model that directly interfaces with the anecdotes data
*/

// Import data
const anecdotes = require("../../../site_data/anecdotes.json");

function getAllAnecdotes() {
	// Return promise that resolves with anecdote data
	return new Promise((resolve,reject) => {
		// Remove unnecessary id from data to be returned to front end
		let updatedAnecdotes = [];
		anecdotes.forEach(anecdote => {
			// Extract out current id from rest of info
			let { id, ...rest } = anecdote;
			// Store rest of anecdote info without id
			updatedAnecdotes.push(rest);
		})
		resolve(updatedAnecdotes);
	})
}

module.exports = {
	getAllAnecdotes
}