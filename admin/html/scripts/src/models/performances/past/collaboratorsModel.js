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

const COLLABORATORS_PATH = "/cca-admin-api/performance/past/collaborators";

/*
	Future add documentation
*/
function add({ name, title, description, img: { src, alt }}) {
	return makeRequest(
		COLLABORATORS_PATH,
		"POST",
		{
			name,
			title,
			description,
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
function update({ id, name, title, description, img: { src, alt }}) {
	return makeRequest(
		COLLABORATORS_PATH,
		"PUT",
		{
			id,
			name,
			title,
			description,
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
		COLLABORATORS_PATH,
		"DELETE",
		{ id: collaboratorID }
	)
}

export { add, update, remove }