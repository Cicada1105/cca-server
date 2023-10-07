/*
	File for handling repetitive API tasks
*/
// Require filesystem to help read from files
const fs = require("fs");
const { v4: uuid } = require('uuid');

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

function convertToImage({ fileType, data }) {
	let imgSouceAsBuffer = Buffer.from(data, 'base64');
	let newFileName = `${uuid()}.${fileType}`;
	let fileNamePath = `${process.cwd()}/assets/imgs`;

	fs.writeFileSync( `${fileNamePath}/${newFileName}`, imgSouceAsBuffer );

	return newFileName;
}
function removeImage(imgFileName) {
	let fileName = imgFileName.split(".")[0];
	let fileType = imgFileName.split(".")[1];

	let assetImgsDir = `${process.cwd()}/assets/imgs`;
	let imgFiles = fs.readdirSync( assetImgsDir, { withFileTypes: true });

	imgFiles.forEach( file => {
		let currFileName = file.name.split(".")[0];
		if (currFileName === fileName)
			fs.unlinkSync( assetImgsDir + `/${fileName}.${fileType}`);
	});
}

module.exports = {
	getBodyData, writeToFile, 
	convertToImage, removeImage
}