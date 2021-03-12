"use strict";function _typeof(obj){"@babel/helpers - typeof";if(typeof Symbol==="function"&&typeof Symbol.iterator==="symbol"){_typeof=function _typeof(obj){return typeof obj;};}else{_typeof=function _typeof(obj){return obj&&typeof Symbol==="function"&&obj.constructor===Symbol&&obj!==Symbol.prototype?"symbol":typeof obj;};}return _typeof(obj);}Object.defineProperty(exports,"__esModule",{value:true});exports.addGenre=addGenre;exports.updateGenre=updateGenre;exports.removeGenre=removeGenre;var Genre=_interopRequireWildcard(require("../../models/editing/genresModel.js"));var _utils=require("../utils.js");function _getRequireWildcardCache(){if(typeof WeakMap!=="function")return null;var cache=new WeakMap();_getRequireWildcardCache=function _getRequireWildcardCache(){return cache;};return cache;}function _interopRequireWildcard(obj){if(obj&&obj.__esModule){return obj;}if(obj===null||_typeof(obj)!=="object"&&typeof obj!=="function"){return{"default":obj};}var cache=_getRequireWildcardCache();if(cache&&cache.has(obj)){return cache.get(obj);}var newObj={};var hasPropertyDescriptor=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var key in obj){if(Object.prototype.hasOwnProperty.call(obj,key)){var desc=hasPropertyDescriptor?Object.getOwnPropertyDescriptor(obj,key):null;if(desc&&(desc.get||desc.set)){Object.defineProperty(newObj,key,desc);}else{newObj[key]=obj[key];}}}newObj["default"]=obj;if(cache){cache.set(obj,newObj);}return newObj;}function addGenre(event){var genre="ADDING GENRE";Genre.add(genre).then(_utils.successCallback)["catch"](_utils.failedCallback);}function updateGenre(event){var genre="UPDATING GENRE";Genre.edit(genre).then(_utils.successCallback)["catch"](_utils.failedCallback);}function removeGenre(event){var genreID=event.target.dataset["id"];Genre.remove(genreID).then(_utils.successCallback)["catch"](_utils.failedCallback);}