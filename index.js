const http = require('http');

const ADMIN = require('./admin/index.js');
const API = require('./api/index.js');
const EMAIL = require('./email/index.js');

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
		else
			res.end("Return safe 404 response");
	}
});

server.listen(PORT, () => {
	console.log(`Listening on port ${PORT}`);
});
/*
	Routes:
		General access
		/contact
		/api/performance/past
		/api/performance/present
		/api/performance/future
		/api/reedmaking
		/api/editing

		Protected Admin access
		/cca-admin-login
		CCA Admin Control Paneel
		if (logged in)
			// Redirect -> renders pug template
			res.writeHead(301,{Location: '/cca-control-panel'});
		/cca-admin-control-panel/performance/past
		/cca-admin-control-panel/performance/past/collaborators
		/cca-admin-control-panel/performance/past/anecdotes
		/cca-admin-control-panel/performance/present
		/cca-admin-control-panel/performance/future
		/cca-admin-control-panel/editing
		/cca-admin-control-panel/reedmaking

		CCA Admin API
		/cca-admin-api/performance/past
		/cca-admin-api/performance/present
		/cca-admin-api/performance/future
		/cca-admin-api/reedmaking
		/cca-admin-api/editing

		NOTE: 
			Controllers can be async/await
			Models can return promises to clearly develop requests
*/

