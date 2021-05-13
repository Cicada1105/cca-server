/*
	File for handling API requests and building responses
*/

// Import model to handle data
const AnecdotesModel = require("../models/anecdotesModel.js");

// Import utility function for handling the retrieval of body data
const { getBodyData } = require("../../../utils.js");

async function addAnecdote(req,res) {
	await getBodyData(req).then(async (body) => {
		let { name, title, anecdote, img: { src, alt }} = body;

		await AnecdotesModel.add({
			name,
			title,
			anecdote,
			img: {
				src,
				alt
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
	await AnecdotesModel.update("Updated Anecdote").then((msg) => {
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
}
async function removeAnecdote(req,res) {
	await getBodyData(req).then(async (body) => {
		let { id } = body;

		await AnecdotesModel.remove(id).then((msg) => {
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