const http = require("http");
const PORT = 5050;

let results = [];

function fibonacci(n, memo = {}) {
  if (n in memo) return memo[n];
  if (n === 0) return 0;
  if (n <= 2) return 1;
  return (memo[n] = fibonacci(n - 1, memo) + fibonacci(n - 2, memo));
}

const server = http.createServer((req, res) => {
  const reqURL = new URL(req.url, "http://localhost");
  res.writeHead(200, { "Content-Type": "application/json" });
  if (reqURL.pathname.startsWith("/fibonacci/")) {
    const number = +reqURL.pathname.slice(11);
    const result = fibonacci(number);
    const json = { number, result, createdDate: Date.now() };
    results.push(json);
    res.write(json);
  } else if (reqURL.pathname === "/getFibonacciResults") {
    res.write({ results });
  }
  res.end();
});

server.listen(PORT);
