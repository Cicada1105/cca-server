/*
	Model that directly interfaces with the anecdotes data
*/

// Import data
const anecdotes = require("../../../site_data/anecdotes.json");

function getAllAnecdotes() {
	// Return promise that resolves with anecdote data
	return new Promise((resolve,reject) => {
		resolve(anecdotes);
	})
}

module.exports = {
	getAllAnecdotes
}