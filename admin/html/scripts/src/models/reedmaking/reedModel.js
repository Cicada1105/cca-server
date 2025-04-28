/* 
	File for interacting directly with reedmaking data
		Methods will make request to admin api that has access to the following CRUD methods:
		ADD
		UPDATE
		REMOVE

		Note: 	GET is "handled" by compiling the PUG templates and passing in
				the data as parameters to be rendered to the screen
*/
// Imports
import makeRequest from '../request';

const REEDMAKING_PATH = "/cca-admin-api/reedmaking/reed/";

/*
	Future Add documentation
*/
function add({ name, description, image, pricing }) {
	return makeRequest(
		REEDMAKING_PATH,
		"POST",
		{
			name,
			description,
			image,
			pricing
		}
	)
}
/*
	Future update documentation
*/
function update({ id, name, description, pricing }) {
	return makeRequest(
		REEDMAKING_PATH,
		'PUT',
		{
			id,
			name,
			description,
			pricing
		}
	);
}
/*
	Future Remove documentation
*/
function remove({ id }) {
	return makeRequest(
		REEDMAKING_PATH,
		"DELETE",
		{ id }
	)
}

export { add, update, remove }