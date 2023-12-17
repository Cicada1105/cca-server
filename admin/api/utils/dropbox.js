/*
	Utility file for handling Dropbox operations
*/
const https = require('https');
const { v4: uuid } = require('uuid');
const { getBodyData } = require('./misc.js');

async function uploadDropboxImage( imageDataStream, fileExtension ) {
	return await makeDropboxRequest({
		hostname: 'content.dropboxapi.com',
		path: 'files/upload',
		method: 'POST',
		headers: {
			'Dropbox-API-Arg' : JSON.stringify({
				autorename: false,
				mode: 'add',
				mute: false,
				path: `/Uploads/${uuid()}.${fileExtension}`
			}),
			'Content-Type': 'application/octet-stream'
		},
		body: imageDataStream
	});
}
async function createSharedLink(file) {
	return await makeDropboxRequest({
		hostname: 'api.dropboxapi.com',
		path: 'sharing/create_shared_link_with_settings',
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({
			path: `/Uploads/${file}`	
		})
	});
}
function makeDropboxRequest({ hostname, path, method, headers, body }) {
	return new Promise(( resolve, reject ) => {
		let _method = method || 'GET';
		let _headers = {
			'Authorization': `Bearer ${process.env.DROPBOX_ACCESS_TOKEN}`,
			...headers
		}
		if ( !path || !hostname ) {
			return;
		}
		let options = {
			hostname,
			path: `/2/${path}`,
			method: _method,
			headers: _headers,
		}
		let req = https.request( options, (res) => {
			getBodyData(res).then( data => {
				resolve(data);
			}).catch( err => reject(err) );
		});

		method !== 'GET' && body && req.write( body );
		req.end();
	});
}

module.exports = {
	uploadDropboxImage, createSharedLink, 
	makeDropboxRequest
}