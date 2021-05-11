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
//const server = "http://localhost:2020/cca-admin-api/editing";
// Production server
const server = "https://cca-server.herokuapp.com/cca-admin-api/editing";

/*
	Fuure Add documentation
*/
function add(rateData) {
	return new Promise((resolve,reject) => {
		resolve({
			status:200,
			msg:`Adding the following rate: ${rateData}`
		});
	});
}
/*
	Future Edit documentation
*/
function edit(rate) {
	return new Promise((resolve,reject) => {
		resolve({
			status:200,
			msg:`Updating the following rate: ${rate}`
		});
	});
}
/*
	Future Remove documentation
*/
function remove(rate) {
	return new Promise((resolve,reject) => {
		resolve({
			status:200,
			msg:`Deleting the following rate: ${rate}`
		});
	});
}

export { add, edit, remove }