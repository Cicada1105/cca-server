/* 
	File for interacting directly with reedmaking data
		Methods will make request to admin api that has access to the following CRUD methods:
		ADD
		UPDATE
		REMOVE

		Note: 	GET is "handled" by compiling the PUG templates and passing in
				the data as parameters to be rendered to the screen
*/

const SERVER_URL = "http://localhost:2020/cca-admin-api/reedmaking";

/*
	Future Add documentation
*/

/*
	Future Edit documentation
*/
function edit(description) {
	return new Promise((resolve,reject) => {
		resolve({
			msg: `Successfully editted reed description: ${description}`,
			status: 200
		});
		/*fetch(SERVER_URL, {
			method: "PUT",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify({
				id,
				name,
				description,
				pricing
			})
		}).then(response => {
			response.json().then(data => {
				resolve({
					msg: data["msg"],
					status: response.status
				})
			}).catch(err => {
				reject({
					msg: err,
					status: err.status
				})
			})
		})*/
	})
}
/*
	Future Remove documentation
*/

export { edit }