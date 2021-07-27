/* 
	File for interacting directly with past performance data
		Methods will make request to admin api that has access to the following CRUD methods:
		ADD
		UPDATE
		REMOVE

		Note: 	GET is "handled" by compiling the PUG templates and passing in
				the data as parameters to be rendered to the screen
*/
// Imports
import makeRequest from '../../request';

const SERVER_URL = "http://localhost:2020/cca-admin-api/performance/past";

/*
	Future add documentation
*/
function add({ name, description, location, instruments, date, img:{ src, alt }}) {
	return makeRequest(
		SERVER_URL,
		"POST",
		{
			name,
			description,
			location,
			instruments,
			date,
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
function update({ id, name, description, location, instruments, date, img:{ src, alt }}) {
	return makeRequest(
		SERVER_URL,
		"PUT",
		{
			id,
			name, description, location,
			instruments,
			date,
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
function remove(performanceID) {
	return makeRequest(
		SERVER_URL,
		"DELETE",
		{ id: performanceID }
	)
}

export { add, update, remove }