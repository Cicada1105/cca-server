/*
	File for handling repetitive API tasks
*/
// Require utiltiy functions from other files
// 	File handling 
const { writeToFile, convertToImage, removeImage } = require('./file-handling.js');
//	Dropbox
const {
	uploadDropboxImage, createSharedLink, 
	stringToOctetStream, makeDropboxRequest
} = require('./dropbox.js');

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


module.exports = {
	writeToFile, convertToImage, removeImage,
	uploadDropboxImage, createSharedLink, 
	stringToOctetStream, makeDropboxRequest,
	getBodyData
}