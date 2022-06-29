require("dotenv").config();
const express = require("express");
const cors = require("cors");
const fibonacci = require("./fib.js");
const { getDb } = require("./conn.js");
const app = express();

app.use(cors());

app.use(express.static("public/"));

app.get("/fibonacci/:number", (req, res) => {
  const number = +req.params.number;
  const result = fibonacci(number);
  const obj = { number, result, createdDate: Date.now() };
  getDb().collection("results").insertOne(obj);
  res.send(obj);
});

app.get("/getFibonacciResults", (req, res) => {
  getDb()
    .collection("results")
    .find({})
    .sort({ createdDate: -1 })
    .limit(50)
    .toArray((err, data) => {
      if (err) res.status(400).send("Error fetching listings!");
      res.json({ results: data });
    });
});

app.use("*", (req, res) => res.status(404).json({ error: "not found" }));

module.exports = app;
