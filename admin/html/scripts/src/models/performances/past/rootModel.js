/* 
	File for interacting directly with past performance data
		Methods will make request to admin api that has access to the following CRUD methods:
		ADD
		UPDATE
		REMOVE

		Note: 	GET is "handled" by compiling the PUG templates and passing in
				the data as parameters to be rendered to the screen
*/

const SERVER_URL = "http://localhost:2020/cca-admin-api/performance/past";

/*
	Future add documentation
*/
function add({ name, description, location, instruments, date, img:{ src, alt }}) {
	return new Promise((resolve, reject) => {
		// Make request to server, passig in proper method, headers and body data
		fetch(SERVER_URL, {
			method: "POST",
			headers: {
				"Content-Type":"application/json"
			},
			body: JSON.stringify({ 
				name,
				description,
				location,
				instruments,
				date,
				img: {
					src,
					alt
				}
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
	Future update documentation
*/
function update({ id, name, description, location, instruments, date, img:{ src, alt }}) {
	// { id, name, description, location, instruments, date, img:{ src, alt }}
	return new Promise((resolve, reject) => {
		// Make request to server, passig in proper method, headers and body data
		fetch(SERVER_URL, {
			method: "PUT",
			headers: {
				"Content-Type":"application/json"
			},
			body: JSON.stringify({
				id,
				name, description, location,
				instruments,
				date,
				img: {
					src,
					alt
				}
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
		fetch(SERVER_URL, {
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

export { add, update, remove }