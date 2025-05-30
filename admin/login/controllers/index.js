/*
	Login controller that interacts with the model and handles setting response data
*/
// Require querystring for encdoing and decoding url search params
const querystring = require("querystring");
// Require login models
const LoginModel = require("../models/");
// Require create token for user logging in
const { createToken } = require("../middleware/");
// Use function for setting cookies
const { setCookie } = require("../../utils");
// Server link
const SERVER = process.env.SERVER_URL;

function login(req,res) {
	// Get user data 
	let urlData = "";
	req.on("data",chunk => {
		urlData += chunk;
	});
	req.on("end",async () => {
		// Take data in form of 'username=[username]&password=[password]' and create new search params
		const params = new URLSearchParams(urlData);
		// Create user object to pass to model
		let user = {
			username: params.get("username"),
			password: params.get("password")
		}
		await LoginModel.isValidUser(user).then((msg) => {
			// Successfully logged in
			// Create json web token
			createToken(user).then(token => {
				// Add token to cookie to expire in one day
				const dayInSeconds = 60 * 60 * 24;
				setCookie('token', token, dayInSeconds, res);

				// Redirect to home page
				res.writeHead(301,{"Location":`${SERVER}/cca-admin-control-panel`});
				res.end();
			}).catch(err => {
				// Error occurred, redirect to login
				res.writeHead(301,{"Location":`${SERVER}/cca-admin-login/`});
				res.end();
			})
		}).catch(err => {
			// Turn error message into a safe, encoded url search parameter 
			let queryString = querystring.stringify(err);

			// Build url with proper error parameter
			let newURL = new URL(`${SERVER}${req.url}?${queryString}`);

			res.writeHead(301,{"Location":newURL});
			res.end();
		})
	})
}

module.exports = {
	login
}