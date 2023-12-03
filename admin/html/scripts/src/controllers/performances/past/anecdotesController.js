// Controller for connecting anecdote view to anecdote model

// Require anecdote model
import * as Anecdotes from '../../../models/performances/past/anecdotesModel.js';

// Import utility functions
import { removeFileExtension } from '../../utils.js';
// Require callback functions shared by all controllers
import { successCallback, failedCallback } from '../../utils.js';
/*
	Future addAnecdote documentation
*/
function addAnecdote(event) {
	let path = event.composedPath();
	let controlsCont = path[2];
	let form = controlsCont.previousElementSibling;
	let formEls = form.elements;

	let file = formEls["imgFile"].files[0];
	let { fileName, fileExtension } = removeFileExtension(file.name);
	// Convert file to array buffer to be sent and stored in request
	let myReader = new FileReader();
	myReader.readAsArrayBuffer(file);
	myReader.onloadend = function() {
		let newAnecdote = {
			name: formEls["name"].value,
			title: formEls["title"].value,
			anecdote: formEls["anecdote"].value,
			img: {
				fileName,
				fileExtension,
				data: String.fromCharCode.apply(null, new Uint8Array(myReader.result))
			}
		}

		Anecdotes.add(newAnecdote).then(successCallback).catch(failedCallback);
	}
}
/*
	Future updateAnecdote documentation
*/
function updateAnecdote(event) {
	let path = event.composedPath();
	let controlsCont = path[2];
	let form = controlsCont.previousElementSibling;
	let formEls = form.elements;

	// Retrieve unique ID associated with anecdote
	let id = event.target.dataset["id"];

	// Store known data
	let updatedAnecdote = {
		id,
		name: formEls["name"].value,
		title: formEls["title"].value,
		anecdote: formEls["anecdote"].value,
		img: { }
	}

	// Retrieve image files
	let files = formEls["imgFile"].files;
	// Check if new image was selected
	if (files.length === 1) {
		let file = files[0];
		let fileName = removeFileExtension(file.name);
		// Convert file to array buffer to be sent and stored in request
		let myReader = new FileReader();
		myReader.readAsBinaryString(file);
		myReader.onloadend = function() {
			updatedAnecdote.img = {
				fileName,
				fileType: file.type.split('/')[1],
				data: btoa(myReader.result)
			}

			Anecdotes.update(updatedAnecdote).then(successCallback).catch(failedCallback);
		}
	}
	else
		// No need to wait for fileread, just edit aneccdote
		Anecdotes.update(updatedAnecdote).then(successCallback).catch(failedCallback);
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