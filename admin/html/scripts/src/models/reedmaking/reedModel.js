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

const SERVER_URL = "http://localhost:2020/cca-admin-api/reedmaking/reed/";

/*
	Future Add documentation
*/
function add({ name, description, pricing }) {
	return makeRequest(
		SERVER_URL,
		"POST",
		{
			name,
			description,
			pricing
		}
	)
}
/*
	Future update documentation
*/
/*function update(reed) {

}*/
/*
	Future Remove documentation
*/
function remove({ id }) {
	return makeRequest(
		SERVER_URL,
		"DELETE",
		{ id }
	)
}

export { add, remove }