// Mocking

jest.mock("./mathUtils");
import { add } from "./mathUtils";
import { calculate } from "./mathUtils2";

describe("calculate", () => {
  test("calls add function with parameters", () => {
    calculate(1, 2, "add");
    expect(add).toHaveBeenCalled();
    expect(add).toHaveBeenCalledWith(1, 2);
  });
});
