/*
	File contains request methods for dealing directly with the corresponding data
*/

/*
	Future add documentation
*/
function add(newPerformance) {
	console.log(`Adding new future performance: ${newPerformance}`)
}
/*
	Future update documentation
*/
function update(performance) {
	console.log(`Updating existing future performance: ${performance}`)
}
/*
	Future remove documentation
*/
function remove(performanceID) {
	console.log(`Removing future performance with id of: ${performanceID}`);
}

module.exports = {
	add,
	update,
	remove
}