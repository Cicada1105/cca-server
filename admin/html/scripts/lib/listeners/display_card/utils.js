"use strict";Object.defineProperty(exports,"__esModule",{value:true});exports.revertControlBtns=revertControlBtns;function revertControlBtns(event){var ctrlsCont=event.path[2];var iconConts=ctrlsCont.querySelectorAll("[class *= Btn]");var icon1Cont=iconConts[0];var icon2Cont=iconConts[1];var icon1=icon1Cont.firstElementChild;var icon2=icon2Cont.firstElementChild;var wasEditBtn=icon1Cont.className.includes("edit");var oldConfirmClass=wasEditBtn?"editBtnConfirm":"deleteBtnConfirm";var oldDeclineClass=wasEditBtn?"editBtnDecline":"deleteBtnDecline";icon1Cont.classList.replace(oldConfirmClass,"ctrlBtnEdit");icon2Cont.classList.replace(oldDeclineClass,"ctrlBtnDelete");icon1.classList.replace("fas","far");icon1.classList.replace("fa-check-circle","fa-edit");icon2.classList.replace("fas","far");}