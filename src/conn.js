require("dotenv").config();
const { MongoClient } = require("mongodb");
// Create a new MongoClient
const client = new MongoClient(process.env.MONGO_URI);

let dbConnection;

const connectToServer = (callback) => {
  client.connect((err, db) => {
    if (err || !db) return callback(err);
    dbConnection = db.db(process.env.DB);
    console.log("Successfully connected to MongoDB.");
    return callback();
  });
};

const getDb = () => dbConnection;

module.exports = { connectToServer, getDb };
