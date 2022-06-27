const express = require("express");
const app = express();
const port = 5050;

let results = [];

function fibonacci(n, memo = {}) {
  if (n in memo) return memo[n];
  if (n === 0) return 0;
  if (n <= 2) return 1;
  return (memo[n] = fibonacci(n - 1, memo) + fibonacci(n - 2, memo));
}

app.get("/fibonacci/:number", (req, res) => {
  const number = +req.params.number;
  const result = fibonacci(number);
  const obj = { number, result, createdDate: Date.now() };
  results.push(obj);
  res.send(obj);
});

app.get("/getFibonacciResults", (req, res) => {
  res.send({ results });
});

app.listen(port, () => {
  console.log(`Listening on port: ${port}`);
});
