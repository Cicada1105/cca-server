"use strict";Object.defineProperty(exports,"__esModule",{value:true});exports.add=add;exports.edit=edit;exports.remove=remove;var server="http://localhost:2020/cca-admin-api/performance/present";function add(_ref){var name=_ref.name,by=_ref.by,description=_ref.description;return new Promise(function(resolve,reject){fetch(server,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({name:name,by:by,description:description})}).then(function(response){response.json().then(function(data){resolve({msg:data.msg,status:response.status});});})["catch"](function(err){reject({msg:err,status:err.status});});});}function edit(currentSong){console.log("Updating current music: ".concat(currentSong));}function remove(songID){return new Promise(function(resolve,reject){fetch(server,{method:"DELETE",headers:{"Content-Type":"application/json"},body:JSON.stringify({id:songID})}).then(function(response){response.json().then(function(data){resolve({msg:data.msg,status:response.status});});})["catch"](function(err){reject({msg:err,status:err.status});});});}