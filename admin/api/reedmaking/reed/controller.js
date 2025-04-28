/*
  Method for handling API requests and building responses
  Request codes
  201: Created new resource (adding)
  200: Okay
  404: Not Found (updating and deleting?)
  500: Internal Server Error (Getting body data)
*/

// Import models to handle actual data
const ReedModel = require("./model.js");

// Import utility function for handling the retrieval of body data
const { getBodyData } = require("../../utils");

async function addReed(req, res) {
  await getBodyData(req).then(async (body) => {
    let { name, description, pricing } = body;

    await ReedModel.add({
      name,
      description,
      pricing
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
async function updateReed(req, res) {
  await getBodyData(req).then(async (body) => {
    let { id, name, description, pricing } = body

    await ReedModel.update({
      id,
      name,
      description,
      pricing
    }).then((msg) => {
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
async function removeReed(req, res) {
  await getBodyData(req).then(async (body) => {
    // Pull out only necessary attributes from body to remove pricing
    let { id } = body;

    await ReedModel.remove(id).then((msg) => {
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
  addReed,
  updateReed,
  removeReed
}