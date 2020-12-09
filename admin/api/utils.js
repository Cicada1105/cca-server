/*
	File for handling repetitive API tasks
*/

function getBodyData(req) {
	return new Promise((resolve,reject) => {
		let response = ""; // If doesnt work, use: let response = []; then set on("data") callback to response.push(chunk)
		req.on("data", (chunk) => response += chunk);

		req.on("end", () => {
			let dataStr = response.toString();
			let body = JSON.parse(dataStr);
			
			resolve(body);
		});
		
		req.on("error", (err) => reject(err));
	})
}

module.exports = {
	getBodyData
}