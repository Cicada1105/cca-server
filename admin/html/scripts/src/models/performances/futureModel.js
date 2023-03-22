/* 
	File for interacting directly with future performances data
		Methods will make request to admin api that has access to the following CRUD methods:
		ADD
		UPDATE
		REMOVE

		Note: 	GET is "handled" by compiling the PUG templates and passing in
				the data as parameters to be rendered to the screen
*/
import makeRequest from "../request";

const FUTURE_PERFORMANCES_PATH = "/cca-admin-api/performance/future";

/*
	Future add documentation
*/
function add({ name, location, instruments, date, time: { start, end }, description }) {
	return makeRequest(
		FUTURE_PERFORMANCES_PATH,
		"POST",
		{
			name,
			location,
			instruments,
			date,
			time: {
				start,
				end
			},
			description
		}
	)
}
/*
	Future update documentation
*/
function update({ id, name, location, instruments, date, time: { start, end }, description }) {
	return makeRequest(
		FUTURE_PERFORMANCES_PATH,
		"PUT",
		{
			id,
			name,
			location,
			instruments,
			date,
			time: {
				start,
				end
			},
			description
		}
	)
}
/*
	Future remove documentation
*/
function remove(performanceID) {
	return makeRequest(
		FUTURE_PERFORMANCES_PATH,
		"DELETE",
		{ id: performanceID }
	)
}

export { add, update, remove }