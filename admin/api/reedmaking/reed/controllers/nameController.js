/*
	Method for handling API requests and building responses
	Request codes
	201: Created new resource (adding)
	200: Okay
	404: Not Found (updating and deleting?)
	500: Internal Server Error (Getting body data)
*/

// Import models to handle actual data
const ReedNameModel = require("../models/nameModel.js");

// Import utility function for handling the retrieval of body data
const { getBodyData } = require("../../../utils.js");

/*async function addReedDescription(req, res) {

}*/

async function updateReedName(req, res) {
	await getBodyData(req).then(async (body) => {
		let { id, name } = body;
		
		await ReedNameModel.update({
			id,
			name
		}).then((msg) => {
			res.status = 200;
			res.end(JSON.stringify({ msg }));
		}).catch((err) => {
			res.status = 500;
			res.end(JSON.stringify({ 
				msg: err 
			}));
		})
	}).catch((err) => {
		console.log("ERROR:");
		console.log(err.message);
		console.log(err.stack);

		res.status = 500;
		res.end(JSON.stringify({
			msg: "Unable to process the request at this time"
		}));
	})
}

/*async function removeReedDescription(req, res) {

}*/

module.exports = { updateReedName }