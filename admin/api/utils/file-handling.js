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

function removeFileExtension( file ) {
	// Split file name by '.' to locate extension
	let fileNameComponents = file.split('.');
	// Remove only the extension (Account for names possibly with additionl periods)
	let fileExtension = fileNameComponents.splice(-1)[0];
	// Join remaining name of file by understcore
	let fileName = fileNameComponents.join('.');

	return { fileName, fileExtension };
}

module.exports = { 
	writeToFile, removeFileExtension 
}