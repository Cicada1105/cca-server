/*
	File for handling loin and control panel for cca-admin server
*/

const url = require('url');
// Import pug 
const pug = require('pug');
// Import cca-admin-api router to handle differing protected requests
const ADMIN_API = require("./api/");
const ADMIN_CONTROL_PANEL = require("./html/templates/control_panel/");
const ADMIN_LOGIN = require("./login/");

// Import middleware for checking if user has access to admin control panel
const { verifyToken } = require("./login/middleware/");
// Import function for handling retrieving access token
const { 
	startAuthorization, generateToken, 
	compareState, getCookie 
} = require('./utils');

// Server link
const SERVER_URL = process.env.SERVER_URL;

/*
	Redirect

	fn = pug.compileFile(`${__dirname}/html/templates/login.pug`);
	// If user is not logged, redirect to login screen
	res.writeHead(301, {"Location":`${SERVER_URL}/cca-admin-login`});
	res.end();
*/

function Router(req,res) {
	if (req.url.startsWith("/cca-admin-login")) {
		// If login token is already present, no need to sign in again
		if ( getCookie('token', req) ) {
			if ( getCookie('db_token', req) ) {
				res.setHeader('Location', `${SERVER_URL}/cca-admin-control-panel`);
				res.writeHead( 302 );
				res.end();	
			}
			else {
				startAuthorization(req,res);
			}
		}
		else {
			ADMIN_LOGIN.Router(req,res);	
		}
	}
	// Handle if trying to get to panel w/out logging in
	else if (req.url.startsWith("/cca-admin-control-panel")) { // Protected Route
		verifyToken(req).then((user) => {
			// Check if dropbox access token is present in header
			if ( getCookie('db_token',req) ) {
				ADMIN_CONTROL_PANEL.Router(req,res);
			}
			else {
				startAuthorization(req,res);
			}
		}).catch((err) => {
			res.writeHead(301,{"Location":`${SERVER_URL}/cca-admin-login`});
			res.end();
		})
	}
	// Handle if trying to access cca-admin-api w/out logging in
	else if (req.url.startsWith("/cca-admin-api"))
		if ( getCookie('db_token', req) ) {
			ADMIN_API.Router(req,res);	
		}
		else {
			res.writeHead( 400 );
			res.end(
				JSON.stringify({ 
					err: 'No Dropbox token present' 
				})
			);
		}
	else if (req.url.startsWith('/cca-admin-authorize')) {
		let url = new URL(`${process.env.SERVER_URL}${req.url}`);
		let searchParams = url.searchParams;
		let code = searchParams.get('code');
		let state = searchParams.get('state');

		if ( getCookie('db_token',req) ) {
			// Dropbox token already exists, redirect back to control panel
			res.setHeader('Location',`${process.env.SERVER_URL}/cca-admin-control-panel`);
			res.writeHead( 301 );
		}
		else if ( code && compareState(state) ) {
	  	generateToken(req,res);
		}
		else {
			startAuthorization(req,res);
		}
	}
	else {
		res.writeHead(404,{
			"Content-Type":"text/strings"
		});
		res.end("Unable to find resource");
	}
}

module.exports = {
	Router
}