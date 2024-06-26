/*
	This file holds the middleware functions for handling
	login functionality to abstract concerns
*/
// Require fs for retrieving public key
const fs = require("fs");
// Require jsonwebtoken to handle protected routes
const jwt = require("jsonwebtoken");

// Import method for retrieving token
const { getCookie } = require("../../utils");

function createToken(payload) {
	return new Promise(async (resolve, reject) => {
		// Retrieve certificate
		const cert = fs.readFileSync(process.env.PRIVATE_KEY_PATH);

		await jwt.sign(payload, cert, { algorithm: 'RS256' }, (err,token) => {
			err ? reject(err) : resolve(token); // Toekn specific to user defined in "payload"
		});
	})
}

function verifyToken(req) {
	return new Promise((resolve,reject) => {
		// Get cookie token
		const token = getCookie('token', req);
		// Retrieve certificate
		const cert = fs.readFileSync(process.env.PUBLIC_KEY_PATH);

		jwt.verify(token, cert, { algorithm: 'RS256' }, (err, decode) => {
			err ? reject(err) : resolve(decode); // Verified token
		})
	})
}

module.exports = {
	createToken, verifyToken
}