require("dotenv").config();
const nodemailer = require('nodemailer');
const { google } = require("googleapis");
const { retrieveClientInfo, updateClientInfo } = require("./utils.js");

function Send(req,res) {
	let response;

	req.on('data', chunk => {
		let currData = JSON.parse(chunk);

		sendMail(currData).then((resp) => {
			console.log(resp);
			response = resp;
			res.writeHead(200,{
				"Content-Type":"application/json"
			});
			res.end(JSON.stringify({
				msg:"Successfully sent email"
			}));
		}).catch((err) => {
			console.log("Error:\n");
			console.log(err);
			res.writeHead(404,{
				"Content-Type":"application/json"
			});
			res.end(JSON.stringify({
				msg:"Unable to send email at this time"
			}));
		});
	});
}
function sendMail(userData) {
	const createTransport = async () => {
		const CLIENT_ID = retrieveClientInfo("client_id");
		const CLIENT_SECRET = retrieveClientInfo("client_secret");
		const REFRESH_TOKEN = retrieveClientInfo("refresh_token");
		const ACCESS_TOKEN = retrieveClientInfo("access_token");

		const oauth2Client = new google.auth.OAuth2(
			CLIENT_ID,
			CLIENT_SECRET,
			'https://developers.google.com/oauthplayground'
		);
		oauth2Client.setCredentials({
			refresh_token: tokens.refresh_token
		});
		// Listen for new token events to have the latest, most updated tokens
		/*oauth2Client.on("token",(tokens) => {
			if (tokens.refresh_token) {
				oauth2Client.setCredentials({
					refresh_token: tokens.refresh_token
				});
			}
			else { // Received an access token
				updateClientInfo("access_token",tokens.access_token);
			}
		})*/

		const accessToken = await new Promise((resolve,reject) => {
			oauth2Client.getToken((err, token) => {
				err && reject(err);
				resolve(token);
			})
		})
		console.log(`accessToken = ${accessToken}`);
		const transporter = nodemailer.createTransport({
			host: "smtp.google.com",
			service: 'gmail',
			port: 465,
			secure:true,
			auth: {
				type:"OAuth2",
				user:'carlcolvinarts@gmail.com',
				clientId: CLIENT_ID,
				clientSecret: CLIENT_SECRET,
				refreshToken: REFRESH_TOKEN,
				accessToken
			}
		});
		transporter.verify((err, success) => {
			if (err)
				console.log(err);
			else 
				console.log("transporter ready to take messages");
		})

		return transporter;
	}
	/*const transporter = nodemailer.createTransport({
		host: "smtp.google.com",
		service: 'gmail',
		port: 465,
		auth: {
			user:'carlcolvinarts@gmail.com',
			pass:'Sequestered_Invester92'
		}
	});*/
	const mailerOptions = {
		from: userData.email,
		to: 'joshicolvin@gmail.com',
		subject: "CarlColvinArts Website Message",
		html: `
			<h3 style="display:inline;">Subject:</h3> <p style="display:inline;font-size:0.9rem;">${userData.subject}</p><br />
			<h3 style="display:inline;">Name:</h3> <p style="display:inline;font-size:0.9rem;">${userData.name}</p><br />
			<h3 style="display:inline;">Email:</h3> <p style="display:inline;font-size:0.9rem;">${userData.email}</p><br />
			<h3 style="display:inline;">Message:</h3> <p style="display:inline;font-size:0.9rem;">${userData.message}</p><br /> ` 
	};
	const promise = new Promise(function(resolve, reject) {
		createTransport().sendMail(mailerOptions, function(err, info) {
			if (err) 
				reject(err)
			else 
				resolve(info);
		});
	});

	return promise;
}

module.exports = {
	Send
}