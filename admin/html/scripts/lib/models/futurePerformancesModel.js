"use strict";Object.defineProperty(exports,"__esModule",{value:true});exports.add=add;exports.edit=edit;exports.remove=remove;var server="http://localhost:8080/cca-admin-api/performance/future";function add(newPerformance){var name=newPerformance.name,location=newPerformance.location,instruments=newPerformance.instruments,_newPerformance$date_=newPerformance.date_time,date=_newPerformance$date_.date,_newPerformance$date_2=_newPerformance$date_.time,start=_newPerformance$date_2.start,end=_newPerformance$date_2.end,description=newPerformance.description;return new Promise(function(resolve,reject){fetch(server,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({name:name,location:location,instruments:instruments,date_time:{date:date,time:{start:start,end:end}},description:description})}).then(function(response){response.json().then(function(data){resolve({msg:data.msg,status:response.status});});})["catch"](function(err){reject({msg:err,status:err.status});});});}function edit(updatedPerformance){console.log("Updating performance: ".concat(updatedPerformance));}function remove(performanceID){return new Promise(function(resolve,reject){fetch(server,{method:"DELETE",headers:{"Content-Type":"application/json"},body:JSON.stringify({id:performanceID})}).then(function(response){response.json().then(function(data){resolve({msg:data.msg,status:response.status});});})["catch"](function(err){reject({msg:err,status:err.status});});});}