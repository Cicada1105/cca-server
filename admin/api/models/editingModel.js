/*
	File contains request methods for dealing directly with the corresponding data
*/

/*
	Future add documentation
*/
function add(newPricing) {
	console.log(`Adding new editing pricing: ${newPricing}`)
}
/*
	Future update documentation
*/
function update(pricing) {
	console.log(`Updating existing editing pricing: ${pricing}`)
}
/*
	Future remove documentation
*/
function remove(pricingID) {
	console.log(`Removing editing pricing with id of: ${pricingID}`);
}

module.exports = {
	add,
	update,
	remove
}