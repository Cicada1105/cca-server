/*
	File for handling loin and control panel for cca-admin server
*/

// Import pug 
const pug = require('pug');
// Import cca-admin-api router to handle differing protected requests
const ADMIN_API = require("./api/");
const ADMIN_CONTROL_PANEL = require("./html/templates/control_panel/");
const ADMIN_LOGIN = require("./login/");

// Import middleware for checking if user has access to admin control panel
const { verifyToken } = require("./login/middleware/");

// Development
const SERVER_URL = "http://localhost:2020";
// Production
//const SERVER_URL = "https://cca-server.herokuapp.com";

/*
	Redirect

	fn = pug.compileFile(`${__dirname}/html/templates/login.pug`);
	// If user is not logged, redirect to login screen
	res.writeHead(301, {"Location":`${SERVER_URL}/cca-admin-login`});
	res.end();
*/

function Router(req,res) {
	let fn;

	if (req.url.startsWith("/cca-admin-login"))
		ADMIN_LOGIN.Router(req,res);
	// Handle if trying to get to panel w/out logging in
	else if (req.url.startsWith("/cca-admin-control-panel")) { // Protected Route
		verifyToken(req).then((user) => {
			ADMIN_CONTROL_PANEL.Router(req,res);	
		}).catch((err) => {
			console.log(err);
			res.writeHead(301,{"Location":`${SERVER_URL}/cca-admin-login`});
			res.end();
		})
	}
	// Handle if trying to access cca-admin-api w/out logging in
	else if (req.url.startsWith("/cca-admin-api"))
		ADMIN_API.Router(req,res);
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