/*
	File for handling repetitive API tasks
*/
// Require filesystem to help read from files
const fs = require("fs");

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

function writeToFile(file,data) {
	fs.writeFile(file,data,"utf8",(err) => {
		if (err) throw err;
	});
}

module.exports = {
	getBodyData,
	writeToFile
}