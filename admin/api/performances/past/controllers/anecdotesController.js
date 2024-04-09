/*
	File for handling API requests and building responses
*/

// Import model to handle data
const AnecdotesModel = require("../models/anecdotesModel.js");

// Import utility function for handling the retrieval of body data
const { getBodyData } = require("../../../utils");

async function addAnecdote(req,res) {
	await getBodyData(req).then(async (body) => {
		let { name, title, anecdote, img: { newFileName, data }} = body;
		
		// Pass in request as the definition of the 'this' parameter
		await AnecdotesModel.add.call(req, {
			name,
			title,
			anecdote,
			img: {
				newFileName,
				data
			}
		}).then((msg) => {
			res.status = 201;
			res.end(JSON.stringify({ msg }));
		}).catch((err) => {
			console.log("Error:")
			console.log(err.message);
			console.log(err.stack);

			res.status = 500;
			res.end(JSON.stringify({
				msg: "Problem getting body data"
			}));
		});
	});
}
async function updateAnecdote(req,res) {
	await getBodyData(req).then(async (body) => {
		let { id, name, title, anecdote, img: { oldFileName, newFileName, data }} = body;
		
		// Pass in request as the definition of the 'this' parameter
		await AnecdotesModel.update.call(req, { 
			id, 
			name, 
			title, 
			anecdote, 
			img: { 
				oldFileName,
				newFileName,
				data
			}
		}).then((msg) => {
			res.status = 200;
			res.end(JSON.stringify({ msg }));
		}).catch((err) => {
			console.log("Error:")
			console.log(err.message);
			console.log(err.stack);

			res.status = 500;
			res.end(JSON.stringify({
				msg: "Problem getting body data"
			}));
		});
	})
}
async function removeAnecdote(req,res) {
	await getBodyData(req).then(async (body) => {
		let { id, oldFileName } = body;

		// Pass in request as the definition of the 'this' parameter
		await AnecdotesModel.remove.call(req, {
			id,
			oldFileName
		}).then((msg) => {
			res.status = 200;
			res.end(JSON.stringify({ msg }));
		}).catch((err) => {
			console.log("Error:")
			console.log(err.message);
			console.log(err.stack);

			res.status = 500;
			res.end(JSON.stringify({
				msg: "Problem getting body data"
			}));		
		});
	});
}

module.exports = {
	addAnecdote,
	updateAnecdote,
	removeAnecdote
}