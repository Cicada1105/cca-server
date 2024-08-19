/*
	File for handling pug templating router for cca-admin-control-panel
*/

// Import pug 
const pug = require('pug');

// Import methods for retrieving database collections
const { getDatabaseCollection } = require('../../../../utils/mongodb.js');

// Import performance router
const PERFORMANCES = require("./pgs/performances/")

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
	let data;

	if (ctrl_panel_url.startsWith("performance/"))
		PERFORMANCES.Router(req,res);
	else if (ctrl_panel_url === "editing") {
		// Define path to editing pug template
		fn = pug.compileFile(`${CTRL_PANEL_BASE}/editing/index.pug`);

		getDatabaseCollection('editing').then(async ({ collection }) => {
			data = await collection.find({}).toArray();

			res.writeHead(200, {
				"Content-Type":"text/html"
			});
			res.end(
				fn({
					"editing": data
				})
			);
		});
	}
	else if (ctrl_panel_url === "reedmaking") {
		// Define path to reedmaking pug template
		fn = pug.compileFile(`${CTRL_PANEL_BASE}/reedmaking/index.pug`);

		getDatabaseCollection('reedmaking').then(async ({ collection }) => {
			data = await collection.find({}).toArray();

			res.writeHead(200, {
				"Content-Type":"text/html"
			});
			res.end(
				fn({
					"reedmaking": data
				})
			);
		})
	}
	else if (ctrl_panel_url ===  "") { // Home page
		// Define path to home pug template
		fn = pug.compileFile(`${__dirname}/page_template.pug`);

		res.writeHead(200, {
			"Content-Type":"text/html"
		});
		res.end(
			fn()
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