/*
	File for handling pug templating router for cca-admin-control-panel
*/

// Import pug 
const pug = require('pug');
const path = require('path');

// Import methods for retrieving database collections
const { getDatabaseCollection } = require('../../../../utils/mongodb.js');

// Import performance and Reedmaking router
const PERFORMANCES = require("./pgs/performances/")
const REEDMAKING = require('./pgs/reedmaking');

/*
	Routes
	/cca-admin-control-panel
		/performance
		/editing
		/reedmaking
*/
function Router(req,res) {
	let pathname = req.url;
	let cleanedPath = pathname.replace(/\B\//g,'').replace(/\/\B/g,'');
	let paths = cleanedPath.split("/"); // ["cca-admin-control-panel",...restOfPath]
	// Remove ["cca-admin-control-panel"] && returns [...restOfPath]
	let ctrl_panel_paths = paths.slice(1); // ["rest","of","path"]
	let ctrl_panel_url = ctrl_panel_paths.join("/"); // "rest/of/path"

	let fn;
	let data;

	if (ctrl_panel_url.startsWith("performance/"))
		PERFORMANCES.Router(req,res);
	else if (ctrl_panel_url.startsWith('reedmaking'))
		REEDMAKING.Router(req,res);
	else if (ctrl_panel_url === "editing") {
		// Define path to editing pug template
		fn = pug.compileFile(path.join(__dirname,'pgs/editing/index.pug'));

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
	else if (ctrl_panel_url ===  "") { // Home page
		// Define path to home pug template
		fn = pug.compileFile(path.join(__dirname, 'page_template.pug'));

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