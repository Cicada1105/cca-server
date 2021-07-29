/*
	File for handling ADMIN api reedmaking routing

	Current router paths:
	/cca-admin-api/reedmaking
		/reed/
		/rate/
*/

// Imports rate and reed routers
const ReedRouter = require("./reed/router.js");
const RateRouter = require("./rate/router.js");

function Router(req,res) {
	// Store info about request
	//     Method
	const method = req.method;
	//     Path
	const paths = req.url.split("/"); // ["","cca-admin-api","reedmaking", ...restOfPath]
	// Remove ["","cca-admin-api", "reedmaking"] at beginning && returns [...restOfPath]
	const reducedPaths = paths.slice(3);
	const newPath = reducedPaths.join("/"); // [...restOfPath] becomes "rest/Of/Path"

	/*
		method === "GET" is "handled" by compiling the PUG templating,
			passing in the data as parameters and then rendered to the screen
	*/
	if (newPath.startsWith("reed")) 
		ReedRouter.Router(req,res);
	else if (newPath.startsWith("rate"))
		RateRouter.Router(req,res);
	else {
		// Unable to find path
		res.status = 404;
		res.end(JSON.stringify({
			msg: "Cannot find path: " + req.url
		}));
	}
}

module.exports = { Router }