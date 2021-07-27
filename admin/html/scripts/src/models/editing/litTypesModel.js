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

const SERVER_URL = "http://localhost:2020/cca-admin-api/editing/literature_types";

/*
	Fuure Add documentation
*/
function add({ type, genres, rates: { standard_proofreading, developmental_editing, both }}) {
	return makeRequest(
		SERVER_URL,
		"POST",
		{
			type,
			genres,
			rates: {
				standard_proofreading,
				developmental_editing,
				both
			}
		}
	)
}
/*
	Future update documentation
*/
function update(updatedLitType) {
	return new Promise((resolve,reject) => {
		resolve({
			status:200,
			msg:`Updating the following literature data: ${updatedLitType}`
		});
	});
}
/*
	Future Remove documentation
*/
function remove(litType) {
	return new Promise((resolve,reject) => {
		resolve({
			status:200,
			msg:`Deleting the following literature data: ${litType}`
		});
	});
}

export { add, update, remove }