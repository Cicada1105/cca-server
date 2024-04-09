/*
  File for handling the OAuth workflow
*/
const https = require('https');
const { getBodyData } = require('../api/utils/misc.js');
// Include helper function for setting cookie
const { setCookie } = require('./misc.js');

const state = '82828b7c-85c3-468f-acac-73e8c8005953';
const DROPBOX_AUTH_ENDPOINT = 'https://www.dropbox.com';
const SERVER_URL = process.env.SERVER_URL;

function startAuthorization(req,res) {
  let params = new URLSearchParams({
    state,
    response_type: 'code',
    client_id: process.env.DROPBOX_APP_KEY,
    redirect_uri: `${SERVER_URL}/cca-admin-authorize`,
    client_secret: process.env.DROPBOX_APP_SECRET
  });

  let reqURL = new URL(`${DROPBOX_AUTH_ENDPOINT}/oauth2/authorize?${params.toString()}`)

  res.writeHead( 301, { 'Location': reqURL } );
  res.end();
}
function generateToken(req,res) {
  let currentURL = new URL(`${SERVER_URL}${req.url}`);
  let code = currentURL.searchParams.get('code');

  let params = new URLSearchParams({
    code,
    grant_type: 'authorization_code',
    redirect_uri: `${SERVER_URL}/cca-admin-authorize`,
    client_id: process.env.DROPBOX_APP_KEY,
    client_secret: process.env.DROPBOX_APP_SECRET
  });

  let options = {
    hostname: 'api.dropbox.com',
    path: `/oauth2/token?${params.toString()}`,
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencodede'
    },
  }

  let tokenReq = https.request( options, (tokenRes) => {
    getBodyData(tokenRes).then( data => {
      let { access_token } = data;
      
      // Dropbox cookie can expire in a week
      const weekInSeconds = 60 * 60 * 24 * 7;
      setCookie('db_token', access_token, weekInSeconds, res);
      
      res.setHeader('Location', `${SERVER_URL}/cca-admin-control-panel`)

      res.writeHead( 302 );
      res.end();
    }).catch( err => console.error( err ) );
  });

  tokenReq.end();
}
function compareState( stateToTest ) {
  return stateToTest === state;
}
module.exports = { startAuthorization, generateToken, compareState }