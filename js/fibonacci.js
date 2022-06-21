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

// functions

function giveResults() {
  const inputIndex = input.value;

  if (inputIndex < 51) {
    spinner.classList.add("show");
    input.classList.remove("is-invalid");
    fetch(`${FIB_URL}${inputIndex}`).then((response) => {
      if (!response.ok) {
        response.text().then((data) => {
          spinner.classList.remove("show");
          fibResult.innerHTML = `<span class="text-danger">Server Error: ${data}</span>`;
        });
      } else {
        response.json().then((data) => {
          spinner.classList.remove("show");
          const result = data.result;
          fibResult.innerHTML = `<b><u>${result}</u></b>`;
        });
      }
    });
  } else {
    input.classList.add("is-invalid");
  }
  refresh();
}

function fibHistory() {
  fetch(HIST_URL)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      displayHistory(data.results);
    })
    .catch((err) => {
      history.innerText = "Fetch failed (The server is probably down)";
    });
}

function displayHistory(prevArray) {
  prevArray.sort((a, b) => a.createdDate - b.createdDate);
  for (let prevSearch of prevArray) {
    history.appendChild(addSearchResult(prevSearch));
  }
  mainSpinner.classList.remove("show");
}

function addSearchResult(item) {
  let sentence = document.createElement("div");
  let date = new Date(item.createdDate);
  let classes = ["border-bottom", "border-dark", "pb-1", "pt-2"];
  sentence.innerHTML = `The Fibonacci of <b>${item.number}</b> is <b>${
    item.result
  }</b>. Calculated at: ${date.toString()}`;
  sentence.classList.add(...classes);
  return sentence;
}

function refresh() {
  history.innerHTML = "";
  fibHistory();
}

// event listeners

button.addEventListener("click", giveResults);

// source for the next two: https://stackoverflow.com/questions/37043867/how-to-avoid-decimal-values-in-input-type-number
// prevent inputting or pasting decimal numbers
// triggers button click on enter

input.addEventListener("keydown", (e) => {
  if (e.key === ".") {
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

document.addEventListener("DOMContentLoaded", refresh);
