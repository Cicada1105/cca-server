/* 
	File for interacting directly with editting data
		Methods will make request to admin api that has access to the following CRUD methods:
		ADD
		UPDATE
		REMOVE

		Note: 	GET is "handled" by compiling the PUG templates and passing in
				the data as parameters to be rendered to the screen
*/

const SERVER_URL = "http://localhost:2020/cca-admin-api/editing/genres";

/*
	Fuure Add documentation
*/
function add({ litID, display, value }) {
	return new Promise((resolve,reject) => {
		fetch(SERVER_URL,{
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify({
				litID,
				display,
				value
			})
		}).then(response => {
			response.json().then(data => 
				resolve({
					msg: data.msg,
					status: response.status
				})
			)
		}).catch(err => {
			reject({
				msg: err,
				status: err.status
			})
		})
	});
}
/*
	Future Edit documentation
*/
function edit(updatedGenre) {
	return new Promise((resolve,reject) => {
		resolve({
			status:200,
			msg:`Updating the following genre: ${updatedGenre}`
		});
	});
}
/*
	Future Remove documentation
*/
function remove({litID, genreID}) {
	return new Promise((resolve,reject) => {
		fetch(SERVER_URL,{
			method: "DELETE",
			headers: {
				"Content-Type":"application/json"
			},
			body: JSON.stringify({
				litID,
				genreID
			})
		}).then(response =>
			response.json().then(data =>
				resolve({
					msg: data.msg,
					status: response.status	
				})
			)
		).catch(err =>
			reject({
				msg: err.message,
				satus: err.status
			})
		)
	});
}

export { add, edit, remove }