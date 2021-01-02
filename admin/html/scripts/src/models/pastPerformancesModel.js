/* 
	File for interacting directly with past performance data
		Methods will make request to admin api that has access to the following CRUD methods:
		ADD
		UPDATE
		REMOVE

		Note: 	GET is "handled" by compiling the PUG templates and passing in
				the data as parameters to be rendered to the screen
*/
// Development server
const server = "http://localhost:8080/cca-admin-api/performance/past";
// Production server
//const server = "https://cca-server.herokuapp.com/cca-admin-api/performance/past"
/*
	Future add documentation
*/
function add({ name, description, img:{ src, alt }}) {
	return new Promise((resolve, reject) => {
		// Make request to server, passig in proper method, headers and body data
		fetch(server, {
			method: "POST",
			headers: {
				"Content-Type":"application/json"
			},
			body: JSON.stringify({ 
				name,
				description,
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
	Future edit documentation
*/
function edit(updatedPerformance) {
	console.log(`Updating performance: ${updatedPerformance}`);
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