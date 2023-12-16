/*
	This file is the model for the login system.
	Handles checking login info and possible creating user
*/
// Require method to retrieve file data
const { getFileData } = require("../../utils.js");
// Require bcrypt for checking hashes
const bcrypt = require("bcrypt");

function isValidUser({ username, password }) {
	return new Promise(async (resolve,reject) => {
		// Get uses
		const user = getFileData(process.env.LOGIN_INFO_PATH);

		// Check if user name matches
		if (user["username"] === username) {
			// Check if user password matches using bcrypt
			if (await bcrypt.compare(password,user["password"])) 
				resolve("Successfully logged in!");
			else 
				reject({passErrMsg:"Invalid Password!"});
		}
		else
			reject({userErrMsg:"Invalid Username!"});
	})
}

module.exports = {
	isValidUser
}