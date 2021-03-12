"use strict";Object.defineProperty(exports,"__esModule",{value:true});exports.add=add;exports.edit=edit;exports.remove=remove;var server="http://localhost:2020/cca-admin-api/reedmaking";function add(_ref){var name=_ref.name,description=_ref.description,pricing=_ref.pricing;return new Promise(function(resolve,reject){fetch(server,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({name:name,description:description,pricing:pricing})}).then(function(response){response.json().then(function(data){resolve({msg:data["msg"],status:response.status});})["catch"](function(err){reject({msg:err,status:err.status});});});});}function edit(_ref2){var id=_ref2.id,name=_ref2.name,description=_ref2.description,pricing=_ref2.pricing;return new Promise(function(resolve,reject){fetch(server,{method:"PUT",headers:{"Content-Type":"application/json"},body:JSON.stringify({id:id,name:name,description:description,pricing:pricing})}).then(function(response){response.json().then(function(data){resolve({msg:data["msg"],status:response.status});})["catch"](function(err){reject({msg:err,status:err.status});});});});}function remove(pricingID){console.log("Removing the following pricingID: ".concat(pricingID));fetch(server,{method:"DELETE",headers:{"Content-Type":"application/json"},body:JSON.stringify({id:pricingID})}).then(function(response){var dataJSON=response.json();var data=JSON.parse(dataJSON);var status=response.status;console.log(status);console.log(data.msg);})["catch"](function(err){console.log(err);});}