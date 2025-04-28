// Imports
const pug = require('pug');
const path = require('path');

// Import methods for retrieving database collections
const { getDatabaseCollection, ObjectId } = require('../../../../../../../utils/mongodb.js');

/*
  Routes
  /cca-admin-control-panel/reedmaking/category
    /Add?reed_id=#
    /Edit?reed_id=#&category_id=#
*/
function Router(req,res) {
  let pathname = req.url;
  // Remove leading and trailing /s
  let cleanedPath = pathname.replace(/\B\//g,'').replace(/\/\B/g,'');
  // ["cca-admin-control-panel", "reedmaking", "category", ...restOfPath]
  let paths = cleanedPath.split("/");
  // Remove ["cca-admin-control-panel","reedmaking", "category"] at beginning && returns [...restOfPath]
  let ctrl_panel_paths = paths.slice(3); // ["rest","of","path"]
  let ctrl_panel_url = ctrl_panel_paths.join("/"); // "rest/of/path"

  const TEMPLATES_PATH = path.join(__dirname, '');
  if ( ctrl_panel_url.startsWith('add') ) {
    let fn = pug.compileFile(path.join(TEMPLATES_PATH,'add/index.pug'));
    // Retrieve search params
    let searchParamsString = pathname.split('?')[1];
    let searchParams = new URLSearchParams(searchParamsString);
    // Retrieve reed id
    let reedID = searchParams.get('reed_id');

    res.writeHead(200,{
      'Content-Type': 'text/html'
    });

    res.end(
      fn({
        reed_id: reedID
      })
    )
  }
  else if ( ctrl_panel_url.startsWith('edit') ) {
    // Retrieve search params
    let searchParamsString = pathname.split('?')[1];
    let searchParams = new URLSearchParams(searchParamsString);

    let reedID = searchParams.get('reed_id');
    let categoryID = searchParams.get('category_id');

    try {
      getDatabaseCollection('reedmaking').then(async ({ collection }) => {
        let result = await collection.findOne({
          _id: new ObjectId(reedID)
        });

        let fn = pug.compileFile(path.join(TEMPLATES_PATH,'edit/index.pug'));
        
        res.end(fn({
          reed_id: result['_id'],
          category: result.categories.find(cat => cat['_id'] == categoryID)
        }))
      })
    } catch(e) {
      console.log(`Error retrieving category (${categoryID}) of reed (${reedID}) from database`);
      console.log(e);

      res.writeHe(404,{
        'Content-Type': 'text/strings'
      });
      res.end('Internal Server Error. Try again later')
    }
  }
  else {
    res.writeHead(404,{
      'Content-Type': 'text/strings'
    });
    res.end('Unable to find resource');
  }
}

module.exports = { Router }