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
function add(reed) {
	return new Promise((resolve,reject) => {
		resolve({
			msg: `Successfully added new reed: ${reed}`,
			status: 201
		});
		/*fetch(SERVER_URL, {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify({
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
	Future update documentation
*/
function update(reed) {
	return new Promise((resolve,reject) => {
		resolve({
			msg: `Successfully updated reed: ${reed}`,
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
function remove(pricingID) {
	return new Promise((resolve,reject) => {
		resolve({
			msg: `Successfully remove reed with id of: ${pricingID}`,
			status: 200
		});
		/*
		// Make request to server, passig in proper method, headers and body data
		fetch(SERVER_URL, {
			method: "DELETE",
			headers: {
				"Content-Type":"application/json"
			},
			body: JSON.stringify({ id: pricingID })
		}).then(response => {
			let dataJSON = response.json();
			let data = JSON.parse(dataJSON);
			let status = response.status;
			console.log(status);
			console.log(data.msg);
		}).catch(err => {
			console.log(err);
		});
		*/
	});
}

export { add, update, remove }