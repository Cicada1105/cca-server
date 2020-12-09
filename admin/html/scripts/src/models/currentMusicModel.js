/* 
	File for interacting directly with current music data
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
function add(newSong) {
	console.log(`Adding ${newSong}`);
}
/*
	Future edit documentation
*/
function edit(currentSong) {
	console.log(`Updating current music: ${currentSong}`);
}
/*
	Future remove documentation
*/
function remove(songID) {
	console.log(`Deleting music with ${songID} ID`);
}

export { add, edit, remove }