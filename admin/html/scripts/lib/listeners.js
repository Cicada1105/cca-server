"use strict";Object.defineProperty(exports,"__esModule",{value:true});exports.addPastCardListener=addPastCardListener;exports.addPresentCardListener=addPresentCardListener;exports.addFutureCardListener=addFutureCardListener;var _currentMusicController=require("./controllers/currentMusicController.js");var _editingController=require("./controllers/editingController.js");var _futurePerformancesController=require("./controllers/futurePerformancesController.js");var _pastPerformancesController=require("./controllers/pastPerformancesController.js");var _reedmakingController=require("./controllers/reedmakingController.js");function submitForm(event){var fn=this;fn(event);}function clearForm(){var form=this;form.reset();var imgCont=form.querySelector("#imgCont");var icon=imgCont.firstElementChild;var img=imgCont.lastElementChild;img.src="";img.alt="";imgCont.style.border="2px dotted black";icon.style.display="block";}var submitFormRef,clearFormRef;function addCardListener(event,callback){var headerCont=event.path[1];var addCard=headerCont.nextElementSibling;var form=addCard.firstElementChild;var controlsCont=addCard.lastElementChild;var icons=controlsCont.getElementsByTagName("i");var icon1=icons[0];var icon2=icons[1];if(getComputedStyle(addCard).display==="none"){addCard.style.display="block";submitFormRef=submitForm.bind(callback);clearFormRef=clearForm.bind(form);icon1.addEventListener("click",submitFormRef,{capture:false});icon2.addEventListener("click",clearFormRef,{capture:false});}else{icon1.removeEventListener("click",submitFormRef,{capture:false});icon2.removeEventListener("click",clearFormRef,{capture:false});addCard.style.display="none";}}function addPastCardListener(event){var headerCont=event.path[1];var addCard=headerCont.nextElementSibling;var form=addCard.firstElementChild;var fileInputBtn=form.getElementsByClassName("fileCont")[0].firstElementChild;if(getComputedStyle(addCard).display==="none"){fileInputBtn.addEventListener("change",fileSelect,{capture:false});}else{fileInputBtn.removeEventListener("change",fileSelect,{capture:false});}addCardListener(event,_pastPerformancesController.addPastPerformance);}function addPresentCardListener(event){addCardListener(event,_currentMusicController.addSong);}function addFutureCardListener(event){var headerCont=event.path[1];var addCard=headerCont.nextElementSibling;var instrumentsCont=document.getElementById("instrumentsCont");var addInstrumentBtn=instrumentsCont.querySelector("input[type='button']");if(getComputedStyle(addCard).display==="none")addInstrumentBtn.addEventListener("click",addToList,{capture:false});else addInstrumentBtn.removeEventListener("click",addToList,{capture:false});addCardListener(event,_futurePerformancesController.addFuturePerformance);}function addToList(event){var instrumentsCont=event.path[1];var instrumentsInput=instrumentsCont.firstElementChild;var item=instrumentsInput.value;var ulEl=instrumentsCont.lastElementChild;ulEl.appendChild(createListItem(item));}function createListItem(item){var li=document.createElement("li");var liTextNode=document.createTextNode(item);var iEl=document.createElement("i");iEl.setAttribute("class","fas fa-times");iEl.addEventListener("click",function(event){var li=event.path[1];li.remove();},{once:true});li.appendChild(liTextNode);li.appendChild(iEl);return li;}function fileSelect(event){var form=event.path[2];var imgCont=form.querySelector("#imgCont");var icon=imgCont.firstElementChild;var img=imgCont.lastElementChild;var fileInput=event.path[0];if(fileInput.files[0]){var file=fileInput.files[0];var fileAlt=file.name;var fileSrc=URL.createObjectURL(file);img.src=fileSrc;img.alt=fileAlt;imgCont.style.border="none";icon.style.display="none";}else{img.src="";img.alt="";imgCont.style.border="2px dotted black";icon.style.display="block";}}