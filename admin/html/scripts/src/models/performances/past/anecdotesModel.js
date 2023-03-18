/* 
	File for interacting directly with anecdotes data
		Methods will make request to admin api that has access to the following CRUD methods:
		ADD
		UPDATE
		REMOVE

		Note: 	GET is "handled" by compiling the PUG templates and passing in
				the data as parameters to be rendered to the screen
*/
// Imports
import makeRequest from '../../request';

const SERVER_URL = "https://cca-server.onrender.com/cca-admin-api/performance/past/anecdotes";

/*
	Future add documentation
*/
function add({ name, title, anecdote, img: { src, alt } }) {
	return makeRequest(
		SERVER_URL,
		"POST",
		{
			name,
			title,
			anecdote,
			img: {
				src,
				alt
			}
		}
	)
}
/*
	Future update documentation
*/
function update({ id, name, title, anecdote, img: { src, alt }}) {
	return makeRequest(
		SERVER_URL,
		"PUT",
		{
			id,
			name,
			title,
			anecdote,
			img: {
				src,
				alt
			}
		}
	)
}
/*
	Future remove documentation
*/
function remove(anecdoteID) {
	return makeRequest(
		SERVER_URL,
		"DELETE",
		{ id: anecdoteID }
	)
}

export { add, update, remove }