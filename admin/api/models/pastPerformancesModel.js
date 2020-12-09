/*
	File contains request methods for dealing directly with the corresponding data
*/

/*
	Future add documentation
*/
function add(newPerformance) {
	console.log(`Adding new past performance: ${newPerformance}`)
}
/*
	Future update documentation
*/
function update(performance) {
	console.log(`Updating existing past performance: ${performance}`)
}
/*
	Future remove documentation
*/
function remove(performanceID) {
	console.log(`Removing past performance with id of: ${performanceID}`);
}

module.exports = {
	add,
	update,
	remove
}