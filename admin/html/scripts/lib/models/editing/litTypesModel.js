"use strict";Object.defineProperty(exports,"__esModule",{value:true});exports.add=add;exports.edit=edit;exports.remove=remove;var server="http://localhost:2020/cca-admin-api/editing";function add(pricingData){console.log("Adding the following to pricings: ".concat(pricingData));}function edit(updatedPricing){console.log("Updating the following pricing: ".concat(updatedPricing));}function remove(pricingToBeRemoved){console.log("Deleting ".concat(pricingToBeRemoved," from pricings"));}