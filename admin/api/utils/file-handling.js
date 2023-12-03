/*
	Utility file for file handling operations
*/
// Require filesystem to help read from files
const fs = require("fs");
const { v4: uuid } = require('uuid');

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
	let assetImgsDir = `${process.cwd()}/assets/imgs`;

	let imgFiles = fs.readdirSync( assetImgsDir, { withFileTypes: true });

	imgFiles.forEach( file => {
		if (file.name === imgFileName)
			fs.unlinkSync( assetImgsDir + `/${imgFileName}`);
	});
}

module.exports = { writeToFile, convertToImage, removeImage }