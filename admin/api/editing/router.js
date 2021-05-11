/*
	File for handling ADMIN api editing routing

	Current router paths:
	/cca-admin-api/editing
		/genres
		/literature_types
		/rates
*/

const CONTROLLERS_PATH = "./controllers";

// Imports controllers to handle requests
const GenresController = require(`${CONTROLLERS_PATH}/genresController.js`);
const LitTypesController = require(`${CONTROLLERS_PATH}/litTypesController.js`);
const RatesController = require(`${CONTROLLERS_PATH}/ratesController.js`);

function Router(req,res) {
	// Store info about request
	//     Method
	const method = req.method;
	//     Path
	const paths = req.url.split("/"); // ["","cca-admin-api","editing", ...restOfPath]
	// Remove ["","cca-admin-api", "editing"] at beginning && returns [...restOfPath]
	const reducedPaths = paths.slice(3);
	const newPath = reducedPaths.join("/"); // [...restOfPath] becomes "rest/Of/Path"

	/*
		method === "GET" is "handled" by compiling the PUG templating,
			passing in the data as parameters and then rendered to the screen
	*/
	if (newPath === "genres") {
		switch(method) {
			case "POST":
				GenresController.addGenre(req,res);
			break;
			case "PUT":
				GenresController.updateGenre(req,res);
			break;
			case "DELETE":
				GenresController.removeGenre(req,res);
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
	else if (newPath === "literature_types") {
		switch(method) {
			case "POST":
				LitTypesController.addLiteratureType(req,res);
			break;
			case "PUT":
				LitTypesController.updateLiteratureType(req,res);
			break;
			case "DELETE":
				LitTypesController.removeLiteratureType(req,res);
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
	else if (newPath === "rates") {
		switch(method) {
			case "POST":
				RatesController.addPricing(req,res);
			break;
			case "PUT":
				RatesController.updatePricing(req,res);
			break;
			case "DELETE":
				RatesController.removePricing(req,res);
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