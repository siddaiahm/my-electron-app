const { ipcMain, nativeTheme } = require("electron");
const { channels, events } = require("../src/shared/constants");
const Vehicle = require("./vehicle");

let vehicle = new Vehicle();

ipcMain.handle(channels.TOGGLE_DARK_MODE, () => {
  if (nativeTheme.shouldUseDarkColors) {
    nativeTheme.themeSource = "light";
  } else {
    nativeTheme.themeSource = "dark";
  }
  return nativeTheme.shouldUseDarkColors;
});

ipcMain.handle(channels.GET_DATA, () => {
  return vehicle.getData();
});

ipcMain.on(events.UPDATE_SOC, (ev, soc) => {
  vehicle.setSoc(soc);
  ev.reply(channels.DATA_UPDATED, vehicle.getData());
});

ipcMain.on(events.UPDATE_SPEED, (ev, speed) => {
  vehicle.setSpeed(speed);
  ev.reply(channels.DATA_UPDATED, vehicle.getData());
});

ipcMain.on(events.UPDATE_ODO_METER, (ev, odoValue) => {
  vehicle.setOdoMeter(odoValue);
  ev.reply(channels.DATA_UPDATED, vehicle.getData());
});

ipcMain.on(events.SWITCH_SCREEN, (ev, index) => {
  ev.reply(channels.SWITCH_SCREEN, index);
});

ipcMain.on(events.SWITCH_TAB, (ev, index) => {
  ev.reply(channels.SWITCH_TAB, index);
});

ipcMain.on(events.UPDATE_KILL_SWITCH_STATUS, (ev, state) => {
  vehicle.setSwitchScreenState(state);
  ev.reply(channels.DATA_UPDATED, vehicle.getData());
});

ipcMain.on(events.TOGGLE_CHARGING_STATUS, (ev) => {
  let currentState = vehicle.data.CHARGING_STATUS;
  vehicle.setChargeState(!currentState, (soc) => {
    ev.reply(channels.DATA_UPDATED, vehicle.getData());
  });
  ev.reply(channels.DATA_UPDATED, vehicle.getData());
});

ipcMain.on(events.DASHBOARD_CONTROL_BUTTON_LEFT, (ev) => {
  ev.reply(channels.DASHBOARD_CONTROL_BUTTON_LEFT);
});

ipcMain.on(events.DASHBOARD_CONTROL_BUTTON_RIGHT, (ev) => {
  ev.reply(channels.DASHBOARD_CONTROL_BUTTON_RIGHT);
});

ipcMain.on(events.DASHBOARD_CONTROL_BUTTON_OK, (ev) => {
  ev.reply(channels.DASHBOARD_CONTROL_BUTTON_OK);
});
