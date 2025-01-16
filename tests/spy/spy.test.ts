// SPY FUNCTION

const myModule = require("./spy");

test("should spy on the function and check if it is called", () => {
  const spy = jest.spyOn(myModule, "myFunction");

  myModule.myFunction();

  expect(spy).toHaveBeenCalled();

  spy.mockRestore();
});

test("asdfafsd", () => {
  console.log("adsf");
});
