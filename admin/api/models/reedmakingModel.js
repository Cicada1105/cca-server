/*
	File contains request methods for dealing directly with the corresponding data
*/

/*
	Future add documentation
*/
function add(newPricing) {
	console.log(`Adding new reedmaking pricing: ${newPricing}`)
}
/*
	Future update documentation
*/
function update(pricing) {
	console.log(`Updating existing reedmaking pricing: ${pricing}`)
}
/*
	Future remove documentation
*/
function remove(pricingID) {
	console.log(`Removing reedmaking pricing with id of: ${pricingID}`);
}

module.exports = {
	add,
	update,
	remove
}