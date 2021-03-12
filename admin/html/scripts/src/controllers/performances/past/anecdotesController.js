// Controller for connecting anecdote view to anecdote model

// Require anecdote model
import * as Anecdotes from '../../../models/performances/past/anecdotesModel.js';

// Require callback functions shared by all controllers
import { successCallback, failedCallback } from '../../utils.js';
/*
	Future addAnecdote documentation
*/
function addAnecdote(event) {
	Anecdotes.add("Adding Anecdote").then(successCallback).catch(failedCallback);
}
/*
	Future updateAnecdote documentation
*/
function updateAnecdote(event) {
	Anecdotes.update("Updating Anecdote").then(successCallback).catch(failedCallback);
}
/*
	Future removeAnecdote documentation
*/
function removeAnecdote(event) {
	// Get and store id of current anecdote
	let anecdoteID = event.target.dataset["id"];

	Anecdotes.remove(anecdoteID).then(successCallback).catch(failedCallback);
}

export { addAnecdote, updateAnecdote, removeAnecdote }