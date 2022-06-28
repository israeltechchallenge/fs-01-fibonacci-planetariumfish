require("dotenv").config();
const { MongoClient } = require("mongodb");
const cors = require("cors");
const express = require("express");
const app = express();
const { connectToServer } = require("./src/conn.js");

app.use(cors());
app.use(express.json());
app.use(require("./src/routes.js"));

// Global error handling
app.use(function (err, _req, res) {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

// perform a database connection when the server starts
connectToServer((err) => {
  if (err) {
    console.error(err);
    process.exit();
  }
  app.listen(process.env.PORT, () =>
    console.log(`Listening on port: ${process.env.PORT}`)
  );
});

// // Create a new MongoClient
// const client = new MongoClient(process.env.MONGO_URI);

// async function run() {
//   try {
//     // Connect the client to the server
//     await client.connect();
//     // Establish and verify connection
//     await client.db(process.env.DB).command({ ping: 1 });
//     console.log("Connected successfully to server");
//     app.listen(process.env.PORT, () =>
//       console.log(`Listening on port: ${process.env.PORT}`)
//     );
//   } finally {
//     // Ensures that the client will close when you finish/error
//     await client.close();
//   }
// }
// run().catch(console.dir);
