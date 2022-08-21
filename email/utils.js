const fs = require("fs");
const CLIENT_INFO = "./client_info.json";

function retrieveClientInfo(key) {
	const data = fs.readFileSync(CLIENT_INFO);

	const web_client_info = JSON.parse(data);

	const info = web_client_info["web"];

	return (key in info) ? info[key] : "";
}
function updateClientInfo(key,value) {
	const data = fs.readFileSync(CLIENT_INFO);

	const web_client_info = JSON.parse(data);

	const info = web_client_info["web"];

	if (key in info) {
		// Update "web" object
		info[key] = value;
		// Update web_client_info
		web_client_info["web"] = info;
		// Write web_client_info to file
		fs.writeFileSync(CLIENT_INFO,JSON.stringify(web_client_info));
	}
}

module.exports = {
	retrieveClientInfo, updateClientInfo
}