"use strict";Object.defineProperty(exports,"__esModule",{value:true});exports.add=add;exports.edit=edit;exports.remove=remove;var server="http://localhost:8080/cca-admin-api/reedmaking";function add(pricing){console.log("Adding to pricings: ".concat(pricing));}function edit(pricing){console.log("Updating the following pricings: ".concat(pricing));}function remove(pricingID){console.log("Removing the following pricingID: ".concat(pricingID));fetch(server,{method:"DELETE",headers:{"Content-Type":"application/json"},body:JSON.stringify({id:pricingID})}).then(function(response){var dataJSON=response.json();var data=JSON.parse(dataJSON);var status=response.status;console.log(status);console.log(data.msg);})["catch"](function(err){console.log(err);});}