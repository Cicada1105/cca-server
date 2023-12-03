/*
	Utility file for handling miscelaneous helper functions
*/

function getBodyData(req) {
	return new Promise((resolve,reject) => {
		let response = "";
		req.on("data", (chunk) => response += chunk);

		req.on("end", () => {
			let dataStr = response.toString();
			let body = JSON.parse(dataStr);
			
			resolve(body);
		});
		
		req.on("error", (err) => reject(err));
	})
}

module.exports = { getBodyData }