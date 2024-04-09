/*
  This file contains utility functions for across admin
*/
// Require filesystem to help read from files
const fs = require("fs");

function setCookie(cookieName, cookieValue, maxAge, res) {
  res.setHeader('Set-Cookie',`${cookieName}=${cookieValue};Max-Age=${maxAge}`);
}
function getCookie(cookieName, req) {
  let cookies = req.headers?.cookie;
  let foundCookie = false;

  if ( cookies ) {
    let cookieParts = cookies.split(';');
    for ( let cookie of cookieParts ) {
      let [name, value] = cookie.split('=');
      if ( cookieName === name.trim() ) {
        foundCookie = value;
        break;
      }
    }
  }
  
  return foundCookie;
}
function getFileData(file) {
  // Retrieve buffer stream from passed in file
  const buffer = fs.readFileSync(file);
  // Convert buffer into a readable string
  const json = buffer.toString();
  // Parse string to convert to json
  const data = JSON.parse(json);
  // Return data
  return data;
}

module.exports = {
  setCookie, getCookie, getFileData
}