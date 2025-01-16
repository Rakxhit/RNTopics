// Setup and TearDown

import { addToArr } from "./setup";

let testArray: Array<string> | null;

describe("SETUP AND TEARDOWN", () => {
  beforeAll(() => {
    console.log("Before all test: initializearray");
    testArray = [];
  });

  afterAll(() => {
    console.log("after all test: clear");
    testArray = null;
  });

  beforeEach(() => {
    console.log("before each all test: clear");
    testArray = [];
  });

  afterEach(() => {
    console.log("after each all test: clear");
    console.log(testArray);
  });

  test("add Item to array", () => {
    addToArr(testArray, "raxit");
    expect(testArray).toContain("raxit");
  });
});
describe("SETUP ANDTEARDOWN2", () => {
  let testArray: Array<string> | null = [];
  test("add item to array", () => {
    addToArr(testArray, "raxit");
    expect(testArray).toContain("raxit");
  });
});
