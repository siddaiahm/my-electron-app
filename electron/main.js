const { app, BrowserWindow } = require("electron");
const path = require("path");
process.env.NODE_ENV === "development" ? require("electron-reload") : null;
let mainWindow;
let splash;
function createWindow() {
  splash = new BrowserWindow({
    width: 800,
    height: 600,
    // transparent: true,
    frame: false,
    alwaysOnTop: true,
  });
  let splashUrl = process.env.ELECTRON_START_URL
    ? process.env.ELECTRON_START_URL.replace(" ", "") + "/splash.html"
    : `file://${path.join(__dirname, "../splash.html")}`;
  splash.loadURL(splashUrl);
  const startUrl =
    process.env.ELECTRON_START_URL ||
    `file://${path.join(__dirname, "../index.html")}`;
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    show: false,
    // frame: false,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      nodeIntegration: true,
    },
  });

  mainWindow.loadURL(startUrl);
  mainWindow.once("ready-to-show", () => {
    setTimeout(() => {
      splash.destroy();
      mainWindow.show();
    }, 2000);
  });

  mainWindow.on("closed", function () {
    mainWindow = null;
  });
}
require("./handlers");

app.on("ready", createWindow);
app.on("window-all-closed", function () {
  if (process.platform !== "darwin") {
    app.quit();
  }
});
app.on("activate", function () {
  if (mainWindow === null) {
    createWindow();
  }
});
