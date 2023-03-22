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

const GENRES_PATH = "/cca-admin-api/editing/genres";

/*
	Fuure Add documentation
*/
function add({ litID, display, value }) {
	return makeRequest(
		GENRES_PATH,
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
		GENRES_PATH,
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
		GENRES_PATH,
		"DELETE",
		{
			litID,
			genreID
		}
	)
}

export { add, update, remove }