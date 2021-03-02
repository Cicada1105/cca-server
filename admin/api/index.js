/*
	File for handling ADMIN api routing	
*/

// Controllers path
const CONTROLLERS_PATH = "./controllers";

// Imports controllers to handle requests
const PastPerformancesController = require(`${CONTROLLERS_PATH}/pastPerformanceController.js`);
const MusicController = require(`${CONTROLLERS_PATH}/currentMusicController.js`);
const FuturePerformancesController = require(`${CONTROLLERS_PATH}/futurePerformancesController.js`);
const ReedmakingController = require(`${CONTROLLERS_PATH}/reedmakingController.js`);
const EditingController = require(`${CONTROLLERS_PATH}/editingController.js`);

function Router(req,res) {
	// Store info about request
	//     Method
	const method = req.method;
	//     Path
	const paths = req.url.split("/"); // ["","cca-admin-api",...restOfPath, ,"?token=<token>"]
	// Remove ["","cca-admin-api"] at beginning and ["?token=<token>"} at end && returns [...restOfPath]
	const reducedPaths = paths.slice(2);
	const newPath = reducedPaths.join("/"); // [...restOfPath] becomes "rest/Of/Path"

	/*
		method === "GET" is "handled" by compiling the PUG templating,
			passing in the data as parameters and then rendered to the screen
	*/
	if (method === "POST") {
		switch(newPath) {
			case "performance/past":
				PastPerformancesController.addPerformance(req,res);
			break;
			case "performance/present":
				MusicController.addSong(req,res);
			break;
			case "performance/future":
				FuturePerformancesController.addPerformance(req,res);
			break;
			case "reedmaking":
				ReedmakingController.addPricing(req,res);
			break;
			case "editing":
				EditingController.addPricing(req,res);
			break;
			default:
				// Unable to find path
				res.writeHead(404,{
					"Content-Type":"application/json"
				});
				res.end(JSON.stringify({
					msg: "Cannot find path: " + req.url
				}));
			break;
		}
	}
	else if (method === "PUT") {
		switch(newPath) {
			case "performance/past":
				PastPerformancesController.updatePerformance(req,res);
			break;
			case "performance/present":
				MusicController.updateSong(req,res)
			break;
			case "performance/future":
				FuturePerformancesController.updatePerformance(req,res);
			break;
			case "reedmaking":
				ReedmakingController.updatePricing(req,res);
			break;
			case "editing":
				EditingController.updatePricing(req,res);
			break;
			default:
				// Unable to find path
				res.writeHead(404,{
					"Content-Type":"application/json"
				});
				res.end(JSON.stringify({
					msg: "Cannot find path: " + req.url
				}));
			break;
		}
	}
	else if (method === "DELETE") {
		switch(newPath) {
			case "performance/past":
				PastPerformancesController.removePerformance(req,res);
			break;
			case "performance/present":
				MusicController.removeSong(req,res);
			break;
			case "performance/future":
				FuturePerformancesController.removePerformance(req,res);
			break;
			case "reedmaking":
				ReedmakingController.removePricing(req,res);
			break;
			case "editing":
				EditingController.removePricing(req,res);
			break;
			default:
				// Unable to find path
				res.writeHead(404,{
					"Content-Type":"application/json"
				});
				res.end(JSON.stringify({
					msg: "Cannot find path: " + req.url
				}));
			break;
		}
	}
	else {
		// Unable to recognize method
		res.writeHead(405,{
			"Content-Type":"application/json"
		});
		res.end(JSON.stringify({
			msg: "Invalid method: " + req.method
		}));
	}
}

module.exports = { Router }