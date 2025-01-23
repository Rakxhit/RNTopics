describe("Detox screen", () => {
  beforeAll(async () => {
    await device.launchApp();
  });

  it("should appear all the list in the screen", async () => {
    await expect(element(by.text("Apollo"))).toBeVisible();
    await expect(element(by.text("MobX"))).toBeVisible();
    await expect(element(by.text("Detox"))).toBeVisible();
  });

  it("should test the Apollo component", async () => {
    await element(by.id("Apollo-button")).tap();
    await waitFor(element(by.text("Default polling is 5000")))
      .toBeVisible()
      .withTimeout(5000);
    await element(by.traits(["button"]))
      .atIndex(0)
      .tap();
  });

  it("should test the MobX", async () => {
    const TaskText = "Third Task";
    await element(by.id("Mobx-button")).tap();
    await element(by.id("todo-textinput")).typeText(TaskText);
    await element(by.id("todo-textinput")).tapReturnKey();
    await element(by.traits(["button"]))
      .atIndex(0)
      .tap();
  });

  it("should test the Detx", async () => {
    await element(by.id("Detox-button")).tap();
    await expect(element(by.id("click-me-button"))).toBeVisible();
    await element(by.id("click-me-button")).tap();
    await expect(element(by.text("Hi!"))).toBeVisible();
  });

  it("should come back to the Main screen", async () => {
    await element(by.traits(["button"]))
      .atIndex(0)
      .tap();
  });
});
