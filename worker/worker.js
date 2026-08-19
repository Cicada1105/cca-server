const https = require('https');
const { parentPort } = require('worker_threads');

// Server link
const SERVER_DOMAIN = process.env.SERVER_URL;
const SERVER_PORT = process.env.PORT;
const SERVER_ENVIRONMENT = process.env.ENVIRONMENT;
const SERVER_URL = SERVER_ENVIRONMENT === 'dev' ? `${SERVER_DOMAIN}:${SERVER_PORT}` : SERVER_DOMAIN;

parentPort.on('message',(data) => {
  let { interval } = data;
  let options = {
    path: '/ping',
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  }

  setInterval(() => {
    let req = https.request( SERVER_URL, options, (res) => {
      let response = "";
      res.on("data", (chunk) => response += chunk);

      res.on("end", () => {
        let dataStr = response.toString();
        let body = JSON.parse(dataStr);
        
        console.log(body['msg']);
      });
      
      res.on("error", (err) => console.error(err));
    });
    req.end();

  },interval);
});