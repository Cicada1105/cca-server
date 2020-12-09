/* 
	File for interacting directly with editting data
		Methods will make request to admin api that has access to the following CRUD methods:
		ADD
		UPDATE
		REMOVE

		Note: 	GET is "handled" by compiling the PUG templates and passing in
				the data as parameters to be rendered to the screen
*/

/*
	Fuure Add documentation
*/
function add(pricingData) {
	console.log(`Adding the following to pricings: ${pricingData}`);
}
/*
	Future Edit documentation
*/
function edit(updatedPricing) {
	console.log(`Updating the following pricing: ${updatedPricing}`);
}
/*
	Future Remove documentation
*/
function remove(pricingToBeRemoved) {
	console.log(`Deleting ${pricingToBeRemoved} from pricings`);
}

export { add, edit, remove }