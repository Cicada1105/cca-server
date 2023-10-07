/*
	This file is for handling generic request
	to the server made by the front end 
	control panel
*/

const SERVER_URL = "https://cca-server.onrender.com";

export default function makeRequest(path, method, body) {
	return new Promise((resolve,reject) => {
		fetch(`${SERVER_URL}${path}`,{
			method,
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify(body)
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