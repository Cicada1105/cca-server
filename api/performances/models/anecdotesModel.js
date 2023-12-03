/*
	Model that directly interfaces with the anecdotes data
*/

const { getDatabaseCollection } = require('../../../utils/mongodb.js');

function getAllAnecdotes() {
	// Return promise that resolves with anecdote data
	return new Promise((resolve,reject) => {
		getDatabaseCollection('anecdotes').then(async ({ collection, closeConnection }) => {
			let anecdotes = await collection.find({}).toArray();

			// Now that the collection has been queried, close the database connection
			closeConnection();

			// Remove unnecessary id from data to be returned to front end
			let updatedAnecdotes = [];
			anecdotes.forEach(anecdote => {
				// Extract out current id from rest of info
				let { id, ...rest } = anecdote;
				// Add server url to image if it is a url string
				let imgSrc = rest['img'].src;
				rest['img'].src = imgSrc.startsWith("data:image") || imgSrc.startsWith('http') ? imgSrc : `${process.env.SERVER_URL}/imgs/${rest['img'].src}`;
				// Store rest of anecdote info without id
				updatedAnecdotes.push(rest);
			})
			resolve(updatedAnecdotes);
		});
	})
}

module.exports = {
	getAllAnecdotes
}