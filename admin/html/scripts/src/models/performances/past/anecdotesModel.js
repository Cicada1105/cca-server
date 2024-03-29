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

const ANECDOTES_PATH = "/cca-admin-api/performance/past/anecdotes";

/*
	Future add documentation
*/
function add({ name, title, anecdote, img: { newFileName, data } }) {
	return makeRequest(
		ANECDOTES_PATH,
		"POST",
		{
			name,
			title,
			anecdote,
			img: {
				newFileName,
				data
			}
		}
	)
}
/*
	Future update documentation
*/
function update({ id, name, title, anecdote, img: { oldFileName, newFileName, data }}) {
	return makeRequest(
		ANECDOTES_PATH,
		"PUT",
		{
			id,
			name,
			title,
			anecdote,
			img: {
				oldFileName,
				newFileName,
				data
			}
		}
	)
}
/*
	Future remove documentation
*/
function remove({ id, oldFileName }) {
	return makeRequest(
		ANECDOTES_PATH,
		"DELETE",
		{ 
			id,
			oldFileName
		}
	)
}

export { add, update, remove }