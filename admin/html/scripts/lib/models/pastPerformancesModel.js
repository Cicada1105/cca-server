"use strict";Object.defineProperty(exports,"__esModule",{value:true});exports.add=add;exports.edit=edit;exports.remove=remove;var server="http://localhost:8080/cca-admin-api/performance/past";function add(newPerformance){var name=newPerformance.name,description=newPerformance.description,_newPerformance$img=newPerformance.img,src=_newPerformance$img.src,alt=_newPerformance$img.alt;return new Promise(function(resolve,reject){fetch(server,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({name:name,description:description,img:{src:src,alt:alt}})}).then(function(response){response.json().then(function(data){resolve({msg:data.msg,status:response.status});});})["catch"](function(err){reject({msg:err,status:err.status});});});}function edit(updatedPerformance){console.log("Updating performance: ".concat(updatedPerformance));}function remove(performanceID){return new Promise(function(resolve,reject){fetch(server,{method:"DELETE",headers:{"Content-Type":"application/json"},body:JSON.stringify({id:performanceID})}).then(function(response){response.json().then(function(data){resolve({msg:data.msg,status:response.status});});})["catch"](function(err){reject({msg:err,status:err.status});});});}