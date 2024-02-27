/*
	File for handling repetitive API tasks
*/
// Require utiltiy functions from other files
// 	File handling 
const { writeToFile, removeFileExtension, removeImage } = require('./file-handling.js');
//	Dropbox
const {
	uploadDropboxImage, updateDropboxImage, 
	deleteDropboxImage, makeDropboxRequest
} = require('./dropbox.js');
//	Miscelaneous
const { getBodyData } = require('./misc.js');


module.exports = {
	writeToFile, removeFileExtension, removeImage,
	uploadDropboxImage, updateDropboxImage,
	deleteDropboxImage, makeDropboxRequest, 
	getBodyData
}