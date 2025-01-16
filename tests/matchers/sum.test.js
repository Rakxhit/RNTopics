const sum = require("./sum");

test("adds 1 + 2 to equal 3", () => {
  expect(sum(1, 2)).toBe(3);
});

test("object assignment", () => {
  const data = { one: 1 };
  data["two"] = 2;
  expect(data).toStrictEqual({ one: 1, two: 2 });
});

test("adding positive numbers is not zero", () => {
  for (let a = 1; a < 10; a++) {
    for (let b = 1; b < 10; b++) {
      expect(a + b).not.toBe(0);
    }
  }
});

test("null", () => {
  const n = null;
  expect(n).toBeNull();
  expect(n).toBeDefined();
  expect(n).not.toBeTruthy();
  expect(n).not.toBeUndefined();
  expect(n).toBeFalsy();
});

test("zero", () => {
  const z = 0;
  expect(z).not.toBeNull();
  expect(z).toBeDefined();
  expect(z).not.toBeUndefined();
  expect(z).not.toBeTruthy();
  expect(z).toBeFalsy();
});

test("two plus two", () => {
  const value = 2 + 2;
  expect(value).toBeGreaterThan(3);
  expect(value).toBeGreaterThanOrEqual(3.5);
  expect(value).toBeLessThan(5);
  expect(value).toBeLessThanOrEqual(4.5);
  expect(value).toBe(4);
  expect(value).toEqual(4);
});

test("adding floating point numbers", () => {
  const value = 0.1 + 0.2;
  expect(value).toBeCloseTo(0.3);
});

test("there is no I in team", () => {
  expect("team").not.toMatch(/I/);
});

test('but there is a "stop" in Christoph', () => {
  expect("Christoph").toMatch(/stop/);
});

const shoppingList = [
  "diapers",
  "kleenex",
  "trash bags",
  "paper towels",
  "milk",
];
test("the shopping list has milk on it", () => {
  expect(shoppingList).toContain("milk");
  expect(new Set(shoppingList)).toContain("milk");
});

function compileAndroidCode() {
  throw new Error("you are using the wrong JDK!");
}

test("compiling android goes as expected", () => {
  expect(() => compileAndroidCode()).toThrow();
  expect(() => compileAndroidCode()).toThrow(Error);

  expect(() => compileAndroidCode()).toThrow("you are using the wrong JDK!");
  expect(() => compileAndroidCode()).toThrow(/JDK/);

  expect(() => compileAndroidCode()).toThrow(/^you are using the wrong JDK!$/);
});

const fetchData = async () => {
  const data = await fetch("https://jsonplaceholder.typicode.com/todos/1");
  return data.json();
};

test("the data is peanut butter", () => {
  fetchData().then((json) => expect(json.title).toBe("delectus aut autem"));
});

test("the data is peanut butter", async () => {
  const data = await fetchData();
  expect(data.title).toBe("delectus aut autem");
});

test("the fetch fails with an error", async () => {
  // expect.assertions(1);
  try {
    await fetchData();
  } catch (error) {
    expect(error).toMatch("error");
  }
});

test("the data is peanut butter", async () => {
  await expect(fetchData().then((e) => e.title)).resolves.toBe(
    "delectus aut autem"
  );
});

test("the fetch fails with an error", () => {
  // expect.assertions(1);
  return fetchData().catch((error) => expect(error).toMatch("error"));
});

test("the fetch fails with an error", () => {
  // expect.assertions(1);
  return fetchData().catch((error) => expect(error).toMatch("error"));
});

beforeEach(() => {
  // console.log("BEFORE EACH");
});

afterEach(() => {
  // console.log("AFTER EACH");
});

const isCity = (city) => city === "Vienna";

test("City database has Vienna", () => {
  expect(isCity("Vienna")).toBeTruthy();
});

test("City database has San Juan", () => {
  expect(isCity("San Juan")).toBeFalsy();
});

beforeAll(() => {
  // console.log("BEFORE ALL");
});

