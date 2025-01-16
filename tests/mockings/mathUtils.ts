function add(a: number, b: number) {
  return a + b;
}

function substract(a: number, b: number) {
  return a - b;
}

function multiply(a: number, b: number) {
  return a * b;
}
function divide(a: number, b: number) {
  if (b === 0) {
    throw new Error("Cannot divide by zero");
  }
  return a / b;
}

export { add, substract, multiply, divide };
