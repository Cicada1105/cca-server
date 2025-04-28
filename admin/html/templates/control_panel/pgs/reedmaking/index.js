/*
  File for handling pug templating router for cca-admin-control-panel
*/

// Imports
const pug = require('pug');
const path = require('path');

// Import methods for retrieving database collections
const { getDatabaseCollection, ObjectId } = require('../../../../../../utils/mongodb.js');

// Import Category Router
const CATEGORY = require('./category');

/*
  Routes
  /cca-admin-control-panel/reedmaking
    /add
    /list
    /edit
*/
function Router(req,res) {
  let pathname = req.url;
  let cleanedPath = pathname.replace(/\B\//g,'').replace(/\/\B/g,'');
  // ["","cca-admin-control-panel",...restOfPath,]
  let paths = cleanedPath.split('/');
  // Remove ["cca-admin-control-panel","reedmaking"] at beginning && returns [...restOfPath]
  let ctrl_panel_paths = paths.slice(2); // ["rest","of","path"]
  let ctrl_panel_url = ctrl_panel_paths.join("/"); // "rest/of/path"

  const TEMPLATES_BASE = path.join(__dirname,'');
  let fn;
  let data;

  if (ctrl_panel_url === "") { // List
    // Define path to reedmaking pug template
    fn = pug.compileFile(`${TEMPLATES_BASE}/list/index.pug`);
    getDatabaseCollection('reedmaking').then(async ({ collection }) => {
      data = await collection.find({}).toArray();

      res.writeHead(200, {
        "Content-Type":"text/html"
      });
      res.end(
        fn({
          "reedmaking": data
        })
      );
    })
  }
  else if (ctrl_panel_url === "add") { // Add page
    // Define path to add pug template
    fn = pug.compileFile(`${TEMPLATES_BASE}/add/index.pug`);

    res.writeHead(200, {
      "Content-Type":"text/html"
    });
    res.end(fn());
  }
  else if (ctrl_panel_url.startsWith('edit')) { // Edit page
    // Retrieve id from url
    // Query database for reed based on id
    // Send data to edit pug template
    // Define path to edit pug template
    fn = pug.compileFile(`${TEMPLATES_BASE}/edit/index.pug`);

    try {
      getDatabaseCollection('reedmaking').then(async ({ collection }) => {
        let urlParams = req.url.split('?')[1];
        let urlSearchParams = new URLSearchParams(urlParams);
        let id = urlSearchParams.get('id');

        data = await collection.findOne({
          _id: new ObjectId(id)
        })

        if ( !data )
          throw new Error(`Cannot find reed with id: ${id}`)

        res.writeHead(200, {
          'Content-Type': 'text/html'
        });
        res.end(
          fn(data)
        )
      })
    } catch(e) {
      console.log("Error retrieving database data");
      console.log(e);

      res.writeHead(500,{
        'Content-Type': 'text/strings'
      });
      res.end('Unable to retrieve resource');
    }
  }
  else if (ctrl_panel_url.startsWith('category')) {
    CATEGORY.Router(req,res);
  }
  else {
    res.writeHead(404,{
      "Content-Type":"text/strings"
    });
    res.end("Unable to find resource");
  }
}

module.exports = {
  Router
}