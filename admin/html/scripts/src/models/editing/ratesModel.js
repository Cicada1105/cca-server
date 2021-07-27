/* 
	File for interacting directly with editting data
		Methods will make request to admin api that has access to the following CRUD methods:
		ADD
		UPDATE
		REMOVE

		Note: 	GET is "handled" by compiling the PUG templates and passing in
				the data as parameters to be rendered to the screen
*/

const SERVER_URL = "http://localhost:2020/cca-admin-api/editing/rates";

/*
	Fuure Add documentation
*/
function add({ litID, editingType, min, max, perHour, perWord, flatRate }) {
	return new Promise((resolve,reject) => {
		fetch(SERVER_URL,{
			method:"POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify({
				litID,
				editingType,
				min,
				max,
				perHour,
				perWord,
				flatRate
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
		);
	});
}
/*
	Future update documentation
*/
function update({ litID, editingType, rateID, min, max, perHour, perWord, flatRate }) {
	return new Promise((resolve,reject) => {
		fetch(SERVER_URL,{
			method: "PUT",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify({
				litID, 
				editingType, 
				rateID,
				min,
				max, 
				perHour, 
				perWord, 
				flatRate
			})
		}).then(response => {
			response.json().then(data => {
				resolve({
					msg: data.msg,
					status: response.status
				})
			})
		}).catch(err =>
			reject({
				msg: err,
				status: err.status
			})
		);
	});
}
/*
	Future Remove documentation
*/
function remove({litID, editingType, rateID}) {
	return new Promise((resolve,reject) => {
		fetch(SERVER_URL,{
			method: "DELETE",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify({
				litID,
				editingType,
				rateID
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
				msg: err,
				status: err.status
			})
		);
	});
}

export { add, update, remove }