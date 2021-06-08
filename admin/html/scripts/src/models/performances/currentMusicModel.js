/* 
	File for interacting directly with current music data
		Methods will make request to admin api that has access to the following CRUD methods:
		ADD
		UPDATE
		REMOVE

		Note: 	GET is "handled" by compiling the PUG templates and passing in
				the data as parameters to be rendered to the screen
*/

// Development
//const SERVER_URL = "http://localhost:2020/cca-admin-api/performance/present";
// Production
const SERVER_URL = 'https://cca-server.herokuapp.com/cca-admin-api/performance/present';

/*
	Future add documentation
*/
function add({ name, by, description }) {
	return new Promise((resolve, reject) => {
		// Make request to server, passig in proper method, headers and body data
		fetch(SERVER_URL, {
			method: "POST",
			headers: {
				"Content-Type":"application/json"
			},
			body: JSON.stringify({ 
				name,
				by,
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
function edit({ id, name, by, description }) {
	return new Promise((resolve, reject) => {
		// Make request to server, passig in proper method, headers and body data
		fetch(SERVER_URL, {
			method: "PUT",
			headers: {
				"Content-Type":"application/json"
			},
			body: JSON.stringify({
				id,
				name,
				by,
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
function remove(songID) {
	return new Promise((resolve, reject) => {
		// Make request to server, passig in proper method, headers and body data
		fetch(SERVER_URL, {
			method: "DELETE",
			headers: {
				"Content-Type":"application/json"
			},
			body: JSON.stringify({ id: songID })
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