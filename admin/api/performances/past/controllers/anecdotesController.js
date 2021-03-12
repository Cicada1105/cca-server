/*
	File for handling API requests and building responses
*/

// Import model to handle data
const AnecdotesModel = require("../models/anecdotesModel.js");

// Import utility function for handling the retrieval of body data
const { getBodyData } = require("../../../utils.js");

function addAnecdote(req,res) {
	AnecdotesModel.add("New Anecdote");
	res.end("Added new anecdote");
}
function updateAnecdote(req,res) {
	AnecdotesModel.update("Updated Anecdote");
	res.end("Updated anecdote");
}
function removeAnecdote(req,res) {
	AnecdotesModel.remove("Anecdote ID to be removed");
	res.end("Removed Anecdote");
}

module.exports = {
	addAnecdote,
	updateAnecdote,
	removeAnecdote
}