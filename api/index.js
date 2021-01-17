/*
	File for handling GENERAL api routing	
*/

// Base paths
//     Controllers
const CONTROLLERS_PATH = "./controllers";
// Import controllers
const EditingController = require(`${CONTROLLERS_PATH}/editingController.js`);
const ReedmakingController = require(`${CONTROLLERS_PATH}/reedmakingController.js`);
// Import performances router
const PERFORMANCES = require("./performances/");

function Router(req,res) {
	if (req.method === "GET") {
		const paths = req.url.split("/"); // returns ["","api","rest","of","path"]
		const subPaths = paths.slice(2); // returns ["rest","of","path"]
		const subURL = subPaths.join("/"); // returns "rest/of/path"

		if (subURL === "editing")
			EditingController.getEditingPricings(req,res);
		else if (subURL === "reedmaking")
			ReedmakingController.getReedmakingPricings(req,res);
		else if (subURL.startsWith("performance"))
			PERFORMANCES.Router(req,res);
		else
			res.end("Unable to find path");
	}
	else {
		res.end("Invalid method");
	}
}

module.exports = {
	Router
}