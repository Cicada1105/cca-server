"use strict";Object.defineProperty(exports,"__esModule",{value:true});exports.initListeners=void 0;var _currentMusicController=require("./controllers/currentMusicController.js");var _editingController=require("./controllers/editingController.js");var _futurePerformancesController=require("./controllers/futurePerformancesController.js");var _pastPerformancesController=require("./controllers/pastPerformancesController.js");var _reedmakingController=require("./controllers/reedmakingController.js");var _utils=require("./utils.js");function _createForOfIteratorHelper(o,allowArrayLike){var it;if(typeof Symbol==="undefined"||o[Symbol.iterator]==null){if(Array.isArray(o)||(it=_unsupportedIterableToArray(o))||allowArrayLike&&o&&typeof o.length==="number"){if(it)o=it;var i=0;var F=function F(){};return{s:F,n:function n(){if(i>=o.length)return{done:true};return{done:false,value:o[i++]};},e:function e(_e){throw _e;},f:F};}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");}var normalCompletion=true,didErr=false,err;return{s:function s(){it=o[Symbol.iterator]();},n:function n(){var step=it.next();normalCompletion=step.done;return step;},e:function e(_e2){didErr=true;err=_e2;},f:function f(){try{if(!normalCompletion&&it["return"]!=null)it["return"]();}finally{if(didErr)throw err;}}};}function _unsupportedIterableToArray(o,minLen){if(!o)return;if(typeof o==="string")return _arrayLikeToArray(o,minLen);var n=Object.prototype.toString.call(o).slice(8,-1);if(n==="Object"&&o.constructor)n=o.constructor.name;if(n==="Map"||n==="Set")return Array.from(o);if(n==="Arguments"||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))return _arrayLikeToArray(o,minLen);}function _arrayLikeToArray(arr,len){if(len==null||len>arr.length)len=arr.length;for(var i=0,arr2=new Array(len);i<len;i++){arr2[i]=arr[i];}return arr2;}var initListeners=function initListeners(){var pastCards=document.getElementsByClassName("pastCard");var presentCards=document.getElementsByClassName("presentCard");var futureCards=document.getElementsByClassName("futureCard");var _iterator=_createForOfIteratorHelper(pastCards),_step;try{for(_iterator.s();!(_step=_iterator.n()).done;){var card=_step.value;var controlsCont=card.lastElementChild;var controlsConts=controlsCont.querySelectorAll("[class *= ctrlBtn]");var editBtnCont=controlsConts[0];var deleteBtnCont=controlsConts[1];editBtnCont.addEventListener("click",_utils.handleEditDeleteClick.bind(_pastPerformancesController.updatePastPerformance));deleteBtnCont.addEventListener("click",_utils.handleEditDeleteClick.bind(_pastPerformancesController.removePastPerformance));}}catch(err){_iterator.e(err);}finally{_iterator.f();}var _iterator2=_createForOfIteratorHelper(presentCards),_step2;try{for(_iterator2.s();!(_step2=_iterator2.n()).done;){var _card=_step2.value;var _controlsCont=_card.lastElementChild;var _controlsConts=_controlsCont.querySelectorAll("[class *= ctrlBtn]");var _editBtnCont=_controlsConts[0];var _deleteBtnCont=_controlsConts[1];_editBtnCont.addEventListener("click",_utils.handleEditDeleteClick.bind(_currentMusicController.updateSong));_deleteBtnCont.addEventListener("click",_utils.handleEditDeleteClick.bind(_currentMusicController.removeSong));}}catch(err){_iterator2.e(err);}finally{_iterator2.f();}var _iterator3=_createForOfIteratorHelper(futureCards),_step3;try{for(_iterator3.s();!(_step3=_iterator3.n()).done;){var _card2=_step3.value;var _controlsCont2=_card2.lastElementChild;var _controlsConts2=_controlsCont2.querySelectorAll("[class *= ctrlBtn]");var _editBtnCont2=_controlsConts2[0];var _deleteBtnCont2=_controlsConts2[1];_editBtnCont2.addEventListener("click",_utils.handleEditDeleteClick.bind(_futurePerformancesController.updateFuturePerformance));_deleteBtnCont2.addEventListener("click",_utils.handleEditDeleteClick.bind(_futurePerformancesController.removeFuturePerformance));}}catch(err){_iterator3.e(err);}finally{_iterator3.f();}};exports.initListeners=initListeners;