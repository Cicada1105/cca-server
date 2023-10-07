/*
	File contains request methods for dealing directly with the corresponding data
*/

const { getDatabaseCollection, ObjectId } = require('../../../../../utils/mongodb.js');

// Import utility function for removing an image
const { removeImage } = require('../../../utils');
/*
	Futture add documentation
*/
function add(anecdote) {
	return new Promise((resolve,reject) => {
		getDatabaseCollection('anecdotes').then(async ({ collection, closeConnection }) => {
			try {
				await collection.insertOne(anecdote);
				resolve(`Successfully added anecdote by ${anecdote.name}`);
			} catch(e) {
				reject("Internal Server Error. Try again later");
			} finally {
				// Close connection now that database operations are done
				closeConnection();
			}

		});
	})
}
/*
	Future update documentation
*/
function update(editedAnecdote) {
	return new Promise((resolve,reject) => {
		getDatabaseCollection('anecdotes').then(async ({ collection, closeConnection }) => {
			let { id, name, title, anecdote, img } = editedAnecdote;

			let updatedAnecdote = { name, title, anecdote };

			if (img.fileName) {
				updatedAnecdote = { 
					...updatedAnecdote, 
					img: { 
						src: img.fileName, 
						alt: img.alt
					} 
				}
			}

			let result = await collection.findOneAndUpdate({
				_id: new ObjectId(id)
			}, {
				$set: updatedAnecdote
			});

			// Close connection now that database operations are done
			closeConnection();

			if (img.fileName)
				removeImage(result['value']['img'].src);

			if (result.ok) {
				let { value: { name }} = result;
				resolve(`Successfully updated anecdote by ${name}`);
			}
			else {
				reject("Internal Server Error. Try again later");
			}
		});
	})
}
/*
	Future delete documentation
*/
function remove(anecdoteID) {
	return new Promise((resolve,reject) => {
		getDatabaseCollection('anecdotes').then(async ({ collection, closeConnection }) => {
			let result = await collection.findOneAndDelete({
				_id: new ObjectId(anecdoteID)
			});

			// Close connection now that database operations are done
			closeConnection();

			// Remove server image associated with database stored anecdote
			removeImage(result['value']['img'].src);

			if (result.ok) {
				let { value: { name } } = result;
				resolve(`Successfully removed anecdote by ${name}`);
			}
			else {
				reject("Internal Server Error. Try again later");
			}
		})
	})
}

module.exports = { 
	add, 
	update, 
	remove 
}