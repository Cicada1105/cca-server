/*
	File contains request methods for dealing directly with the corresponding data
*/

const { getDatabaseCollection, ObjectId } = require('../../../../utils/mongodb.js');

/*
	Future add documentation
*/
function add(litData) {
	return new Promise((resolve,reject) => {
		getDatabaseCollection('editing').then(async ({ collection, closeConnection }) => {
			// Add unique IDs to genres
			let genresWithIDs = litData.genres.map(genre => { 
				return { 
					id: new ObjectId(), 
					display: genre, 
					value: genre.toLowerCase().split(" ").join("") 
				}
			});

			// Add unique IDs to rates
			let ratesWithIDs = {
				"Standard Proofreading": { "rates": [] },
				"Developmental Editing": { "rates": [] },
				"Both": { "rates": [] }
			}

			// Retrieve editing type rates
			let stndrdRates = litData.rates["standard_proofreading"];
			let devEditingRates = litData.rates["developmental_editing"];
			let bothRates = litData.rates["both"];
			// Insert unique IDs for each rate
			let stndrdRatesWithIDs = stndrdRates.map(rate => { return { id: new ObjectId(), ...rate }});
			let devEditingRatesWithIDs = devEditingRates.map(rate => { return { id: new ObjectId(), ...rate }});
			let bothRatesWithIDs = bothRates.map(rate => { return { id: new ObjectId(), ...rate }});

			ratesWithIDs["Standard Proofreading"]["rates"] = stndrdRatesWithIDs;
			ratesWithIDs["Developmental Editing"]["rates"] = devEditingRatesWithIDs;
			ratesWithIDs["Both"]["rates"] = bothRatesWithIDs;

			let newLitType = {
				id: new ObjectId(),
				type: litData["type"],
				genres: genresWithIDs,
				editing: ratesWithIDs
			}

			try {
				await collection.insertOne(newLitType);

				resolve(`Successfully added ${litData.type}'s genres and rates to editing page`);
			} catch (e) {
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
function update(litType) {
	console.log(`Updating existing editing litType: ${litType}`)
}
/*
	Future remove documentation
*/
function remove(litTypeID) {
	return new Promise((resolve,reject) => {
		getDatabaseCollection('editing').then(async ({ collection, closeConnection }) => {
			let result = await collection.findOneAndDelete({
				_id: new ObjectId(litTypeID)
			});

			// Close connection now that database operations are done
			closeConnection();

			if (result.ok) {
				let { value: { type } } = result;

				resolve (`Successfully removed ${type} literature type and all of its genres and rates`);
			}
			else {
				reject("Internal Server Error. Try again later");
			}
		});
	})
}

module.exports = {
	add,
	update,
	remove
}