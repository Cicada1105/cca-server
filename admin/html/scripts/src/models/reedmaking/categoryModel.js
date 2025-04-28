/* 
  File for interacting directly with reedmaking data
    Methods will make request to admin api that has access to the following CRUD methods:
    ADD
    UPDATE
    REMOVE

    Note:   GET is "handled" by compiling the PUG templates and passing in
        the data as parameters to be rendered to the screen
*/
// Imports
import makeRequest from '../request';

const REEDMAKING_CATEGORY_PATH = "/cca-admin-api/reedmaking/category/";

/*
  Future Add documentation
*/
function add({ reed_id, name, options }) {
  return makeRequest(
    REEDMAKING_CATEGORY_PATH,
    "POST",
    {
      reed_id,
      name,
      options
    }
  )
}
/*
  Future update documentation
*/
function update({ reed_id, category_id, name, options }) {
  return makeRequest(
    REEDMAKING_CATEGORY_PATH,
    'PUT',
    {
      reed_id,
      category_id,
      name,
      options
    }
  );
}
/*
  Future Remove documentation
*/
function remove({ reed_id, category_id }) {
  return makeRequest(
    REEDMAKING_CATEGORY_PATH,
    "DELETE",
    { 
      reed_id,
      category_id
    }
  )
}

export { add, update, remove }