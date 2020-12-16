"use strict";function _typeof(obj){"@babel/helpers - typeof";if(typeof Symbol==="function"&&typeof Symbol.iterator==="symbol"){_typeof=function _typeof(obj){return typeof obj;};}else{_typeof=function _typeof(obj){return obj&&typeof Symbol==="function"&&obj.constructor===Symbol&&obj!==Symbol.prototype?"symbol":typeof obj;};}return _typeof(obj);}Object.defineProperty(exports,"__esModule",{value:true});exports.addPastPerformance=addPastPerformance;exports.updatePastPerformance=updatePastPerformance;exports.removePastPerformance=removePastPerformance;var PastPerformances=_interopRequireWildcard(require("../models/pastPerformancesModel.js"));var _utils=require("../utils.js");function _getRequireWildcardCache(){if(typeof WeakMap!=="function")return null;var cache=new WeakMap();_getRequireWildcardCache=function _getRequireWildcardCache(){return cache;};return cache;}function _interopRequireWildcard(obj){if(obj&&obj.__esModule){return obj;}if(obj===null||_typeof(obj)!=="object"&&typeof obj!=="function"){return{"default":obj};}var cache=_getRequireWildcardCache();if(cache&&cache.has(obj)){return cache.get(obj);}var newObj={};var hasPropertyDescriptor=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var key in obj){if(Object.prototype.hasOwnProperty.call(obj,key)){var desc=hasPropertyDescriptor?Object.getOwnPropertyDescriptor(obj,key):null;if(desc&&(desc.get||desc.set)){Object.defineProperty(newObj,key,desc);}else{newObj[key]=obj[key];}}}newObj["default"]=obj;if(cache){cache.set(obj,newObj);}return newObj;}function addPastPerformance(event){var newPerformance="NEW PAST PERFORMANCE";PastPerformances.add(newPerformance);}function updatePastPerformance(event){var updatedPerformance="UPDATED PAST PERFORMANCE";PastPerformances.edit(updatedPerformance);}function removePastPerformance(event){var performanceID=event.target.dataset.id;PastPerformances.remove(performanceID).then(function(result){var msg=result.msg,status=result.status;alert("".concat(status,": ").concat(msg));document.location.reload();})["catch"](function(error){console.log("Error:");console.log(error);});}