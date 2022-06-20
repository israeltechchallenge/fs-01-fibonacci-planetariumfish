// page elements

const button = document.getElementById("submit");
const fibResult = document.querySelector(".fibonacci");

// functions

function fibonacci(fIndex) {
  if (fIndex <= 1) {
    return fIndex;
  } else {
    return fibonacci(fIndex - 1) + fibonacci(fIndex - 2);
  }
}

function giveResults() {
  const inputIndex = document.getElementById("inputNumber").value;
  const fNumber = fibonacci(inputIndex);
  fibResult.innerText = fNumber;
}

// event listeners

button.addEventListener("click", giveResults);
