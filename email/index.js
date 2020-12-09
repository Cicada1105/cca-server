const nodemailer = require('nodemailer');

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
	let transporter = nodemailer.createTransport({
		host: "smtp.google.com",
		service: 'gmail',
		auth: {
			user:'carlcolvinarts@gmail.com',
			pass:'Sequestered_Sylvester92'
		}
	});

	let mailerOptions = {
		from: userData.email,
		to: 'joshicolvin@gmail.com',
		subject: "CarlColvinArts Website Message",
		text: `Subject: ${userData.subject}\nName: ${userData.name}\nEmail: ${userData.email}\nMessage: ${userData.message}\n ` 
	};

	let promise = new Promise(function(resolve, reject) {
		transporter.sendMail(mailerOptions, function(err, info) {
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