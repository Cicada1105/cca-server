/*
	File for handling loin and control panel for cca-admin server
*/

// Import pug 
const pug = require('pug');
// Import cca-admin-api router to handle differing protected requests
const ADMIN_API = require("./api/");
// Import fs to handle file calls
const fs = require("fs");

// Data file paths to be read sent to control panel template to be updated
const editingPath = './site_data/editing.json';
const performancesPath = './site_data/performance.json';
const reedmakingPath = './site_data/reedmaking.json';

const SERVER_URL = "http://localhost:8080";

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
	else if (req.url === "/cca-admin-control-panel") {
		if (loggedIn) {
			fn = pug.compileFile(`${__dirname}/html/templates/control_panel.pug`);

			res.writeHead(200, {
				"Content-Type":"text/html"
			});

			let performancesBuffer = fs.readFileSync(performancesPath);
			let performancesJSON = performancesBuffer.toString();
			let performances = JSON.parse(performancesJSON);

			res.end(
				fn({
					...performances
				})
			);
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
	else 
		res.end("Unable to find resource");
}

module.exports = {
	Router
}