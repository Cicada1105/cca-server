"use strict";Object.defineProperty(exports,"__esModule",{value:true});exports.edit=edit;var SERVER_URL="http://localhost:2020/cca-admin-api/reedmaking";function edit(description){return new Promise(function(resolve,reject){resolve({msg:"Successfully editted reed description: ".concat(description),status:200});});}