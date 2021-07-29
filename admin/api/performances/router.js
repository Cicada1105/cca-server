/*
	File for handling ADMIN performances router

	Current router paths:
	/cca-admin-api/performance
		/past/
		/present/
		/future/
*/

// Import past, present and future performances router
const PAST_PERFORMANCES_ROUTER = require('./past/router.js');
const PRESENT_PERFORMANCES_ROUTER = require('./present/router.js');
const FUTURE_PERFORMANCE_ROUTER = require('./future/router.js');

function Router(req,res) {
	// Store info about request
	//		Path
	const paths = req.url.split("/"); // ["","cca-admin-api", "performance", ...restOfPath]
	// Remove ["","cca-admin-api","performance"] at beginning && returns [...restOfPath]
	const reducedPaths = paths.slice(3);
	const newPath = reducedPaths.join("/"); // [...restOfPath] becomes rest/Of/Path

	// Test new path route
	if (newPath.startsWith("past"))
		PAST_PERFORMANCES_ROUTER.Router(req,res);
	else if (newPath.startsWith("present"))
		PRESENT_PERFORMANCES_ROUTER.Router(req,res);
	else if (newPath.startsWith("future"))
		FUTURE_PERFORMANCE_ROUTER.Router(req,res);
	else {
		// Unable to find path
		res.status = 404;
		res.end(JSON.stringify({
			msg: "Cannot find path: " + req.url
		}));
	}
}

module.exports = { Router }