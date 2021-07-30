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

const SERVER_URL = "http://localhost:2020/cca-admin-api/reedmaking/rate";

/*
	Future Add documentation
*/
function add({ reedID, pricing: { quantity, cost } }) {
	return makeRequest(
		SERVER_URL,
		"POST",
		{
			reedID,
			pricing: {
				quantity,
				cost
			}
		}
	)
}
/*
	Future update documentation
*/
function update({ reedID, pricing: { id, quantity, cost }}) {
	return makeRequest(
		SERVER_URL,
		"PUT",
		{ 
			reedID,
			pricing: {
				id,
				quantity,
				cost
			}
		}
	)
}
/*
	Future Remove documentation
*/
function remove({ reedID, pricingID }) {
	return makeRequest(
		SERVER_URL,
		"DELETE",
		{ 
			reedID, 
			pricingID
		}
	)
}

export { add, update, remove }