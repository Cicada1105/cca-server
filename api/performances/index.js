/*
	File for handling PERFORMANCES api routing
*/

// Controllers base path
const CONTROLLERS_PATH = "./controllers";
// Import controllers
const PerformancesController = require(`${CONTROLLERS_PATH}/performancesController.js`);
const AnecdotesController = require(`${CONTROLLERS_PATH}/anecdotesController.js`);
const CollaboratorsController = require(`${CONTROLLERS_PATH}/collaboratorsController.js`);

function Router(req,res) {
	const paths = req.url.split("/"); // returns ["","api","rest","of","path"]
	const subPaths = paths.slice(3); // returns ["rest","of","path"]
	const subURL = subPaths.join("/"); // returns "rest/of/path"

	switch(subURL) {
		case "past":
			PerformancesController.getPastPerformances(req,res);
		break;
		case "past/anecdotes":
			AnecdotesController.getAnecdotes(req,res);
		break;
		case "past/collaborators":
			CollaboratorsController.getCollaborators(req,res);
		break;
		case "present":
			PerformancesController.getPresentPerformances(req,res);
		break;
		case "future":
			PerformancesController.getFuturePerformances(req,res);
		break;
		default:
			res.end("Unable to find path");		
		break;
	}
}

module.exports = {
	Router
}