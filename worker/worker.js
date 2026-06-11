const http = require('http');
const { parentPort } = require('worker_threads');

const PORT = 2020
parentPort.on('message',(data) => {
  let { interval } = data;
  let options = {
    port: PORT,
    path: '/ping',
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  }

  setInterval(() => {
    let req = http.request( options, (res) => {
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