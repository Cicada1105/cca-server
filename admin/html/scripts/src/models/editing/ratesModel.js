/* 
	File for interacting directly with editting data
		Methods will make request to admin api that has access to the following CRUD methods:
		ADD
		UPDATE
		REMOVE

		Note: 	GET is "handled" by compiling the PUG templates and passing in
				the data as parameters to be rendered to the screen
*/
import makeRequest from '../request';

const SERVER_URL = "https://cca-server.onrender.com/cca-admin-api/editing/rates";

/*
	Fuure Add documentation
*/
function add({ litID, editingType, min, max, perHour, perWord, flatRate }) {
	return makeRequest(
		SERVER_URL,
		"POST",
		{
			litID,
			editingType,
			min,
			max,
			perHour,
			perWord,
			flatRate
		}
	)
}
/*
	Future update documentation
*/
function update({ litID, editingType, rateID, min, max, perHour, perWord, flatRate }) {
	return makeRequest(
		SERVER_URL,
		"PUT",
		{
			litID, 
			editingType, 
			rateID,
			min,
			max, 
			perHour, 
			perWord, 
			flatRate
		}
	)
}
/*
	Future Remove documentation
*/
function remove({litID, editingType, rateID}) {
	return makeRequest(
		SERVER_URL,
		"DELETE",
		{
			litID,
			editingType,
			rateID
		}
	)
}

export { add, update, remove }