/*
	File for handling pug templating router for performances
*/

// Import pug 
const pug = require('pug');

// Import method for retrieving database collections
const { getDatabaseCollection, ObjectId } = require('../../../../../../utils/mongodb.js');

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
	let paths = url.split("/"); // ["","cca-admin-control-panel","performances",...restOfPath,"?token=<token>"]
	// Remove ["","cca-admin-control-panel","performances"] at beginning and ["?token=<token>"} at end && returns [...restOfPath]
	let performances_paths = paths.slice(3,paths.length - 1); // ["rest","of","path"]
	let performances_url = performances_paths.join("/");; // "rest/of/path"

	let fn;
	let data;
	
	// let token = null;
	if (performances_url.startsWith("past")) {
		let past_url = performances_url.substr(4); // Returns whatever comes after "past"
		
		switch(past_url) {
			case "":
				getDatabaseCollection('performances').then(async ({ collection }) => {
					data = await collection.find({}).toArray();

					fn = pug.compileFile(`${__dirname}/past/root/index.pug`);

					// Format performnce images to include server url
					let imgSrc;
					data[0]['past'].performances.forEach( performance => {
						imgSrc = performance['img'].src;
						performance['img'].src = imgSrc.startsWith('data:image') || imgSrc.startsWith('http') ? imgSrc : `${process.env.SERVER_URL}/imgs/${imgSrc}`;
					});

					res.writeHead(200, {
						"Content-Type":"text/html"
					});
					res.end(fn({
						"past": data[0]["past"]
					}));
				});
			break;
			case "/collaborators":
				getDatabaseCollection('collaborators').then(async ({ collection }) => {
					data = await collection.find({}).toArray();
					
					fn = pug.compileFile(`${__dirname}/past/collaborators/index.pug`);

					// Format performnce images to include server url
					let imgSrc;
					data.forEach( collaborator => {
						imgSrc = collaborator['img'].src;
						collaborator['img'].src = imgSrc.startsWith('data:image') || imgSrc.startsWith('http') ? imgSrc : `${process.env.SERVER_URL}/imgs/${imgSrc}`;	
					});

					res.writeHead(200, {
						"Content-Type":"text/html"
					});
					res.end(fn({
						"collaborators": data
					}))
				});
			break;
			case "/anecdotes":
				getDatabaseCollection('anecdotes').then(async ({ collection }) => {
					data = await collection.find({}).toArray();

					fn = pug.compileFile(`${__dirname}/past/anecdotes/index.pug`);

					// Format performnce images to include server url
					let imgSrc;
					data.forEach( anecdote => {
						imgSrc = anecdote['img'].src;
						anecdote['img'].src = imgSrc.startsWith('data:image') || imgSrc.startsWith('http') ? imgSrc : `${process.env.SERVER_URL}/imgs/${imgSrc}`;	
					});

					res.writeHead(200, {
						"Content-Type":"text/html"
					});
					res.end(fn({
						"anecdotes": data
					}))
				});
			break;
			default:
				res.writeHead(404, {
					"Content-Type": "text/strings"
				});
				res.end("Unable to find resource");
		}
	}
	else if (performances_url === "present") {
		getDatabaseCollection('performances').then(async ({ collection }) => {
			data = await collection.find({}).toArray();

			fn = pug.compileFile(`${__dirname}/music_stand/index.pug`);

			res.writeHead(200, {
				"Content-Type": "text/html"
			});
			res.end(fn({
				"present": data[0]["present"]
			}));
		});
	}
	else if (performances_url === "future") {
		getDatabaseCollection('performances').then(async ({ collection }) => {
			data = await collection.find({}).toArray();

			fn = pug.compileFile(`${__dirname}/future/index.pug`);

			res.writeHead(200, {
				"Content-Type": "text/html"
			});
			res.end(fn({
				"future": data[0]["future"]
			}))
		});
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