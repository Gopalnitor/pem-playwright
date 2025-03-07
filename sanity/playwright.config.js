module.exports = {
  webServer: {
    command: "npm run start", 
    port: 3000,
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

  testDir: './sanity/bdd/features'
};
