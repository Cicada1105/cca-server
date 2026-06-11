require("dotenv").config();
const { Resend } = require('resend');

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
      console.log("Error:");
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
  const MAIL_OPTIONS = {
    from: 'onboarding@resend.dev',
    to: 'carlcolvinarts@gmail.com',
    subject: 'CarlColvinArts Website Message',
    html: `
      <h3 style="display:inline;">Subject:</h3> <p style="display:inline;font-size:0.9rem;">${userData.subject}</p><br />
      <h3 style="display:inline;">Name:</h3> <p style="display:inline;font-size:0.9rem;">${userData.name}</p><br />
      <h3 style="display:inline;">Email:</h3> <p style="display:inline;font-size:0.9rem;">${userData.email}</p><br />
      <h3 style="display:inline;">Message:</h3> <p style="display:inline;font-size:0.9rem;">${userData.message}</p><br />`
  }
  const promise = new Promise(function(resolve, reject) {
    try {
      const resend = new Resend(process.env.RESEND_API);
      resend.emails.send(MAIL_OPTIONS);
      resolve('sent');
    } catch(err) {
      reject(err);
    }
  });

  return promise;
}

module.exports = {
  Send
}