/* 
	File for interacting directly with reedmaking data
		Methods will make request to admin api that has access to the following CRUD methods:
		ADD
		UPDATE
		REMOVE

		Note: 	GET is "handled" by compiling the PUG templates and passing in
				the data as parameters to be rendered to the screen
*/

const server = "http://localhost:8080/cca-admin-api/reedmaking";
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
function remove(pricingID) {
	console.log(`Removing the following pricingID: ${pricingID}`);
	// Make request to server, passig in proper method, headers and body data
	fetch(server, {
		method: "DELETE",
		headers: {
			"Content-Type":"application/json"
		},
		body: JSON.stringify({ id: pricingID })
	}).then(response => {
		let dataJSON = response.json();
		let data = JSON.parse(dataJSON);
		let status = response.status;
		console.log(status);
		console.log(data.msg);
	}).catch(err => {
		console.log(err);
	});
}

export { add, edit, remove }