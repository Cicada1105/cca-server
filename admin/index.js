/*
	File for handling loin and control panel for cca-admin server
*/

// Import pug 
const pug = require('pug');
// Import data to be sent to control panel template to be updated
const EDITING = require('../site_data/editing.json');
const PERFORMANCE = require('../site_data/performance.json');
const REEDMAKING = require('../site_data/reedmaking.json');
// Import cca-admin-api router to handle differing protected requests
const ADMIN_API = require("./api/");

function Router(req,res) {
	const loggedIn = true;
	let fn;
	if (req.url === "/cca-admin-login") {
		fn = pug.compileFile(`${__dirname}/templates/login.pug`);

		res.writeHead(200, {
			"Content-Type":"text/html"
		});

		res.end(fn({
			user:"Josh"
		}));
	}
	// Handle if trying to get to panel w/out logging in
	else if ((req.url === "/cca-admin-control-panel") && (loggedIn)) {
		fn = pug.compileFile(`${__dirname}/html/templates/control_panel.pug`);

		res.writeHead(200, {
			"Content-Type":"text/html"
		});

		res.end(fn(PERFORMANCE));
	}
	// Handle if trying to access cca-admin-api w/out logging in
	else if ((req.url.startsWith("/cca-admin-api")) && (loggedIn)) {
		ADMIN_API.Router(req,res);
	}
	else 
		res.end("Unable to find resource");
}

module.exports = {
	Router
}