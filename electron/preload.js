const { ipcRenderer } = require("electron");
module.exports = { ipcRenderer };
window.ipcRenderer = ipcRenderer;
