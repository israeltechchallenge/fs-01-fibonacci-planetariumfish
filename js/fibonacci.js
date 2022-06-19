function fibonacci(fIndex) {
  let n1 = 0;
  let n2 = 1;
  let result = 0;

  if (fIndex === n1) {
    result = 0;
  } else {
    for (i = 1; i < fIndex; i++) {
      result = n1 + n2;
      n1 = n2;
      n2 = result;
    }
  }

  return result;
}

let inputIndex = 13;
let fNumber = fibonacci(inputIndex);

let final = `The Fibonacci of ${inputIndex} is ${fNumber}`;

const fibResult = document.querySelector(".fibonacci");
fibResult.innerText = final;
