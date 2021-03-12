/*
	File for handling ADMIN future performances router

	Current router paths:
	/cca-admin-api/performance/future
		/
*/

// Controllers path
const CONTROLLERS_PATH = "./controllers";
// Import controllers to handle requests
const RootController = require(`${CONTROLLERS_PATH}/rootController.js`);

function Router(req,res) {
	// Store info about request
	//		Method
	const method = req.method;
	//		Path
	const paths = req.url.split("/"); // ["","cca-admin-api", "performance", "future", ...restOfPath]
	// Remove ["","cca-admin-api","performance", "future"] at beginning && returns [...restOfPath]
	const reducedPaths = paths.slice(4);
	const newPath = reducedPaths.join("/"); // [...restOfPath] becomes rest/Of/Path

	if (newPath === "") {
		// Test http request method
		switch(method) {
			case "POST":
				RootController.addPerformance(req,res);
			break
			case "PUT":
				RootController.updatePerformance(req,res);
			break;
			case "DELETE":
				RootController.removePerformance(req,res);
			break;
			default:
				// Unable to recognize method
				res.writeHead(405,{
					"Content-Type":"application/json"
				});
				res.end(JSON.stringify({
					msg: "Invalid method: " + req.method
				}));
			break;
		}
	}
	else {
		// Unable to find path
		res.writeHead(404,{
			"Content-Type":"application/json"
		});
		res.end(JSON.stringify({
			msg: "Cannot find path: " + req.url
		}));
	}
}

module.exports = { Router }