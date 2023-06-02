document.addEventListener("webExtensionCaller", () => {
  console.log("Trying to call background script from react+html script");
  try {
    browser.runtime.sendMessage(
      "othent.othent-mobile (553HVL5PSS)",
      { greeting: "Holassssssssss" },
      (/** @type {{ farewell: string; }} */ r) =>
        console.log(`Response from background: ${r.farewell}`)
    );
  } catch (e) {
    console.log("Error trying to use browser.runtime API: ", e);
  }
});

// function handleMyCustomEvent(event) {
//   console.log("The custom event was dispatched!");
// }

// document.addEventListener("myCustomEvent", handleMyCustomEvent);
