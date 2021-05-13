// Controller for connecting anecdote view to anecdote model

// Require anecdote model
import * as Anecdotes from '../../../models/performances/past/anecdotesModel.js';

// Require callback functions shared by all controllers
import { successCallback, failedCallback } from '../../utils.js';
/*
	Future addAnecdote documentation
*/
function addAnecdote(event) {
	let controlsCont = event.path[2];
	let form = controlsCont.previousElementSibling;
	let formEls = form.elements;

	let file = formEls["imgFile"].files[0];
	let imgAlt = file.name;
	// Convert file to array buffer to be sent and stored in request
	let myReader = new FileReader();
	myReader.readAsDataURL(file);
	myReader.onloadend = function() {
		let newAnecdote = {
			name: formEls["name"].value,
			title: formEls["title"].value,
			anecdote: formEls["anecdote"].value,
			img: {
				src: myReader.result,
				alt: imgAlt
			}
		}

		Anecdotes.add(newAnecdote).then(successCallback).catch(failedCallback);
	}
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