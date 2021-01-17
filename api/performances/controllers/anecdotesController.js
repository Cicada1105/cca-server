/*
	Anecdotes conroller interfaces with anecdotes model
*/

// Import anecdotes model
const AnecdotesModel = require("../models/anecdotesModel.js");

async function getAnecdotes(req,res) {
	// Handle headers
	res.setHeader("Content-Type","application/json");

	// Handle anecdotes response using model -> await promise
	await AnecdotesModel.getAllAnecdotes().then(anecdotes => {
		res.statusCode = 200;
		res.end(JSON.stringify(anecdotes));
	}).catch(err => {
		res.statusCode = 500;
		res.end(JSON.stringify(err));
	});
}

module.exports = {
	getAnecdotes
}