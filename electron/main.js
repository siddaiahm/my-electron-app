const { app, BrowserWindow, ipcMain } = require('electron');
const { channels } = require('../src/shared/constants');
const path = require('path');
let mainWindow;
function createWindow () {
  const startUrl = process.env.ELECTRON_START_URL || `file://${path.join(__dirname, '../index.html')}`;
  mainWindow = new BrowserWindow({ width: 800, height: 600 ,webPreferences: {
    preload: path.join(__dirname, 'preload.js'),
  }});
  mainWindow.loadURL(startUrl);
  mainWindow.on('closed', function () {
    mainWindow = null;
  });
}

ipcMain.on(channels.APP_INFO, (event) => {
    event.sender.send(channels.APP_INFO, {
      appName: app.getName(),
      appVersion: app.getVersion(),
    });
  });

app.on('ready', createWindow);
app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
app.on('activate', function () {
  if (mainWindow === null) {
    createWindow();
  }
});