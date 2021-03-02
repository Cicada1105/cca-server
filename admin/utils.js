/*
	This file contains utility functions for across admin
*/
// Require filesystem to help read from files
const fs = require("fs");

function getTokenFromURL(req) {
	// Create new url based on request
	let newURL = new URL(`http://${req.host}${req.url}`);
	// Return search parameters of url
	let searchParams = newURL.searchParams;
	// Retrieve token from search parameters
	let token = searchParams.get("token");
	// Return token
	return token;
}

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
	getTokenFromURL, getFileData
}