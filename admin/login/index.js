/*
	File for handling login
*/
// Require pug for handling compiling of pug files
const pug = require("pug");

// Import controllers 
const LOGIN_CONTROLLER = require("./controllers/");

function Router(req,res) {
	// Check method
	if (req.method === "GET") {
		fn = pug.compileFile(`${__dirname}/../html/templates/login.pug`);

		let newURL = new URL(`http://${req.host}${req.url}`);

		res.writeHead(200, {"Content-Type":"text/html"});
		
		if (newURL.search) {
			let params = newURL.searchParams;

			if (params.has("userErrMsg")) 
				res.end(
					fn({
						"userErrMsg": params.get("userErrMsg")
					})
				);
			else if(params.has("passErrMsg"))
				res.end(
					fn({
						"passErrMsg": params.get("passErrMsg")
					})
				);
			else
				res.end(fn());
		}
		else
			res.end(fn());
	}
	else if (req.method === "POST")
		LOGIN_CONTROLLER.login(req,res);
}

module.exports = {
	Router
}