describe("matching cities to foods", () => {
  beforeEach(() => {
    // console.log("HELLO THERE");
  });

  test("Vienna <3 veal", () => {
    expect(isCity("Vienna")).toBe(true);
  });
});

const myMock1 = jest.fn();
const a = new myMock1();
console.log(myMock1.mock.instances);

const myMock2 = jest.fn();
const b = {};
const bound = myMock2.bind(b);
bound();
console.log(myMock2.mock.contexts);

const myMock = jest.fn();
console.log(myMock());
// > undefined

myMock.mockReturnValueOnce(10).mockReturnValueOnce("x").mockReturnValue(true);

console.log(myMock(), myMock(), myMock(), myMock());
// > 10, 'x', true, true

const filterTestFn = jest.fn();

filterTestFn.mockReturnValueOnce(true).mockReturnValueOnce(false);
const result = [11, 12].filter((num) => filterTestFn(num));
console.log("result: ", result);

console.log(filterTestFn.mock.calls[0][0]);
console.log(filterTestFn.mock.calls[1][0]);

import axios from "axios";
class Users {
  static all() {
    return axios.get("./user.json").then((resp) => resp.data);
  }
}

jest.mock("axios");
test("should fetch users", () => {
  const users = [{ name: "raxit", age: 20 }];
  const resp = { data: users };
  console.log("users: ", users);
  console.log("resp: ", resp);
  axios.get.mockResolvedValue(resp);

  Users.all().then((data) => console.log(data));

  return Users.all().then((data) => expect(data).toEqual(users));
});

import defaultExport, { bar, foo } from "./foo-bar-baz";

jest.mock("./foo-bar-baz.js", () => {
  const originalModule = jest.requireActual("./foo-bar-baz.js");

  return {
    __esModule: true,
    ...originalModule,
    default: jest.fn(() => "mocked baz"),
    foo: "mocked foo",
  };
});

test("should do a partial mock", () => {
  const defautlExportResult = defaultExport();
  expect(defautlExportResult).toBe("mocked baz");
  expect(defaultExport).toHaveBeenCalled();

  expect(foo).toBe("mocked foo");
  expect(bar()).toBe("bar");
});

const myMockFn = jest.fn((cb) => cb(null, true));

myMockFn((err, val) => console.log(val));

describe("multiply tests", () => {
  it("2, and 5 multiply equal to 10", async () => {
    expect(2 + 2).toBe(4);
  });
  it("2 and 5 must be 7", () => {
    expect(2 + 5).toBe(7);
  });
});

test("Object equality", () => {
  const data = { alpha: "A" };
  data["beta"] = "B";
  expect(data).toEqual({ alpha: "A", beta: "B" }); // Deep equality
});

test("Null Values", () => {
  const value = null;
  expect(value).toBeNull();
  expect(value).toBeDefined();
  expect(value).toBe(null);
  expect(value).not.toBe(undefined);
});

test("number comparison", () => {
  const value = 3 + 3;
  expect(value).toBeGreaterThan(5);
});

test("value to be close to 0.3", () => {
  const floatValue = 0.2 + 0.1;

  expect(floatValue).toBeCloseTo(0.3, 5);
});

test("array matchers", () => {
  const todoList = ["first", "second", "third", "fourth", "fifth"];
  expect(todoList).toContain("first");

  function openInvalidFile() {
    throw new Error("file not found");
  }
  expect(() => openInvalidFile()).toThrow();
  expect(() => openInvalidFile()).toThrow(Error);
  expect(() => openInvalidFile()).toThrow("file not found");
  expect(() => openInvalidFile()).toThrow(/not found/);
});

test("drinks returns", () => {
  const drink = jest.fn(() => true);
  drink();
  expect(drink).toHaveReturnedWith(true);
});

const fetchDataTimer = (shouldFail = false) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldFail) {
        reject("error occured");
      } else {
        resolve("chocolate");
      }
    }, 100);
  });
};

test("the data is chocolate using the promise", async () => {
  const data = await fetchDataTimer();
  expect(data).toBe("chocolate");
});

test("ASYNC TEST", async () => {
  await expect(fetchDataTimer(true)).rejects.toMatch("error occured");
});
