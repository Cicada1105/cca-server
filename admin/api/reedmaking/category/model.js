/*
  File contains request methods for dealing directly with the corresponding data
*/

const { getDatabaseCollection, ObjectId } = require('../../../../utils/mongodb.js');

/*
  Future add documentation
*/
function add({ reed_id, name, options }) {
  return new Promise((resolve,reject) => {
    // Retrieve reedmaking data
    //const reedmakingData = getFileData(reedmakingPricesPath);
    getDatabaseCollection('reedmaking').then(async ({ collection }) => {
      // Format new reed based on received arguments
      let newReedCategory = {
        _id: new ObjectId(),
        name,
        options,
      }

      try {
        // Push new reed onto old reedmaking data
        let result = await collection.findOneAndUpdate({
          _id: new ObjectId(reed_id)
        }, {
          $push: {
            categories: newReedCategory
          }
        });

        let { value: { name } } = result;
        resolve(`Successfully added \"${newReedCategory["name"]}\" category to \"${name}\" reed.`);
      } catch(e) {
        console.log(e);
        reject("Internal Server Error. Try again later");
      }
    });
  })
}
/*
  Future update documentation
*/
function update({ reed_id, category_id, name, options }) {
  return new Promise((resolve,reject) => {
    // Retrieve reedmaking data
    //const reedmakingData = getFileData(reedmakingPricesPath);
    getDatabaseCollection('reedmaking').then(async ({ collection }) => {
      // Format new reed based on received arguments
      let updatedReedCategory = {
        name,
        options,
      }

      try {
        // Update category with id category_id in reed of id reed_id
        let result = await collection.findOneAndUpdate({
          _id: new ObjectId( reed_id )
        }, {
          $set: {
            "categories.$[category].name": name,
            "categories.$[category].options": options
          }
        }, {
          arrayFilters: [{ 'category._id' : new ObjectId( category_id ) }]
        });

        let { value: { name } } = result;
        resolve(`Successfully updated \"${name}\" reed's category.`);
      } catch(e) {
        console.log(e);
        reject("Internal Server Error. Try again later");
      }
    });
  })
}
/*
  Future remove documentation
*/
function remove({ reed_id, category_id }) {
  return new Promise((resolve,reject) => {
    getDatabaseCollection('reedmaking').then(async ({ collection }) => {
      try {
        const result = await collection.findOneAndUpdate({ 
          _id: new ObjectId(reed_id) 
        }, {
          $pull: {
            categories: { 
              _id: new ObjectId(category_id)
            }
          }
        });

        if (result.ok) {
          // Retrieve the removed reed to alert user that reed was removec
          let { value: { name } } = result;
          
          resolve(`Successfully removed category from \"${name}\" reed.`);
        }
        else {
          reject("Internal Server Error. Try again later");
        }
      } catch(e) {
        reject("Internal Server Error. Try again later");
      }
    })
  })
}

module.exports = {
  add,
  update,
  remove
}