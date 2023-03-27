require("dotenv").config();
const nodemailer = require('nodemailer');

function Send(req,res) {
	let response;

	req.on('data', chunk => {
		let currData = JSON.parse(chunk);

		sendMail(currData).then((resp) => {
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
	const createTransport = () => {
		const transporter = nodemailer.createTransport({
			service: 'gmail',
			auth: {
				user: process.env.EMAIL_USER,
				pass: process.env.EMAIL_PASSWORD
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
	const mailerOptions = {
		from: userData.email,
		to: 'carl.colvin92@gmail.com',
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