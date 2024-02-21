/*
	Utility file for handling Dropbox operations
*/
const https = require('https');
const { v4: uuid } = require('uuid');
const { getBodyData } = require('./misc.js');
const { removeFileExtension } = require('./file-handling.js');

async function uploadDropboxImage( imageDataStream, fileExtension ) {
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
			'Content-Type': 'application/octet-stream'
		},
		body: imageDataStream
	};

	let { name } = await makeDropboxRequest(args);
	// Create a shared link to be used to access the image
	let { url } = await createSharedLink( name ) ;

	// Convert the URL to a Node URL object to update parameters
	let newURL = new URL( url );
	newURL.searchParams.set( 'dl', 1 );

	let dropboxImageURL = newURL.href;

	return dropboxImageURL;
}
async function updateDropboxImage( oldFileName, newFileName, imageDataStream ) {
	// Remove old Dropbox image
	await deleteDropboxImage( `/Uploads/${oldFileName}` );
	// Retrieve the new image file extension to ensure newly created Dropbox image has proper extension
	let { fileExtension } = removeFileExtension( newFileName );
	// Upload image to Dropbox
	return uploadDropboxImage( imageDataStream, fileExtension );
}
async function deleteDropboxImage( imgPath ) {
	let dropBoxAPIArgs = {
		'path': imgPath
	}

	let args = {
		hostname: 'api.dropboxapi.com',
		path: 'files/delete_v2',
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(dropBoxAPIArgs)
	}

	return await makeDropboxRequest(args);
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
	uploadDropboxImage, updateDropboxImage, 
	deleteDropboxImage, makeDropboxRequest 
}