/*
  File contains request methods for dealing directly with the corresponding data
*/

const { getDatabaseCollection, ObjectId } = require('../../../../utils/mongodb.js');

/*
  Future add documentation
*/
function add({ name, description, pricing }) {
  return new Promise((resolve,reject) => {
    // Retrieve reedmaking data
    //const reedmakingData = getFileData(reedmakingPricesPath);
    getDatabaseCollection('reedmaking').then(async ({ collection }) => {
      // Format new reed based on received arguments
      let newReed = {
        name,
        description,
        image: null,
        pricing: {},
        categories: []
      }

      if ( 'flatRate' in pricing ) {
        newReed['pricing'].flatRate = pricing['flatRate'];
      }
      else if ( 'rates' in pricing ){
        newReed['pricing'] = {
          name: pricing['name'],
          rates: []
        }
        let pricingRates = pricing['rates'];
        // Loop through pricings, adding to newRead object correct properties
        pricingRates.forEach(rate => {
          newReed["pricing"]['rates'].push({
            name: rate['name'],
            cost: rate['cost']
          });
        });
      }

      try {
        // Push new reed onto old reedmaking data
        let result = await collection.insertOne(newReed);

        resolve(`Successfully added \"${newReed["name"]}\" to reedmaking page`);
      } catch(e) {
        reject("Internal Server Error. Try again later");
      }
    });
  })
}
/*
  Future update documentation
*/
function update({ id, name, description, pricing }) {
  return new Promise((resolve, reject) => {
    // Retrieve reedmaking data
    //const reedmakingData = getFileData(reedmakingPricesPath);
    getDatabaseCollection('reedmaking').then(async ({ collection }) => {
      // Format new reed based on received arguments
      let updatedReed = {
        name,
        description,
        pricing: {}
      }

      if ( 'flatRate' in pricing ) {
        updatedReed['pricing'].flatRate = pricing['flatRate'];
      }
      else if ( 'rates' in pricing ){
        updatedReed['pricing'] = {
          name: pricing['name'],
          rates: []
        };

        let ratesArray = pricing['rates'];
        // Loop through pricings, adding to updatedReed object correct properties
        ratesArray.forEach(price => {
          updatedReed['pricing']['rates'].push({
            name: price['name'],
            cost: price['cost']
          });
        });
      }

      try {
        // Push new reed onto old reedmaking data
        // console.log(updatedReed['pricing']);
        let result = await collection.findOneAndUpdate({
          _id: new ObjectId(id)
        }, {
          $set: updatedReed
        });

        resolve(`Successfully updated \"${updatedReed["name"]}\".`);
      } catch(e) {
        reject("Internal Server Error. Try again later");
      }
    });
  });
}
/*
  Future remove documentation
*/
function remove(reedID) {
  return new Promise((resolve,reject) => {
    getDatabaseCollection('reedmaking').then(async ({ collection }) => {
      const result = await collection.findOneAndDelete({ 
        _id: new ObjectId(reedID)
      });

      if (result.ok) {
        // Retrieve the removed reed to alert user that reed was removec
        let { value: { name } } = result;
        resolve(`Successfully removed ${name} from the reedmaking page`);
      }
      else {
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