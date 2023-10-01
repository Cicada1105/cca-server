/*
	File for providing access to server images
*/

const fs = require('fs');

function Router(req,res) {
	if (req.method == "GET") {
		const paths = req.url.split("/"); // returns ["","imgs","rest","of","path"]
		const subPaths = paths.slice(2); // returns ["rest","of","path"]
		const subURL = subPaths.join("/"); // returns "rest/of/path"

		if (!subURL.includes("/")) {
			fs.stat(`./assets/imgs/${subURL}`, (err, stats) => {
				if (err)
					res.end("Is not file");
				else
					res.end(fs.readFileSync(`./assets/imgs/${subURL}`));
			});
		}
		else
			res.end("Unable to find image path");
	}
}

module.exports = {
	Router
}