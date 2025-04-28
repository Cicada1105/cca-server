/*
	File for handling ADMIN api reedmaking routing

	Current router paths:
	/cca-admin-api/reedmaking
		/reed
		/category
*/

// Imports reed and category routers
const REED_ROUTER = require('./reed/router.js');
const CATEGORY_ROUTER = require('./category/router.js');

function Router(req,res) {
	// Store info about request
	// 		Method
	const method = req.method;
	//     Path
	const path = req.url;
	// Remove leading and trailing '/'s
	const cleanedPath = path.replace(/\B\//g,'').replace(/\/\B/g,'');
	const paths = cleanedPath.split("/"); // ["cca-admin-api","reedmaking", ...restOfPath]
	// Remove ["cca-admin-api", "reedmaking"] at beginning && returns [...restOfPath]
	const reducedPaths = paths.slice(2);
	const newPath = reducedPaths.join("/"); // [...restOfPath] becomes "rest/Of/Path"

	/*
		method === "GET" is "handled" by compiling the PUG templating,
			passing in the data as parameters and then rendered to the screen
	*/
	if ( newPath.startsWith('reed') )
		REED_ROUTER.Router(req,res);
	else if ( newPath.startsWith('category') )
		CATEGORY_ROUTER.Router(req,res);
	else {
		// Unable to find path
		res.status = 404;
		res.end(JSON.stringify({
			msg: "Cannot find path: " + req.url
		}));
	}
}

module.exports = { Router }