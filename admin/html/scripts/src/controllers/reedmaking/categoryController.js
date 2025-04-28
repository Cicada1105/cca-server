// Controller for connecting reed view with reed model

// Require reed model
import * as ReedCategory from "../../models/reedmaking/categoryModel.js";

// Require callback functions shared by all controllers
import { successCallback, failedCallback } from '../utils.js';
/*
  Future addCategory documentation
*/
function addCategory(event) {
  event.preventDefault();
  // Retrieve form elements
  const form = event.currentTarget;
  const elements = form.elements;
  // Retrieve the entered options from the table
  const tbody = form.querySelector('table > tbody');
  const [...optionRows] = tbody.querySelectorAll('tr');

  // Create new category based on inputs
  let newCategory = {
    reed_id: elements['reed_id'].value,
    name: elements['name'].value,
    options:[]
  };

  // Loop through table rows, adding options to the new category
  newCategory['options'] = optionRows.slice(1).map(row => row.firstElementChild.textContent)

  ReedCategory.add(newCategory).then(successCallback).catch(failedCallback);
}
/*
  Future updateCategory documentation
*/
function updateCategory(event) {
  event.preventDefault();
  // Retrieve form elements
  const form = event.currentTarget;
  const elements = form.elements;
  // Retrieve the entered options from the table
  const tbody = form.querySelector('table > tbody');
  const [...optionRows] = tbody.querySelectorAll('tr');

  // Create new reed based on inputs
  let updatedCategory = {
    reed_id: elements['reed_id'].value,
    category_id: elements['category_id'].value,
    name: elements['name'].value,
    options: []
  };

  // Loop through table rows, adding options to the updated category
  updatedCategory['options'] = optionRows.slice(1).map(row => row.firstElementChild.textContent)

  ReedCategory.update(updatedCategory).then(successCallback).catch(failedCallback);
}
/*
  Future removeCategory documentation
*/
function removeCategory(event) {
  // Get and store pricing ID of current reed
  const dataSet = event.target.dataset;

  let reed_id = dataSet['reed_id'];
  let category_id = dataSet['category_id']
  
  let category = {
    reed_id,
    category_id
  }
  
  ReedCategory.remove(category).then(successCallback).catch(failedCallback);
}

export { addCategory, updateCategory, removeCategory }