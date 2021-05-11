/* 
	File for interacting directly with editting data
		Methods will make request to admin api that has access to the following CRUD methods:
		ADD
		UPDATE
		REMOVE

		Note: 	GET is "handled" by compiling the PUG templates and passing in
				the data as parameters to be rendered to the screen
*/

// Development server
const server = "http://localhost:2020/cca-admin-api/editing";
// Production server
//const server = "https://cca-server.herokuapp.com/cca-admin-api/performance/future";

/*
	Fuure Add documentation
*/
function add(genre) {
	return new Promise((resolve,reject) => {
		resolve({
			status:200,
			msg: `Adding the following genre: ${genre}`
		});
	});
}
/*
	Future Edit documentation
*/
function edit(updatedGenre) {
	return new Promise((resolve,reject) => {
		resolve({
			status:200,
			msg:`Updating the following genre: ${updatedGenre}`
		});
	});
}
/*
	Future Remove documentation
*/
function remove(genre) {
	return new Promise((resolve,reject) => {
		resolve({
			status:200,
			msg:`Deleting the following genre ${genre}`
		});
	});
}

export { add, edit, remove }