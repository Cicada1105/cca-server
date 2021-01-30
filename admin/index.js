/*
	File for handling loin and control panel for cca-admin server
*/

// Import pug 
const pug = require('pug');
// Import cca-admin-api router to handle differing protected requests
const ADMIN_API = require("./api/");
const ADMIN_CONTROL_PANEL = require("./html/templates/control_panel/");

// Development
//const SERVER_URL = "http://localhost:8080";
// Production
const SERVER_URL = "https://cca-server.herokuapp.com";

function Router(req,res) {
	const loggedIn = true;
	let fn;
	if (req.url === "/cca-admin-login") {
		fn = pug.compileFile(`${__dirname}/html/templates/login.pug`);

		res.writeHead(200, {
			"Content-Type":"text/html"
		});

		res.end(fn({
			user:"Josh"
		}));
	}
	// Handle if trying to get to panel w/out logging in
	else if (req.url.startsWith("/cca-admin-control-panel")) {
		if (loggedIn) {
			ADMIN_CONTROL_PANEL.Router(req,res);
		}
		else {
			fn = pug.compileFile(`${__dirname}/html/templates/login.pug`);
			// If user is not logged, redirect to login screen
			res.writeHead(301, {"Location":`${SERVER_URL}/cca-admin-login`});
			res.end();
		}
	}
	// Handle if trying to access cca-admin-api w/out logging in
	else if ((req.url.startsWith("/cca-admin-api")) && (loggedIn)) {
		ADMIN_API.Router(req,res);
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