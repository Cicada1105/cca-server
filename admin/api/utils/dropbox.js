/*
	Utility file for handling Dropbox operations
*/
const https = require('https');
const { v4: uuid } = require('uuid');
const { getBodyData } = require('./misc.js');
const { removeFileExtension } = require('./file-handling.js');
const { getCookie } = require('../../utils');

async function  uploadDropboxImage( imageDataStream, fileExtension ) {
	const request = this;
	const db_token = getCookie('db_token',request);

	let dropBoxAPIArgs = {
			autorename: false,
			mute: false,
			path: `/Uploads/${uuid()}.${fileExtension}`
	};

	let args = {
		hostname: 'content.dropboxapi.com',
		path: 'files/upload',
		method: 'POST',
		headers: {
			'Dropbox-API-Arg' : JSON.stringify(dropBoxAPIArgs),
			'Authorization': `Bearer ${db_token}`,
			'Content-Type': 'application/octet-stream'
		},
		body: imageDataStream
	};

	let dropboxResponse = await makeDropboxRequest(args);
	if ( 'error' in dropboxResponse ) {
		return dropboxResponse;
	}
	else {
		let { name } = dropboxResponse;
		// Create a shared link to be used to access the image
		let { url } = await createSharedLink.call( db_token, name ) ;

		// Convert the URL to a Node URL object to update parameters
		let newURL = new URL( url );
		newURL.searchParams.set( 'dl', 1 );

		let dropboxImageURL = newURL.href;

		return dropboxImageURL;	
	}
}
async function updateDropboxImage( oldFileName, newFileName, imageDataStream ) {
	// Request is passed in as 'this' definition
	const request = this;

	// Remove old Dropbox image
	let deleteDropboxImgResponse = await deleteDropboxImage.call( request, `/Uploads/${oldFileName}` );
	if ( 'error' in deleteDropboxImgResponse ) {
		return deleteDropboxImgResponse;
	}
	
	// Retrieve the new image file extension to ensure newly created Dropbox image has proper extension
	let { fileExtension } = removeFileExtension( newFileName );
	// Upload image to Dropbox
	return uploadDropboxImage.call( request, imageDataStream, fileExtension );
}
async function deleteDropboxImage( imgPath ) {
	// Request is passed in as 'this' definition
	const request = this;
	const db_token = getCookie('db_token', request);

	let dropBoxAPIArgs = {
		'path': imgPath
	}

	let args = {
		hostname: 'api.dropboxapi.com',
		path: 'files/delete_v2',
		method: 'POST',
		headers: {
			'Authorization': `Bearer ${db_token}`,
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(dropBoxAPIArgs)
	}

	return await makeDropboxRequest(args);
}
async function createSharedLink(file) {
	// Request is passed in as 'this' definition
	const db_token = this;

	let data = await makeDropboxRequest({
		hostname: 'api.dropboxapi.com',
		path: 'sharing/create_shared_link_with_settings',
		method: 'POST',
		headers: {
			'Authorization': `Bearer ${db_token}`,
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({
			path: `/Uploads/${file}`	
		})
	});
	
	return data;
}
function makeDropboxRequest({ hostname, path, method, headers, body }) {
	return new Promise(( resolve, reject ) => {
		let _method = method || 'GET';
		let _headers = {
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
	uploadDropboxImage, updateDropboxImage, 
	deleteDropboxImage, makeDropboxRequest 
}