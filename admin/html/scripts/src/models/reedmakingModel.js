/* 
	File for interacting directly with reedmaking data
		Methods will make request to admin api that has access to the following CRUD methods:
		ADD
		UPDATE
		REMOVE

		Note: 	GET is "handled" by compiling the PUG templates and passing in
				the data as parameters to be rendered to the screen
*/

/*
	Future Add documentation
*/
function add(pricing) {
	console.log(`Adding to pricings: ${pricing}`);
}
/*
	Future Edit documentation
*/
function edit(pricing) {
	console.log(`Updating the following pricings: ${pricing}`);
}
/*
	Future Remove documentation
*/
function remove(pricing) {
	console.log(`Removing the following pricing: ${pricing}`);
}

export { add, edit, remove }