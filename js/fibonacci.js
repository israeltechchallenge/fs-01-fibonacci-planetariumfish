// constants

const FIB_URL = "http://localhost:5050/fibonacci/";

// page elements

const button = document.getElementById("submit");
const fibResult = document.querySelector(".fibonacci");
const input = document.getElementById("inputNumber");
const spinner = document.querySelector(".spinner");

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
