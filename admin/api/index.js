/*
	File for handling ADMIN api routing

	Current router paths:
	/cca-admin-api/
		/performance/
		/reedmaking/
		/editing/
*/

// Import Performances, Reedmaking and Editing Router
const PERFORMANCE_ROUTER = require("./performances/router.js");
const REEDMAKING_ROUTER = require("./reedmaking/router.js");
const EDITING_ROUTER = require("./editing/router.js");

function Router(req,res) {
	// Store info about request
	//     Path
	const paths = req.url.split("/"); // ["","cca-admin-api",...restOfPath]
	// Remove ["","cca-admin-api"] at beginning && returns [...restOfPath]
	const reducedPaths = paths.slice(2);
	const newPath = reducedPaths.join("/"); // [...restOfPath] becomes "rest/Of/Path"

	// All responses will be of type 'application/json'
	res.setHeader("Content-Type","application/json");
	
	/*
		Test if path needs to be directed to Performance Router
	*/
	if (newPath.startsWith("performance"))
		PERFORMANCE_ROUTER.Router(req,res);
	else if (newPath.startsWith("reedmaking")) 
		REEDMAKING_ROUTER.Router(req,res);
	else if (newPath.startsWith("editing")) 
		EDITING_ROUTER.Router(req,res);
	else {
		// Unable to find path
		res.status = 404;
		res.end(JSON.stringify({
			msg: "Cannot find path: " + req.url
		}));
	}
}

module.exports = { Router }