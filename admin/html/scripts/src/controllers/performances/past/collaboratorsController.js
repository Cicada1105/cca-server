// Controller for connecting collaborator view to collaborator model

// Require collaborator model
import * as Collaborators from '../../../models/performances/past/collaboratorsModel.js';

// Require callback functions shared by all controllers
import { successCallback, failedCallback } from '../../utils.js';
/*
	Future addCollaborator documentation
*/
function addCollaborator(event) {
	let controlsCont = event.path[2];
	let form = controlsCont.previousElementSibling;
	let formEls = form.elements;

	let file = formEls["imgFile"].files[0]
	let imgAlt = file.name;
	// Convert file to array buffer to be sent and stored in request
	let myReader = new FileReader();
	myReader.readAsDataURL(file);
	myReader.onloadend = function() {
		let newCollaborator = {
			name: formEls["name"].value,
			title: formEls["title"].value,
			img: {
				src: myReader.result,
				alt: imgAlt
			}
		}

		Collaborators.add(newCollaborator).then(successCallback).catch(failedCallback);
	}
}
/*
	Future updateCollaborator documentation
*/
function updateCollaborator(event) {
	Collaborators.update("Updating collaborator").then(successCallback).catch(failedCallback);
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