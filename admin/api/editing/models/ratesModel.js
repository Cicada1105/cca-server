/*
	File contains request methods for dealing directly with the corresponding data
*/

const { getDatabaseCollection, ObjectId } = require('../../../../utils/mongodb.js');

/*
	Future add documentation
*/
function add(rateData) {
	return new Promise((resolve,reject) => {
		getDatabaseCollection('editing').then(async ({ collection }) => {
			let { litID, editingType, ...rest } = rateData;
			let updatedObj = {};
			updatedObj[`editing.${editingType}.rates`] = {
				id: new ObjectId(),
				...rest
			};

			let result = await collection.findOneAndUpdate({
				_id: new ObjectId(rateData['litID'])
			}, {
				$push: updatedObj
			});

			if (result.ok) {
				let { value: { type } } = result;

				resolve(`Successfully added new rate to the ${type} editing type of ${editingType}`);
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
function update(rateData) {
	return new Promise((resolve,reject) => {
		getDatabaseCollection('editing').then(async ({ collection }) => {
			let { litID, editingType, rateID, ...rate } = rateData;

			let updatedObj = {};
			updatedObj[`editing.${editingType}.rates.$[rate].min`] = rate['min'];
			updatedObj[`editing.${editingType}.rates.$[rate].max`] = rate['max'];
			updatedObj[`editing.${editingType}.rates.$[rate].perHour`] = rate['perHour'];
			updatedObj[`editing.${editingType}.rates.$[rate].perWord`] = rate['perWord'];

			if (rate["flatRate"])
				updatedObj[`editing.${editingType}.rates.$[rate].flatRate`] = rate['flatRate'];

			let result = await collection.findOneAndUpdate({
				_id: new ObjectId(litID)
			}, {
				$set: updatedObj
			}, {
				arrayFilters: [{ 'rate.id': new ObjectId(rateID) }]
			});

			if (result.ok) {
				let { value: { type } } = result;

				resolve(`Successfully updated ${editingType} rate from ${type} section`);
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
function remove(uniqueRateData) {
	return new Promise((resolve,reject) => {
		getDatabaseCollection('editing').then(async ({ collection }) => {
			let { litID, editingType, rateID } = uniqueRateData;

			let updatedObj = {};
			updatedObj[`editing.${editingType}.rates`] = {
				id: new ObjectId(rateID)
			}

			let result = await collection.findOneAndUpdate({
				_id: new ObjectId(litID)
			}, {
				$pull: updatedObj
			});

			if (result.ok) {
				let { value: { type } } = result;

				resolve(`Successfully removed ${editingType} rate from ${type} section`);
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