"use strict";Object.defineProperty(exports,"__esModule",{value:true});exports.add=add;exports.update=update;exports.remove=remove;var server="http://localhost:2020/cca-admin-api/performance/past/anecdotes";function add(_ref){var name=_ref.name,title=_ref.title,anecdote=_ref.anecdote,_ref$img=_ref.img,src=_ref$img.src,alt=_ref$img.alt;return new Promise(function(resolve,reject){fetch(server,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({name:name,title:title,anecdote:anecdote,img:{src:src,alt:alt}})}).then(function(response){response.json().then(function(data){resolve({msg:data.msg,status:response.status});});})["catch"](function(err){reject({msg:err,status:err.status});});});}function update(anecdote){return new Promise(function(resolve,reject){fetch(server,{method:"PUT",headers:{"Content-Type":"application/json"}}).then(function(response){response.json().then(function(data){resolve({msg:data.msg,status:response.status});});})["catch"](function(err){reject({msg:err,status:err.status});});});}function remove(anecdoteID){return new Promise(function(resolve,reject){fetch(server,{method:"DELETE",headers:{"Content-Type":"application/json"},body:JSON.stringify({id:anecdoteID})}).then(function(response){response.json().then(function(data){resolve({msg:data.msg,status:response.status});});})["catch"](function(err){reject({msg:err,status:err.status});});});}