/*
	File for handling repetitive API tasks
*/
// Require utiltiy functions from other files
// 	File handling 
const { writeToFile, convertToImage, removeImage } = require('./file-handling.js');
//	Dropbox
const {
	uploadDropboxImage, updateDropboxImage,
	createSharedLink, makeDropboxRequest
} = require('./dropbox.js');
//	Miscelaneous
const { getBodyData } = require('./misc.js');


module.exports = {
	writeToFile, convertToImage, removeImage,
	uploadDropboxImage, updateDropboxImage, 
	createSharedLink, makeDropboxRequest,
	getBodyData
}