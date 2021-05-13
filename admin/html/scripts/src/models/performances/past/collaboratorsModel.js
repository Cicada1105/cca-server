/* 
	File for interacting directly with collaborators data
		Methods will make request to admin api that has access to the following CRUD methods:
		ADD
		UPDATE
		REMOVE

		Note: 	GET is "handled" by compiling the PUG templates and passing in
				the data as parameters to be rendered to the screen
*/

// Development server
const server = "http://localhost:2020/cca-admin-api/performance/past/collaborators";
// Production server
//const server = "https://cca-server.herokuapp.com/cca-admin-api/performance/past/collaborators";

/*
	Future add documentation
*/
function add({ name, title, img: { src, alt } }) {
	return new Promise((resolve,reject) => {
		fetch(server, {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify({
				name,
				title,
				img: {
					src,
					alt
				}
			})
		}).then(response => {
			response.json().then(data => {
				resolve({
					msg: data.msg,
					status: response.status
				});	
			})
		}).catch(err => {
			reject({
				msg: err,
				status: err.status
			})
		})
	})
}
/*
	Future update documentation
*/
function update(collaborator) {
	// { id, name, title, img: { src, alt } }
	return new Promise((resolve,reject) => {
		fetch(server, {
			method: "PUT",
			headers: {
				"Content-Type": "application/json"
			}/*,
			body: JSON.stringify({
				id,
				name,
				title,
				img: {
					src,
					alt
				}
			})*/
		}).then(response => {
			response.json().then(data => {
				resolve({
					msg: data.msg,
					status: response.status
				});	
			})
		}).catch(err => {
			reject({
				msg: err,
				status: err.status
			})
		})
	})
}
/*
	Future remove documentation
*/
function remove(collaboratorID) {
	return new Promise((resolve,reject) => {
		fetch(server, {
			method: "DELETE",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify({ id: collaboratorID })
		}).then(response => {
			response.json().then(data => {
				resolve({
					msg: data.msg,
					status: response.status
				})
			})
		}).catch(err => {
			reject({
				msg: err,
				status: err.status
			})
		})
	})
}

export { add, update, remove }