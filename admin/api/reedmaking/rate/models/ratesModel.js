/*
	File contains request methods for dealing directly with the corresponding data
*/

const { getDatabaseCollection, ObjectId } = require('../../../../../utils/mongodb.js');

/*
	Future add documentation
*/
function add(pricingData) {
	return new Promise((resolve,reject) => {
		getDatabaseCollection('reedmaking').then(async ({ collection, closeConnection }) => {
			let { reedID, pricing } = pricingData;

			let result = await collection.findOneAndUpdate({
				_id: new ObjectId(reedID)
			}, {
				$push: {
					pricing: {
						id: new ObjectId(),
						quantity: pricing['quantity'],
						cost: pricing['cost']
					}
				}
			});

			// Close connection now that database operations are done
			closeConnection();

			if (result.ok) {
				resolve(`Successfully added new rate to \"${result['value'].name}\"`);
			}
			else {
				reject("Internal Server Error. Try again later");
			}
		});
	})
}
/*
	Future update documentation
*/
function update(updatedPricing) {
	return new Promise((resolve,reject) => {
		getDatabaseCollection('reedmaking').then(async ({ collection, closeConnection }) => {
			let { reedID, pricing } = updatedPricing;

			let result = await collection.findOneAndUpdate({
				_id: new ObjectId(reedID)
			}, {
				$set: {
					'pricing.$[el].id': new ObjectId(pricing['id']),
					'pricing.$[el].quantity': pricing['quantity'],
					'pricing.$[el].cost': pricing['cost']
				}
			}, {
				arrayFilters: [{ 'el.id': new ObjectId(pricing['id']) }]
			});

			// Close connection now that database operations are complete
			closeConnection();

			if (result.ok) {
				resolve(`Successfully updated \"${result['value'].name}\'s\" pricing`)
			}
			else {
				reject("Internal Server Error. Try again later");
			}
		});
	})
}
/*
	Future remove documentation
*/
function remove(pricingData) {
	return new Promise((resolve,reject) => {
		getDatabaseCollection('reedmaking').then(async ({ collection, closeConnection }) => {
			let result = await collection.findOneAndUpdate({
				_id: new ObjectId(pricingData['reedID'])
			}, {
				$pull: {
					pricing: {
						id: new ObjectId(pricingData['pricingID'])
					}
				}
			})

			// Close connection now that database operations are complete
			closeConnection();

			if (result.ok) {
				resolve(`Successfully removed rate from ${result['value'].name}\'s pricing`);	
			}
		});
	})
}

module.exports = {
	add,
	update,
	remove
}