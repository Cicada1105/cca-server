// Controller for connecting collaborator view to collaborator model

// Require collaborator model
import * as Collaborators from '../../../models/performances/past/collaboratorsModel.js';

// Require utility function for removing file extensions
import { removeFileExtension } from '../../utils.js';
// Require callback functions shared by all controllers
import { successCallback, failedCallback } from '../../utils.js';
/*
	Future addCollaborator documentation
*/
function addCollaborator(event) {
	let path = event.composedPath();
	let controlsCont = path[2];
	let form = controlsCont.previousElementSibling;
	let formEls = form.elements;

	let file = formEls["imgFile"].files[0]
	let fileName = removeFileExtension(file.name);
	// Convert file to array buffer to be sent and stored in request
	let myReader = new FileReader();
	myReader.readAsBinaryString(file);
	myReader.onloadend = function() {
		let newCollaborator = {
			name: formEls["name"].value,
			title: formEls["title"].value,
			description: formEls["description"].value,
			img: {
				fileName,
				fileType: file.type.split('/')[1],
				data: btoa(myReader.result)
			}
		}

		Collaborators.add(newCollaborator).then(successCallback).catch(failedCallback);
	}
}
/*
	Future updateCollaborator documentation
*/
function updateCollaborator(event) {
	let path = event.composedPath();
	let controlsCont = path[2];
	let form = controlsCont.previousElementSibling
	let formEls = form.elements;

	// Retrieve unique ID associated with collaborator
	let id = event.target.dataset["id"];

	// Store known data 
	let updatedCollaborator = {
		id,
		name: formEls["name"].value,
		title: formEls["title"].value,
		description: formEls["description"].value,
		img: {
			src: undefined,
			alt: undefined
		}
	}

	// Retrieve image files
	let files = formEls["imgFile"].files;
	// Check if new image was chosen
	if (files.length === 1) { // Create file reader to retrieve file
		let file = files[0];
		let imgAlt = file.name;
		// Convert file to array buffer to be sent and stored in request
		let myReader = new FileReader();
		myReader.readAsDataURL(file);
		myReader.onloadend = function() {
			updatedCollaborator.img["src"] = myReader.result
			updatedCollaborator.img["alt"] = imgAlt;

			Collaborators.update(updatedCollaborator).then(successCallback).catch(failedCallback);
		}
	}
	else
		// No need to wait for fileread, just edit collaborator
		Collaborators.update(updatedCollaborator).then(successCallback).catch(failedCallback);
}
/*
	Future removeCollaborator documentation
*/
function removeCollaborator(event) {
	// Get and store ID of current collaborator
	let collaboratorID = event.target.dataset["id"];

	Collaborators.remove(collaboratorID).then(successCallback).catch(failedCallback);
}

export { addCollaborator, updateCollaborator, removeCollaborator }