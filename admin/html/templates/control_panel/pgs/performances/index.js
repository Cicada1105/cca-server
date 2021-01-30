/*
	File for handling pug templating router for performances
*/

// Import pug 
const pug = require('pug');
// Import fs to handle file calls
const fs = require("fs");

// Data file paths to be read sent to control panel template to be updated
const performancesPath = './site_data/performance.json';
const collaboratorsPath = './site_data/collaborators.json';
const anecdotesPath = './site_data/anecdotes.json';

/*
	Routes
	/past
	/past/collaborators
	/past/anecdotes
	/present
	/future
*/
function Router(req,res) {
	let url = req.url;
	let paths = url.split("/"); // ["","cca-admin-control-panel","performances","ret","of","path"]
	let performances_paths = paths.slice(3); // ["rest","of","path"]
	let performances_url = performances_paths.join("/");; // "rest/of/path"

	let fn;
	let buffer, dataJSON, data;
	
	if (performances_url.startsWith("past")) {
		let past_url = performances_url.substr(4); // Returns whatever comes after "past"
		
		switch(past_url) {
			case "":
				buffer = fs.readFileSync(performancesPath);
				dataJSON = buffer.toString();
				data = JSON.parse(dataJSON);

				fn = pug.compileFile(`${__dirname}/past/root/index.pug`);

				res.writeHead(200, {
					"Content-Type":"text/html"
				});
				res.end(fn({
					"past": data["past"]
				}));
			break;
			case "/collaborators":
				buffer = fs.readFileSync(collaboratorsPath);
				dataJSON = buffer.toString();
				data = JSON.parse(dataJSON);

				fn = pug.compileFile(`${__dirname}/past/collaborators/index.pug`);

				res.writeHead(200, {
					"Content-Type":"text/html"
				});
				res.end(fn({
					"collaborators": data
				}))
			break;
			case "/anecdotes":
				buffer = fs.readFileSync(anecdotesPath);
				dataJSON = buffer.toString();
				data = JSON.parse(dataJSON);

				fn = pug.compileFile(`${__dirname}/past/anecdotes/index.pug`);

				res.writeHead(200, {
					"Content-Type":"text/html"
				});
				res.end(fn({
					"anecdotes": data
				}))
			break;
			default:
				res.writeHead(404, {
					"Content-Type": "text/strings"
				});
				res.end("Unable to find resource");
		}
	}
	else if (performances_url === "present") {
		buffer = fs.readFileSync(performancesPath);
		dataJSON = buffer.toString();
		data = JSON.parse(dataJSON);

		fn = pug.compileFile(`${__dirname}/music_stand/index.pug`);

		res.writeHead(200, {
			"Content-Type": "text/html"
		});
		res.end(fn({
			"present": data["present"]
		}));
	}
	else if (performances_url === "future") {
		buffer = fs.readFileSync(performancesPath);
		dataJSON = buffer.toString();
		data = JSON.parse(dataJSON);

		fn = pug.compileFile(`${__dirname}/future/index.pug`);

		res.writeHead(200, {
			"Content-Type": "text/html"
		});
		res.end(fn({
			"future": data["future"]
		}))
	}
	else {
		res.writeHead(404,{
			"Content-Type":"text/strings"
		});
		res.end("Unable to find resource");
	}
}

module.exports = {
	Router
}