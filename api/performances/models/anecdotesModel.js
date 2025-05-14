/*
	Model that directly interfaces with the anecdotes data
*/

const { getDatabaseCollection } = require('../../../utils/mongodb.js');

function getAllAnecdotes() {
	// Return promise that resolves with anecdote data
	return new Promise((resolve,reject) => {
		getDatabaseCollection('anecdotes').then(async ({ collection }) => {
			// Remove unnecessary id from data to be returned to front end
			let anecdotes = await collection.find({}).project({
				_id: 0
			}).toArray();

			let updatedAnecdotes = [];
			anecdotes.forEach(anecdote => {
				// Add server url to image if it is a url string
				let imgSrc = anecdote['img'].src;
				anecdote['img'].src = imgSrc.startsWith("data:image") || imgSrc.startsWith('http') ? imgSrc : `${process.env.SERVER_URL}/imgs/${rest['img'].src}`;
				// Store rest of anecdote info without id
				updatedAnecdotes.push(anecdote);
			});
			
			resolve(updatedAnecdotes);
		});
	})
}

module.exports = {
	getAllAnecdotes
}