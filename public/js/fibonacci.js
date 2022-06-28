// constants

const FIB_URL = "http://localhost:5050/fibonacci/";
const HIST_URL = "http://localhost:5050/getFibonacciResults";

// page elements

const button = document.getElementById("submit");
const fibResult = document.querySelector(".fibonacci");
const input = document.getElementById("inputNumber");
const spinner = document.querySelector(".spinner");
const mainSpinner = document.querySelector(".main-spinner");
const history = document.getElementById("search-history");
const check = document.getElementById("saveCalc");
const dropdown = document.querySelector(".dropdown-menu");

// state tracking variables

let method = "dDesc"; // default sorting method

// functions

function startCalc() {
  const inputIndex = input.value;
  if (check.checked) serverResults(inputIndex);
  else localResults(inputIndex);
}

async function serverResults(inputIndex) {
  if (inputIndex < 51) {
    spinner.classList.add("show");
    input.classList.remove("is-invalid");

    try {
      const response = await fetch(`${FIB_URL}${inputIndex}`);
      spinner.classList.remove("show");
      if (!response.ok) throw new Error(await response.text());
      const data = await response.json();
      fibResult.innerHTML = `<b><u>${data.result}</u></b>`;
    } catch (err) {
      fibResult.innerHTML = `<span class="text-danger">Server Error: ${err.message}</span>`;
    }
  } else {
    input.classList.add("is-invalid");
  }
  refresh();
}

function localResults(inputIndex) {
  if (inputIndex < 51 && inputIndex > 0) {
    input.classList.remove("is-invalid");
    fibResult.innerHTML = `<b><u>${fibonacci(inputIndex)}</u></b>`;
  } else {
    input.classList.add("is-invalid");
  }
}

async function fibHistory() {
  try {
    const response = await fetch(HIST_URL);
    const data = await response.json();
    const sorted = sortResults(data.results, method);
    displayHistory(sorted);
  } catch (err) {
    history.innerText = "Fetch failed (The server is probably down)";
  }
}

function displayHistory(data) {
  for (let item of data) {
    history.appendChild(addSearchResult(item));
  }
  mainSpinner.classList.remove("show");
}

function addSearchResult(item) {
  const sentence = document.createElement("div");
  const date = new Date(item.createdDate);
  const classes = ["border-bottom", "border-dark", "pb-1", "pt-2"];
  sentence.innerHTML = `The Fibonacci of <b>${item.number}</b> is <b>${
    item.result
  }</b>. Calculated at: ${date.toString()}`;
  sentence.classList.add(...classes);
  return sentence;
}

function sortResults(data, method) {
  switch (method) {
    case "nAsc":
      data.sort((a, b) => b.number - a.number);
      break;
    case "nDesc":
      data.sort((a, b) => a.number - b.number);
      break;
    case "dAsc":
      data.sort((a, b) => b.createdDate - a.createdDate);
      break;
    case "dDesc":
      data.sort((a, b) => a.createdDate - b.createdDate);
      break;
    default:
      data.sort((a, b) => a.createdDate - b.createdDate);
      break;
  }

  return data;
}

function refresh() {
  history.innerHTML = "";
  fibHistory();
}

function fibonacci(n, memo = {}) {
  if (n in memo) return memo[n];
  if (n === 0) return 0;
  if (n <= 2) return 1;
  return (memo[n] = fibonacci(n - 1, memo) + fibonacci(n - 2, memo));
}

// event listeners

button.addEventListener("click", startCalc);

// source for the next two: https://stackoverflow.com/questions/37043867/how-to-avoid-decimal-values-in-input-type-number
// prevent inputting or pasting decimal numbers or negative numbers
// triggers button click on enter

input.addEventListener("keydown", (e) => {
  if (e.key === ".") {
    e.preventDefault();
  }
  if (e.key === "-") {
    e.preventDefault();
  }

  if (e.key === "Enter") {
    e.preventDefault();
    button.click();
  }
});

input.addEventListener("paste", (e) => {
  let pasteData = e.clipboardData.getData("text");
  if (pasteData) {
    pasteData.replace(/[^0-9]*/g, "");
  }
});

dropdown.addEventListener("click", (e) => {
  method = e.target.id;
  refresh();
});

document.addEventListener("DOMContentLoaded", refresh);
