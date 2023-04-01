const { MongoClient, ObjectId, ServerApiVersion } = require("mongodb");

if (!process.env.MONGO_URI) {
	throw new Error("Missing MONGO_URI environment variable");
}

const mongoURI = process.env.MONGO_URI;
const mongoConnectionOptions = {
	connectTimeoutMS: 10000,
	serverApi: {
		version: ServerApiVersion.v1,
		strict: true,
		deprecationErrors: true
	},
	maxPoolSize: 10
}

const mongoClient = new MongoClient(mongoURI, mongoConnectionOptions);

async function getDatabaseCollection(collectionName) {
	try {
		await mongoClient.connect();

		let db = await mongoClient.db('cca_database');

		return {
			collection: db.collection(collectionName),
			closeConnection: () => {
				mongoClient.close()
			}
		}
	} catch(e) {
		reject("Error connecting to the database");
		console.log(e);
	}
}

module.exports = { 
	getDatabaseCollection, ObjectId
}