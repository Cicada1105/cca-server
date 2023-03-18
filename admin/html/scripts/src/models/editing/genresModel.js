/* 
	File for interacting directly with editting data
		Methods will make request to admin api that has access to the following CRUD methods:
		ADD
		UPDATE
		REMOVE

		Note: 	GET is "handled" by compiling the PUG templates and passing in
				the data as parameters to be rendered to the screen
*/
// Imports
import makeRequest from '../request';

const SERVER_URL = "https://cca-server.onrender.com/cca-admin-api/editing/genres";

/*
	Fuure Add documentation
*/
function add({ litID, display, value }) {
	return makeRequest(
		SERVER_URL,
		"POST",
		{
			litID,
			display,
			value
		}
	)
}
/*
	Future update documentation
*/
function update({ litID, genreID, display, value }) {
	return makeRequest(
		SERVER_URL,
		"PUT",
		{
			litID,
			genreID,
			display,
			value
		}
	)
}
/*
	Future Remove documentation
*/
function remove({litID, genreID}) {
	return makeRequest(
		SERVER_URL,
		"DELETE",
		{
			litID,
			genreID
		}
	)
}

export { add, update, remove }