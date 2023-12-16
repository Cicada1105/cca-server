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

const PAST_PERFORMANCES_PATH = "/cca-admin-api/performance/past";

/*
	Future add documentation
*/
function add({ name, description, location, instruments, date, img:{ fileName, fileExtension, data }}) {
	return makeRequest(
		PAST_PERFORMANCES_PATH,
		"POST",
		{
			name,
			description,
			location,
			instruments,
			date,
			img: {
				fileName,
				fileExtension,
				data
			}
		}
	)
}
/*
	Future update documentation
*/
function update({ id, name, description, location, instruments, date, img:{ fileName, fileType, data }}) {
	return makeRequest(
		PAST_PERFORMANCES_PATH,
		"PUT",
		{
			id,
			name, description, location,
			instruments,
			date,
			img: {
				fileName,
				fileType,
				data
			}
		}
	)
}
/*
	Future remove documentation
*/
function remove(performanceID) {
	return makeRequest(
		PAST_PERFORMANCES_PATH,
		"DELETE",
		{ id: performanceID }
	)
}

export { add, update, remove }