// playwright.config.js
module.exports = {
  webServer: {
    command: "npm run start", // start the React app
    port: 3000, // the port where the app is running (default is 3000)
  },

  timeout: 30 * 1000,
  expect: {
    timeout: 5000,
  },

  reporter: "html",

  use: {
    headless: false, // Show browser UI
    video: "on",
    trace: "on",
  },
};
