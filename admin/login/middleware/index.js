/*
	This file holds the middleware functions for handling
	login functionality to abstract concerns
*/
// Require fs for retrieving public key
const fs = require("fs");
// Require jsonwebtoken to handle protected routes
const jwt = require("jsonwebtoken");

// Import method for retrieving token from url
const { getTokenFromURL } = require("../../utils.js");

function createToken(payload) {
	return new Promise(async (resolve, reject) => {
		// Retrieve certificate
		const cert = getCertificate();

		await jwt.sign({...payload}, cert, (err,token) => {
			err ? reject(err) : resolve(token); // Toekn specific to user defined in "payload"
		})	
	})
}

function verifyToken(req) {
	return new Promise((resolve,reject) => {
		// Get token from url
		const token = getTokenFromURL(req);
		// Retrieve certificate
		const cert = getCertificate();

		jwt.verify(token, cert, (err, decode) => {
			err ? reject(err) : resolve(decode); // Verified token
		})
	})
}

function getCertificate() {
	// Retrieve file containing public key
	const fileBuffer = fs.readFileSync("./admin/login/public.pem");
	// Convert array buffer to a readable stream of text
	const fileData = fileBuffer.toString();
	// Split up file into an array by delimiting newlines
	let splitData = fileData.split("\n");
	// Slice out only the public key
	let slicedCert = splitData.slice(1,2);
	// Extract out certificate from array
	let cert = slicedCert[0];
	// Return certificate
	return cert;
}

module.exports = {
	createToken, verifyToken
}