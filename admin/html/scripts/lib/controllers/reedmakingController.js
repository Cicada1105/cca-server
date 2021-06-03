"use strict";function _typeof(obj){"@babel/helpers - typeof";if(typeof Symbol==="function"&&typeof Symbol.iterator==="symbol"){_typeof=function _typeof(obj){return typeof obj;};}else{_typeof=function _typeof(obj){return obj&&typeof Symbol==="function"&&obj.constructor===Symbol&&obj!==Symbol.prototype?"symbol":typeof obj;};}return _typeof(obj);}Object.defineProperty(exports,"__esModule",{value:true});exports.addReedmakingPricing=addReedmakingPricing;exports.updateReedmakingPricing=updateReedmakingPricing;exports.removeReedmakingPricing=removeReedmakingPricing;var Reedmaking=_interopRequireWildcard(require("../models/reedmakingModel.js"));var _utils=require("./utils.js");function _getRequireWildcardCache(nodeInterop){if(typeof WeakMap!=="function")return null;var cacheBabelInterop=new WeakMap();var cacheNodeInterop=new WeakMap();return(_getRequireWildcardCache=function _getRequireWildcardCache(nodeInterop){return nodeInterop?cacheNodeInterop:cacheBabelInterop;})(nodeInterop);}function _interopRequireWildcard(obj,nodeInterop){if(!nodeInterop&&obj&&obj.__esModule){return obj;}if(obj===null||_typeof(obj)!=="object"&&typeof obj!=="function"){return{"default":obj};}var cache=_getRequireWildcardCache(nodeInterop);if(cache&&cache.has(obj)){return cache.get(obj);}var newObj={};var hasPropertyDescriptor=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var key in obj){if(key!=="default"&&Object.prototype.hasOwnProperty.call(obj,key)){var desc=hasPropertyDescriptor?Object.getOwnPropertyDescriptor(obj,key):null;if(desc&&(desc.get||desc.set)){Object.defineProperty(newObj,key,desc);}else{newObj[key]=obj[key];}}}newObj["default"]=obj;if(cache){cache.set(obj,newObj);}return newObj;}function addReedmakingPricing(event){var pricing="NEW REEDMAKING PRICING";Reedmaking.add(pricing).then(_utils.successCallback)["catch"](_utils.failedCallback);}function updateReedmakingPricing(event){var pricing="UPDATING REEDMAKING PRICING";Reedmaking.edit(pricing).then(_utils.successCallback)["catch"](_utils.failedCallback);}function removeReedmakingPricing(event){var pricingID=event.target.dataset.id;Reedmaking.remove(pricingID).then(_utils.successCallback)["catch"](_utils.failedCallback);}