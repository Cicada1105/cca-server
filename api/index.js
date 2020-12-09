/*
	File for handling GENERAL api routing	
*/

// Base paths
//     Controllers
const CONTROLLERS_PATH = "./controllers";
// Import controllers
const PerformancesController = require(`${CONTROLLERS_PATH}/performancesController.js`);
const EditingController = require(`${CONTROLLERS_PATH}/editingController.js`);
const ReedmakingController = require(`${CONTROLLERS_PATH}/reedmakingController.js`);

function Router(req,res) {
	if (req.method === "GET") {
		const paths = req.url.split("/"); // returns ["","api","rest","of","path"]
		const subPaths = paths.slice(2); // returns ["rest","of","path"]
		const subURL = subPaths.join("/"); // returns "rest/of/path"

		switch(subURL) {
			case "performance/past":
				PerformancesController.getPastPerformances(req,res);
			break;
			case "performance/present":
				PerformancesController.getPresentPerformances(req,res);
			break;
			case "performance/future":
				PerformancesController.getFuturePerformances(req,res);
			break;
			case "editing":
				EditingController.getEditingPricings(req,res);
			break;
			case "reedmaking":
				ReedmakingController.getReedmakingPricings(req,res);
			break;
			default:
				res.end("Unable to find path");
			break;
		}
	}
	else {
		res.end("Invalid method");
	}
}

module.exports = {
	Router
}