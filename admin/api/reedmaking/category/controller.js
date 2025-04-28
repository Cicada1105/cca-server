/*
  Method for handling API requests and building responses
  Request codes
  201: Created new resource (adding)
  200: Okay
  404: Not Found (updating and deleting?)
  500: Internal Server Error (Getting body data)
*/

// Import models to handle actual data
const CategoryModel = require("./model.js");

// Import utility function for handling the retrieval of body data
const { getBodyData } = require("../../utils");

async function addCategory(req, res) {
  await getBodyData(req).then(async (body) => {
    let { reed_id, name, options } = body;

    await CategoryModel.add({
      reed_id,
      name,
      options
    }).then((msg) => {
      res.status = 201;
      res.end(JSON.stringify({ msg }));
    }).catch((err) => {
      res.status = 500;
      res.end(JSON.stringify({ 
        msg: err 
      }));
    })
  }).catch((err) => {
    console.log("ERROR:");
    console.log(err.message);
    console.log(err.stack);

    res.status = 500;
    res.end(JSON.stringify({
      msg: "Unable to process the request at this time"
    }));
  })
}
async function updateCategory(req, res) {
  await getBodyData(req).then(async (body) => {
    let { reed_id, category_id, name, options } = body;

    await CategoryModel.update({
      reed_id,
      category_id,
      name,
      options
    }).then((msg) => {
      console.log("Success");
      res.status = 200;
      res.end(JSON.stringify({ msg }))
    }).catch((err) => {
      console.log("ERROR:");
      console.log(err.message);
      console.log(err.stack);

      res.status = 500;
      res.end(JSON.stringify({
        msg: 'Unable to process the request at this time'
      }))
    })
  });
}
async function removeCategory(req, res) {
  await getBodyData(req).then(async (body) => {
    // Pull out only necessary attributes from body to remove pricing
    let { reed_id, category_id } = body;

    await CategoryModel.remove({
      reed_id,
      category_id
    }).then((msg) => {
      res.status = 200;
      res.end(JSON.stringify({ msg }));     
    }).catch((err) => {
      res.status = 500;
      res.end(JSON.stringify({ 
        msg: err 
      }));
    })

  }).catch((err) => {
    console.log("ERROR:");
    console.log(err.message);
    console.log(err.stack);

    res.status = 500;
    res.end(JSON.stringify({
      msg: "Unable to process the request at this time"
    }));
  })
}

module.exports = {
  addCategory,
  updateCategory,
  removeCategory
}