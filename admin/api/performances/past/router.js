/*
	File for handling ADMIN past performances routes

	Current router paths:
	/cca-admin-api/performance/past
		/
		/collaborators
		/anecdotes
*/

// Controllers path
const CONTROLLERS_PATH = "./controllers";

// Imports controllers to handle requests
const PastPerformancesController = require(`${CONTROLLERS_PATH}/pastPerformanceController.js`);
const CollaboratorsController = require(`${CONTROLLERS_PATH}/collaboratorsController.js`);
const AnecdotesController = require(`${CONTROLLERS_PATH}/anecdotesController.js`);

function Router(req,res) {
	// Store info about request
	//		Method
	const method = req.method;
	//		Path
	const paths = req.url.split("/"); // ["","cca-admin-api", "performance", "past", ...restOfPath]
	// Remove ["","cca-admin-api","performance","past"] at beginning && returns [...restOfPath]
	const reducedPaths = paths.slice(4);
	const newPath = reducedPaths.join("/"); // [...restOfPath] becomes rest/Of/Path

	// Test new path route
	if (newPath === "") { // Past performances 'Root'
		// Test http request method
		switch(method) {
			case "POST":
				PastPerformancesController.addPerformance(req,res);
			break;
			case "PUT":
				PastPerformancesController.updatePerformance(req,res);
			break;
			case "DELETE":
				PastPerformancesController.removePerformance(req,res);
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
	else if (newPath === "collaborators") {
		// Test http request method
		switch(method) {
			case "POST":
				CollaboratorsController.addCollaborator(req,res);
			break;
			case "PUT":
				CollaboratorsController.updateCollaborator(req,res);
			break;
			case "DELETE":
				CollaboratorsController.removeCollaborator(req,res);
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
	else if (newPath === "anecdotes") {
		// Test http request method
		switch(method) {
			case "POST":
				AnecdotesController.addAnecdote(req,res);
			break;
			case "PUT":
				AnecdotesController.updateAnecdote(req,res);
			break;
			case "DELETE":
				AnecdotesController.removeAnecdote(req,res);
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