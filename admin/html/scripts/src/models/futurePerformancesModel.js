/* 
	File for interacting directly with future performances data
		Methods will make request to admin api that has access to the following CRUD methods:
		ADD
		UPDATE
		REMOVE

		Note: 	GET is "handled" by compiling the PUG templates and passing in
				the data as parameters to be rendered to the screen
*/

/*
	Future add documentation
*/
function add(newPerformance) {
	console.log(`Adding ${newPerformance}`);
}
/*
	Future edit documentation
*/
function edit(updatedPerformance) {
	console.log(`Updating performance: ${updatedPerformance}`);
}
/*
	Future remove documentation
*/
function remove(performanceID) {
	console.log(`Deleting future performance with ${performanceID} ID`);
}

export { add, edit, remove }