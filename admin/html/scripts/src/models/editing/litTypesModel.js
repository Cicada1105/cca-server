/* 
	File for interacting directly with editting data
		Methods will make request to admin api that has access to the following CRUD methods:
		ADD
		UPDATE
		REMOVE

		Note: 	GET is "handled" by compiling the PUG templates and passing in
				the data as parameters to be rendered to the screen
*/

// Development server
//const server = "http://localhost:2020/cca-admin-api/editing/literature_types";
// Production server
const server = "https://cca-server.herokuapp.com/cca-admin-api/editing/literature_types";

/*
	Fuure Add documentation
*/
function add({ type, genres, rates: { standard_proofreading, developmental_editing, both }}) {
	return new Promise((resolve,reject) => {
		fetch(server,{
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify({
				type,
				genres,
				rates: {
					standard_proofreading,
					developmental_editing,
					both
				}
			})
		}).then(response => {
			response.json().then(data => 
				resolve({
					msg: data.msg,
					status: response.status
				})
			)
		}).catch(err =>
			reject({
				msg: err,
				status: err.status
			})
		)
	});
}
/*
	Future Edit documentation
*/
function edit(updatedLitType) {
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

export { add, edit, remove }