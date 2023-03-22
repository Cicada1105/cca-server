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

const REEDMAKING_DESCRIPTION_PATH = "/cca-admin-api/reedmaking/reed/description";

/*
	Future Add documentation
*/

/*
	Future update documentation
*/
function update({ id, description }) {
	return makeRequest(
		REEDMAKING_DESCRIPTION_PATH,
		"PUT",
		{
			id,
			description
		}
	)
}
/*
	Future Remove documentation
*/

export { update }