// Controller for connecting anecdote view to anecdote model

// Require anecdote model
import * as Anecdotes from '../../../models/performances/past/anecdotesModel.js';

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
	// Convert file to array buffer to be sent and stored in request
	let myReader = new FileReader();
	myReader.readAsArrayBuffer(file);
	myReader.onloadend = function() {
		let buffer = myReader.result;
		let uInt8ArrayBuffer = new Uint8Array( buffer );
		let bufferValues = Object.values(uInt8ArrayBuffer);

		let newAnecdote = {
			name: formEls["name"].value,
			title: formEls["title"].value,
			anecdote: formEls["anecdote"].value,
			img: {
				newFileName: file.name,
				data: bufferValues
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
		// Convert file to array buffer to be sent and stored in request
		let myReader = new FileReader();
		myReader.readAsArrayBuffer(file);
		myReader.onloadend = function() {
			let buffer = myReader.result;
			let uInt8ArrayBuffer = new Uint8Array(buffer);
			let bufferValues = Object.values(uInt8ArrayBuffer);

			updatedAnecdote.img = {
				oldFileName: event.target.dataset['image'],
				newFileName: file.name,
				data: bufferValues
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
	let id = event.target.dataset['id'];
	let oldFileName = event.target.dataset['image'];	

	let anecdoteToRemove = {
		id,
		oldFileName
	};

	Anecdotes.remove(anecdoteToRemove).then(successCallback).catch(failedCallback);
}

export { addAnecdote, updateAnecdote, removeAnecdote }