"use strict";Object.defineProperty(exports,"__esModule",{value:true});exports.add=add;exports.edit=edit;exports.remove=remove;var SERVER_URL="http://localhost:2020/cca-admin-api/editing/genres";function add(_ref){var litID=_ref.litID,display=_ref.display,value=_ref.value;return new Promise(function(resolve,reject){fetch(SERVER_URL,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({litID:litID,display:display,value:value})}).then(function(response){response.json().then(function(data){return resolve({msg:data.msg,status:response.status});});})["catch"](function(err){reject({msg:err,status:err.status});});});}function edit(updatedGenre){return new Promise(function(resolve,reject){resolve({status:200,msg:"Updating the following genre: ".concat(updatedGenre)});});}function remove(_ref2){var litID=_ref2.litID,genreID=_ref2.genreID;return new Promise(function(resolve,reject){fetch(SERVER_URL,{method:"DELETE",headers:{"Content-Type":"application/json"},body:JSON.stringify({litID:litID,genreID:genreID})}).then(function(response){return response.json().then(function(data){return resolve({msg:data.msg,status:response.status});});})["catch"](function(err){return reject({msg:err.message,satus:err.status});});});}