/* 
	File for interacting directly with current music data
		Methods will make request to admin api that has access to the following CRUD methods:
		ADD
		UPDATE
		REMOVE

		Note: 	GET is "handled" by compiling the PUG templates and passing in
				the data as parameters to be rendered to the screen
*/
import makeRequest from '../request';

const SERVER_URL = "https://cca-server.onrender.com/cca-admin-api/performance/present";

/*
	Future add documentation
*/
function add({ name, by, description }) {
	return makeRequest(
		SERVER_URL,
		"POST",
		{
			name,
			by,
			description
		}
	)
}
/*
	Future update documentation
*/
function update({ id, name, by, description }) {
	return makeRequest(
		SERVER_URL,
		"PUT",
		{
			id,
			name,
			by,
			description
		}
	)
}
/*
	Future remove documentation
*/
function remove(songID) {
	return makeRequest(
		SERVER_URL,
		"DELETE",
		{ id: songID }
	)
}

export { add, update, remove }