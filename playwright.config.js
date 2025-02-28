// playwright.config.js
module.exports = {
    webServer: {
      command: 'npm run start', // start the React app
      port: 3000,               // the port where the app is running (default is 3000)
    },

    use: {
        headless: false, // Show browser UI
        video: 'on'
      },
  };
  