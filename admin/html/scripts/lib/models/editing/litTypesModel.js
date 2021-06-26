"use strict";Object.defineProperty(exports,"__esModule",{value:true});exports.add=add;exports.edit=edit;exports.remove=remove;var SERVER_URL="http://localhost:2020/cca-admin-api/editing/literature_types";function add(_ref){var type=_ref.type,genres=_ref.genres,_ref$rates=_ref.rates,standard_proofreading=_ref$rates.standard_proofreading,developmental_editing=_ref$rates.developmental_editing,both=_ref$rates.both;return new Promise(function(resolve,reject){fetch(SERVER_URL,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({type:type,genres:genres,rates:{standard_proofreading:standard_proofreading,developmental_editing:developmental_editing,both:both}})}).then(function(response){response.json().then(function(data){return resolve({msg:data.msg,status:response.status});});})["catch"](function(err){return reject({msg:err,status:err.status});});});}function edit(updatedLitType){return new Promise(function(resolve,reject){resolve({status:200,msg:"Updating the following literature data: ".concat(updatedLitType)});});}function remove(litType){return new Promise(function(resolve,reject){resolve({status:200,msg:"Deleting the following literature data: ".concat(litType)});});}