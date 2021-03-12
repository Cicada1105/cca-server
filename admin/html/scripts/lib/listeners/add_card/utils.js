"use strict";Object.defineProperty(exports,"__esModule",{value:true});exports.fileSelect=fileSelect;exports.addToList=addToList;exports.clearPastForm=clearPastForm;exports.clearCollaboratorForm=clearCollaboratorForm;exports.clearPresentForm=clearPresentForm;exports.clearFutureForm=clearFutureForm;function fileSelect(event){var form=event.path[2];var imgCont=form.querySelector("#imgCont");var icon=imgCont.firstElementChild;var img=imgCont.lastElementChild;var fileInput=event.path[0];if(fileInput.files[0]){var file=fileInput.files[0];var fileAlt=file.name;var fileSrc=URL.createObjectURL(file);img.src=fileSrc;img.alt=fileAlt;imgCont.style.border="none";icon.style.display="none";}else{img.src="";img.alt="";imgCont.style.border="2px dotted black";icon.style.display="block";}}function addToList(event){var instrumentsCont=event.path[1];var instrumentsInput=instrumentsCont.firstElementChild;var item=instrumentsInput.value;var ulEl=instrumentsCont.lastElementChild;ulEl.appendChild(createListItem(item));}function createListItem(item){var li=document.createElement("li");var liTextNode=document.createTextNode(item);var iEl=document.createElement("i");iEl.setAttribute("class","fas fa-times");iEl.addEventListener("click",function(event){var li=event.path[1];li.remove();},{once:true});li.appendChild(liTextNode);li.appendChild(iEl);return li;}function clearPastForm(){var form=this;var imgCont=form.querySelector("#imgCont");var icon=imgCont.firstElementChild;var img=imgCont.lastElementChild;img.src="";img.alt="";imgCont.style.border="2px dotted black";icon.style.display="block";var instrumentsCont=form.querySelector("#instrumentsCont");var instrumentsUL=instrumentsCont.lastElementChild;var instruments=instrumentsUL.childNodes;var numInstruments=instrumentsUL.childElementCount;for(var i=0;i<numInstruments;i++){console.log(instruments[0]);instruments[0].remove();}form.reset();}function clearCollaboratorForm(){var form=this;form.reset();}function clearPresentForm(){var form=this;form.reset();}function clearFutureForm(){var form=this;var instrumentsCont=form.querySelector("#instrumentsCont");var instrumentsUL=instrumentsCont.lastElementChild;var instruments=instrumentsUL.childNodes;var numInstruments=instrumentsUL.childElementCount;for(var i=0;i<numInstruments;i++){console.log(instruments[0]);instruments[0].remove();}form.reset();}