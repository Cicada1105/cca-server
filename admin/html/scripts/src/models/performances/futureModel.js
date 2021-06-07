/* 
	File for interacting directly with future performances data
		Methods will make request to admin api that has access to the following CRUD methods:
		ADD
		UPDATE
		REMOVE

		Note: 	GET is "handled" by compiling the PUG templates and passing in
				the data as parameters to be rendered to the screen
*/

// Server link
const SERVER_URL = `${process.env.SERVER_URL}/cca-admin-api/performance/future`;
//const SERVER_URL = "http://localhost:2020/cca-admin-api/performance/future";

/*
	Future add documentation
*/
function add({ name, location, instruments, date, time: { start, end }, description }) {
	return new Promise((resolve, reject) => {
		// Make request to server, passig in proper method, headers and body data
		fetch(server, {
			method: "POST",
			headers: {
				"Content-Type":"application/json"
			},
			body: JSON.stringify({
				name,
				location,
				instruments,
				date,
				time: {
					start,
					end
				},
				description
			})
		}).then((response) => {
			response.json().then(data => {
				resolve({
					msg: data.msg,
					status: response.status
				});
			});
		}).catch(err => {
			reject({
				msg: err,
				status: err.status
			});
		});	
	})
}
/*
	Future edit documentation
*/
function edit({ id, name, location, instruments, date, time: { start, end }, description }) {
	return new Promise((resolve, reject) => {
		// Make request to server, passig in proper method, headers and body data
		fetch(server, {
			method: "PUT",
			headers: {
				"Content-Type":"application/json"
			},
			body: JSON.stringify({
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
			})
		}).then((response) => {
			response.json().then(data => {
				resolve({
					msg: data.msg,
					status: response.status
				});
			});
		}).catch(err => {
			reject({
				msg: err,
				status: err.status
			});
		});	
	})
}
/*
	Future remove documentation
*/
function remove(performanceID) {
	return new Promise((resolve, reject) => {
		// Make request to server, passig in proper method, headers and body data
		fetch(server, {
			method: "DELETE",
			headers: {
				"Content-Type":"application/json"
			},
			body: JSON.stringify({ id: performanceID })
		}).then((response) => {
			response.json().then(data => {
				resolve({
					msg: data.msg,
					status: response.status
				});
			});
		}).catch(err => {
			reject({
				msg: err,
				status: err.status
			});
		});	
	})
}

export { add, edit, remove }