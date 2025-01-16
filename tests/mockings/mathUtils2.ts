import { add, divide, multiply, substract } from "./mathUtils";

function calculate(
  a: number,
  b: number,
  operation: "add" | "substract" | "multiply" | "divide"
) {
  switch (operation) {
    case "add":
      return add(a, b);
    case "substract":
      return substract(a, b);
    case "multiply":
      return multiply(a, b);
    case "divide":
      return divide(a, b);
  }
}

export { calculate };
