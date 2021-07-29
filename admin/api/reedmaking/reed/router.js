/*
	File for handling ADMIN api reedmaking routing

	Current router paths:
	/cca-admin-api/reedmaking/reed
		/
		/name
		/description
*/
const CONTROLLERS_PATH = "./controllers";

// Imports controllers to handle requests
const ReedController = require(`${CONTROLLERS_PATH}/reedController.js`);
const NameController = require(`${CONTROLLERS_PATH}/nameController.js`);
const DescriptionController = require(`${CONTROLLERS_PATH}/descriptionController.js`);

function Router(req,res) {
	// Store info about request
	//     Method
	const method = req.method;
	//     Path
	const paths = req.url.split("/"); // ["","cca-admin-api","reedmaking", "rate", ...restOfPath]
	// Remove ["","cca-admin-api", "reedmaking","rate"] at beginning && returns [...restOfPath]
	const reducedPaths = paths.slice(4);
	const newPath = reducedPaths.join("/"); // [...restOfPath] becomes "rest/Of/Path"

	/*
		method === "GET" is "handled" by compiling the PUG templating,
			passing in the data as parameters and then rendered to the screen
	*/
	if (newPath === "") {
		switch(method) {
			case "POST":
				ReedController.addReed(req,res);
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
	else if (newPath === "name") {
		switch(method) {
			case "PUT":
				NameController.updateReedName(req,res);
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
	else if (newPath === "description") {
		switch(method) {
			case "PUT":
				DescriptionController.updateReedDescription(req,res);
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