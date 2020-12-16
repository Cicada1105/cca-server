/*
	File contains request methods for dealing directly with the corresponding data
*/

// Import performance data to be used by the model
const performancesPath = "./site_data/performance.json";
// Import fs to handle file calls
const fs = require("fs");

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
	return new Promise((resolve,reject) => {
		console.log(`Removing present performance with id of: ${songID}`);

		// Get performances from file
		const performancesBuffer = fs.readFileSync(performancesPath);
		const performancesJSON = performancesBuffer.toString();
		const performances = JSON.parse(performancesJSON);
		
		let index = performances["present"].findIndex((performance) => performance.id === songID);
		if (index === -1)
			reject(`Unable to find present performance with id of: ${songID}`);
		else {
			// Filter out present performance who's ID matches that of songID
			let updatedPresentPerformances = performances["present"].filter((performance) => performance.id !== songID );
			// Update present performances with rest of data
			let updatedPerformances = {...performances,"present":updatedPresentPerformances};
			// Update file, reflectting new performances
			fs.writeFile("./site_data/performance.json",JSON.stringify(updatedPerformances),"utf8",(err) => {
				if (err) {
					console.log(err);
					reject("Internal Server Error. Try again later");
				}
				else {
					console.log("Updated present performances");
					console.log(updatedPerformances);
					resolve("Successfully removed present performance!");
				}
			});
		}
	})
}

module.exports = {
	add,
	update,
	remove
}