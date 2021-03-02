/*
	File for handling pug templating router for cca-admin-control-panel
*/

// Import pug 
const pug = require('pug');

// Import methods for retrieving token from url and file data
const { getTokenFromURL, getFileData } = require("../../../utils.js");

// Import performance router
const PERFORMANCES = require("./pgs/performances/")

// Data file paths to be read sent to control panel template to be updated
const editingPath = './site_data/editing.json';
const reedmakingPath = './site_data/reedmaking.json';

/*
	Routes
	/performance/*
	/editing
	/reedmaking
*/
function Router(req,res) {
	let url = req.url;
	let paths = url.split("/"); // ["","cca-admin-control-panel",...restOfPath,"?token=<token>"]
	// Remove ["","cca-admin-control-panel"] at beginning and ["?token=<token>"} at end && returns [...restOfPath]
	let ctrl_panel_paths = paths.slice(2,paths.length - 1); // ["rest","of","path"]
	let ctrl_panel_url = ctrl_panel_paths.join("/"); // "rest/of/path"

	const CTRL_PANEL_BASE = `${__dirname}/pgs`;
	let fn;
	let buffer, dataJSON, data;
	
	if (ctrl_panel_url.startsWith("performance/")) 
		PERFORMANCES.Router(req,res);
	else if (ctrl_panel_url === "editing") {
		// Define path to editing pug template
		fn = pug.compileFile(`${CTRL_PANEL_BASE}/editing/index.pug`);

		// Retrieve editing data to pass to pug template
		data = getFileData(editingPath);

		// Retrieve token from url
		const token = getTokenFromURL(req);

		res.writeHead(200, {
			"Content-Type":"text/html"
		});
		res.end(
			fn({
				"editing": data,
				"token": token
			})
		);
	}
	else if (ctrl_panel_url === "reedmaking") {
		// Define path to reedmaking pug template
		fn = pug.compileFile(`${CTRL_PANEL_BASE}/reedmaking/index.pug`);

		// Retrieve reedmaking data to pass to pug template
		data = getFileData(reedmakingPath);

		// Retrieve token from url
		const token = getTokenFromURL(req);

		res.writeHead(200, {
			"Content-Type":"text/html"
		});
		res.end(
			fn({
				"reedmaking": data,
				"token": token
			})
		);
	}
	else if (ctrl_panel_url ===  "") { // Home page
		// Define path to home pug template
		fn = pug.compileFile(`${__dirname}/page_template.pug`);
		
		// Retrieve token from url
		const token = getTokenFromURL(req);

		res.writeHead(200, {
			"Content-Type":"text/html"
		});
		res.end(
			fn({
				"token": token
			})
		);
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