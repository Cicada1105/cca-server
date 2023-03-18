/* 
	File for interacting directly with collaborators data
		Methods will make request to admin api that has access to the following CRUD methods:
		ADD
		UPDATE
		REMOVE

		Note: 	GET is "handled" by compiling the PUG templates and passing in
				the data as parameters to be rendered to the screen
*/
// Imports
import makeRequest from '../../request';

const SERVER_URL = "https://cca-server.onrender.com/cca-admin-api/performance/past/collaborators";

/*
	Future add documentation
*/
function add({ name, title, img: { src, alt }}) {
	return makeRequest(
		SERVER_URL,
		"POST",
		{
			name,
			title,
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
function update({ id, name, title, img: { src, alt }}) {
	return makeRequest(
		SERVER_URL,
		"PUT",
		{
			id,
			name,
			title,
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
function remove(collaboratorID) {
	return makeRequest(
		SERVER_URL,
		"DELETE",
		{ id: collaboratorID }
	)
}

export { add, update, remove }