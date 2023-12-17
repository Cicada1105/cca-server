require("dotenv").config();

const http = require('http');

const ADMIN = require('./admin');
const API = require('./api');
const EMAIL = require('./email');

const SERVER_URL = process.env.SERVER_URL;
const PORT = process.env.PORT || 2020;

const server = http.createServer((req,res) => {
	// First 3 setHeader's are for development ONLY
	// Source: https://stackoverflow.com/questions/56339978/how-can-i-make-my-front-end-app-access-my-node-server-apis
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Content-Length");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");

	if (req.url !== "favicon.ico") {
		if ((req.url === "/contact") && (req.method === "POST"))
			EMAIL.Send(req,res);
		else if (req.url.startsWith("/cca-admin"))
			ADMIN.Router(req,res);
		else if (req.url.startsWith("/api"))
			API.Router(req,res);
		else {
			res.writeHead(301,{"Location":`${SERVER_URL}/cca-admin-login`});
			res.end();
		}
	}
});

server.listen(PORT, () => {
	console.log(`Listening on port ${PORT}`);
});
/*
	Routes:
		General access
		/contact
		/api
			/performance
				/past
				/present
				/future
			/reedmaking
			/editing

		Protected Admin access
		/cca-admin-login
		CCA Admin Control Paneel
		if (logged in)
			// Redirect -> renders pug template
			res.writeHead(301,{Location: '/cca-control-panel'});
		/cca-admin-control-panel
			/performance
				/past
					/
					/collaborators
					/anecdotes
				/present
				/future
			/editing
			/reedmaking

		CCA Admin API
		/cca-admin-api
			/performance
				/past
					/
					/collaborators
					/anecdotes
				/present
				/future
			/reedmaking
			/editing
				/literature_type
				/genre
				/rate

		NOTE: 
			Controllers can be async/await
			Models can return promises to clearly develop requests
*/

