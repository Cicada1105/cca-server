"use strict";Object.defineProperty(exports,"__esModule",{value:true});exports.add=add;exports.edit=edit;exports.remove=remove;var server="http://localhost:2020/cca-admin-api/editing";function add(genre){return new Promise(function(resolve,reject){resolve({status:200,msg:"Adding the following genre: ".concat(genre)});});}function edit(updatedGenre){return new Promise(function(resolve,reject){resolve({status:200,msg:"Updating the following genre: ".concat(updatedGenre)});});}function remove(genre){return new Promise(function(resolve,reject){resolve({status:200,msg:"Deleting the following genre ".concat(genre)});});}