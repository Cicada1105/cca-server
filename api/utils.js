/*
	This file contains utility functions for across the general api
*/

// import file system
const fs = require('fs');

function getFileData(file) {
	// Retrieve buffer stream from passed in file
	const buffer = fs.readFileSync(file);
	// Convert buffer into a readable string
	const json = buffer.toString();
	// Parse string to convert to json
	const data = JSON.parse(json);
	// Return data
	return data;
}

module.exports = {
	getFileData
}