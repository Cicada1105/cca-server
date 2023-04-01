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

module.exports = { 
	mongoClient, ObjectId
}