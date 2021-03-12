"use strict";Object.defineProperty(exports,"__esModule",{value:true});exports.addPastCardListener=addPastCardListener;exports.addCollaboratorCardListener=addCollaboratorCardListener;exports.addPresentCardListener=addPresentCardListener;exports.addFutureCardListener=addFutureCardListener;var _generic=require("./generic.js");var _utils=require("./utils.js");function addPastCardListener(event){var addPastPerformance=this;var addBtn=event.path[0];var addCard=addBtn.nextElementSibling;var form=addCard.firstElementChild;var fileInputBtn=form.getElementsByClassName("fileCont")[0].firstElementChild;var instrumentsCont=form.querySelector("#instrumentsCont");var addInstrumentBtn=instrumentsCont.querySelector("input[type='button']");if(getComputedStyle(addCard).display==="none"){fileInputBtn.addEventListener("change",_utils.fileSelect,{capture:false});addInstrumentBtn.addEventListener("click",_utils.addToList,{capture:false});}else{fileInputBtn.removeEventListener("change",_utils.fileSelect,{capture:false});addInstrumentBtn.removeEventListener("click",_utils.addToList,{capture:false});}var cardControlMethods={submitMethod:addPastPerformance,clearMethod:_utils.clearPastForm.bind(form)};var cardListener=_generic.addCardListener.bind(cardControlMethods,event);cardListener();}function addCollaboratorCardListener(event){var addCollaborator=this;var addBtn=event.path[0];var addCard=addBtn.nextElementSibling;var form=addCard.firstElementChild;var cardControlMethods={submitMethod:addCollaborator,clearMethod:_utils.clearCollaboratorForm.bind(form)};var cardListener=_generic.addCardListener.bind(cardControlMethods,event);cardListener();}function addPresentCardListener(event){var addSong=this;var addBtn=event.path[0];var addCard=addBtn.nextElementSibling;var form=addCard.firstElementChild;var cardControlMethods={submitMethod:addSong,clearMethod:_utils.clearPresentForm.bind(form)};var cardListener=_generic.addCardListener.bind(cardControlMethods,event);cardListener();}function addFutureCardListener(event){var addFuturePerformance=this;var addBtn=event.path[0];var addCard=addBtn.nextElementSibling;var form=addCard.firstElementChild;var instrumentsCont=form.querySelector("#instrumentsCont");var addInstrumentBtn=instrumentsCont.querySelector("input[type='button']");if(getComputedStyle(addCard).display==="none")addInstrumentBtn.addEventListener("click",_utils.addToList,{capture:false});else addInstrumentBtn.removeEventListener("click",_utils.addToList,{capture:false});var cardControlMethods={submitMethod:addFuturePerformance,clearMethod:_utils.clearFutureForm.bind(form)};var cardListener=_generic.addCardListener.bind(cardControlMethods,event);cardListener();}