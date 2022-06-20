// constants

const FIB_URL = "http://localhost:5050/fibonacci/";

// page elements

const button = document.getElementById("submit");
const fibResult = document.querySelector(".fibonacci");
const input = document.getElementById("inputNumber");

// functions

function giveResults() {
  const inputIndex = input.value;

  fetch(`${FIB_URL}${inputIndex}`)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      const result = data.result;
      fibResult.innerText = result;
    });
}

// event listeners

button.addEventListener("click", giveResults);

// Execute a function when the user presses a key on the keyboard
input.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    e.preventDefault();
    button.click();
  }
});
