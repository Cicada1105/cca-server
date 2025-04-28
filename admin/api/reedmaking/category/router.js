/*
  File for handling ADMIN api reedmaking routing

  Current router paths:
  /cca-admin-api/reedmaking/category
    /
*/

// Import category controller
const CONTROLLER = require('./controller.js');

function Router(req,res) {
  // Store info about request
  //     Method
  const method = req.method;
  //     Path
  const path = req.url;
  const cleanedPath = path.replace(/\B\//g,'').replace(/\/\B/g,'');
  const paths = cleanedPath.split("/"); // ["cca-admin-api","reedmaking", "category", ...restOfPath]
  // Remove ["cca-admin-api", "reedmaking","category"] at beginning && returns [...restOfPath]
  const reducedPaths = paths.slice(3);
  const newPath = reducedPaths.join("/"); // [...restOfPath] becomes "rest/Of/Path"

  /*
    method === "GET" is "handled" by compiling the PUG templating,
      passing in the data as parameters and then rendered to the screen
  */
  if ( newPath === '' ) {
    switch( method ) {
      case 'POST':
        CONTROLLER.addCategory(req,res);
      break;
      case 'PUT':
        CONTROLLER.updateCategory(req,res);
      break;
      case 'DELETE':
        CONTROLLER.removeCategory(req,res);
      break;
      default:
        // Unable to find path
        res.status = 404;
        res.end(JSON.stringify({
          msg: "Cannot find path: " + req.url
        }));
    }
  }
  else {
    // Unable to find path
    res.status = 404;
    res.end(JSON.stringify({
      msg: 'Unable to find path ' + req.url
    }))
  }
}

module.exports = { Router }