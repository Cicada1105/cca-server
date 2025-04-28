/*
	File for handling ADMIN api reedmaking routing

	Current router paths:
	/cca-admin-api/reedmaking/reed
		/
*/

// Imports controllers to handle requests
const ReedController = require('./controller.js');

function Router(req,res) {
	// Store info about request
	//     Method
	const method = req.method;
	//     Path
	const path = req.url;
	const cleanedPath = path.replace(/\B\//g,'').replace(/\/\B/g,'');
	const paths = cleanedPath.split("/"); // ["cca-admin-api","reedmaking", "reed", ...restOfPath]
	// Remove ["cca-admin-api", "reedmaking","reed"] at beginning && returns [...restOfPath]
	const reducedPaths = paths.slice(3);
	const newPath = reducedPaths.join("/"); // [...restOfPath] becomes "rest/Of/Path"

	/*
		method === "GET" is "handled" by compiling the PUG templating,
			passing in the data as parameters and then rendered to the screen
	*/
	if (newPath === '') {
		switch(method) {
			case "POST":
				ReedController.addReed(req,res);
			break;
			case 'PUT':
				ReedController.updateReed(req,res);
			break;
			case "DELETE":
				ReedController.removeReed(req,res);
			break;
			default:
				// Unable to recognize method
				res.status = 405;
				res.end(JSON.stringify({
					msg: "Invalid method: " + req.method
				}));
			break;
		}
	}
	else {
		// Unable to find path
		res.status = 404;
		res.end(JSON.stringify({
			msg: "Cannot find path: " + req.url
		}));
	}
}

module.exports = { Router }