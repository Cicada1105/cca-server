require("dotenv").config();

const http = require('http');

const ADMIN = require('./admin');
const API = require('./api');
const EMAIL = require('./email');
const WORKER = require('./worker');

const SERVER_URL = process.env.SERVER_URL;
const PORT = process.env.PORT || 2020;

// Render spins down after 15 minutes = 900000
// 840000 = 14 minutes
const SPIN_DOWN_TIME = 870000;

WORKER.run(SPIN_DOWN_TIME);

const server = http.createServer((req,res) => {
	// First 3 setHeader's are for development ONLY
	// Source: https://stackoverflow.com/questions/56339978/how-can-i-make-my-front-end-app-access-my-node-server-apis

	const validFrontEndDomains = [ 'http://carlcolvinarts.com', 'https://carlcolvinarts.com', 'www.carlcolvinarts.com', 'carlcolvinarts', 'www.carlcolvinarts' ];
	const defaultFrontEndDomain = 'https://carlcolvinarts.com';
	const validServerDomains = [ 'https://cca-server-41u0.onrender.com' ];
	const defaultServerDomain = 'https://cca-server-41u0.onrender.com';

	if (req.url !== "favicon.ico") {
		if (req.url.startsWith("/api")) {
    	res.setHeader("Access-Control-Allow-Origin", validFrontEndDomains.find((val) => val === req['headers']['origin']) || defaultFrontEndDomain);
    	res.setHeader("Access-Control-Allow-Methods", "GET");
    	res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

			API.Router(req,res);
		}
		else if ((req.url === "/contact") && (req.method === "POST")) {
    	res.setHeader("Access-Control-Allow-Origin", validFrontEndDomains.find((val) => val === req['headers']['origin']) || defaultFrontEndDomain);
    	res.setHeader("Access-Control-Allow-Methods", "POST");
    	res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

			EMAIL.Send(req,res);
		}
		else if (req.url.startsWith("/cca-admin")) {
    	res.setHeader("Access-Control-Allow-Origin", validServerDomains.find((val) => val === req['headers']['origin']) || defaultServerDomain);
    	res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Content-Length");
    	res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");

			ADMIN.Router(req,res);
		}
		else if (req.url.startsWith("/ping")) {
    	res.setHeader("Access-Control-Allow-Origin", validServerDomains.find((val) => val === req['headers']['origin']) || defaultServerDomain);
    	res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Content-Length");
    	res.setHeader("Access-Control-Allow-Methods", "GET");

    	res.end(JSON.stringify({
    		msg: 'Server pinged.'
    	}));
		}
		else {
			res.writeHead(404,{
				"Content-Type":"text/strings"
			});
			res.end("Unable to find resource");
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

