const { app, BrowserWindow, ipcMain, nativeTheme } = require("electron");
const { channels } = require("../src/shared/constants");
const path = require("path");
require("electron-reload");

let mainWindow;
function createWindow() {
  const startUrl =
    process.env.ELECTRON_START_URL ||
    `file://${path.join(__dirname, "../index.html")}`;
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    // frame: false,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      nodeIntegration: true,
    },
  });

  mainWindow.loadURL(startUrl);
  mainWindow.on("closed", function () {
    mainWindow = null;
  });
}
ipcMain.handle(channels.TOGGLE_DARK_MODE, () => {
  if (nativeTheme.shouldUseDarkColors) {
    nativeTheme.themeSource = "light";
  } else {
    nativeTheme.themeSource = "dark";
  }
  return nativeTheme.shouldUseDarkColors;
});

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
