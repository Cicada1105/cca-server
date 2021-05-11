/*
	File for handling ADMIN present performances router

	Current router paths:
	/cca-admin-api/performance/present
		/
*/

const CONTROLLERS_PATH = "./controllers";
// Import controllers to handle requests
const MusicController = require(`${CONTROLLERS_PATH}/currentMusicController.js`);

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
				MusicController.addSong(req,res);
			break
			case "PUT":
				MusicController.updateSong(req,res);
			break;
			case "DELETE":
				MusicController.removeSong(req,res);
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