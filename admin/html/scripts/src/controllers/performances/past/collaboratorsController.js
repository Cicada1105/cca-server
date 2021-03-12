// Controller for connecting collaborator view to collaborator model

// Require collaborator model
import * as Collaborators from '../../../models/performances/past/collaboratorsModel.js';

// Require callback functions shared by all controllers
import { successCallback, failedCallback } from '../../utils.js';
/*
	Future addCollaborator documentation
*/
function addCollaborator(event) {
	Collaborators.add("Adding collaborator").then(successCallback).catch(failedCallback);
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