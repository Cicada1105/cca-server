/*
	File contains request methods for dealing directly with the corresponding data
*/

/*
	Future add documentation
*/
function add(newSong) {
	console.log(`Adding new song: ${newSong}`);
}
/*
	Future update documentation
*/
function update(song) {
	console.log(`Updating existing song: ${song}`);
}
/*
	Future remove documentation
*/
function remove(songID) {
	console.log(`Removing song with id of: ${songID}`);
}

module.exports = {
	add,
	update,
	remove
}