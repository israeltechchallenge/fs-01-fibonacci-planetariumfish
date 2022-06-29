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
