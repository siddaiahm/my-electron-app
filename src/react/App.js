import "./assets/style/index.css";
import { channels, events } from "../shared/constants";
import React, { useEffect, useRef, useState } from "react";
import { BulbFilled } from "@ant-design/icons";
import Footer from "./components/Footer";

import Home from "./screens/Home";
import Navigation from "./screens/Navigation";
import Settings from "./screens/Settings";
const { ipcRenderer } = window;

function App() {
  const [isDark, setIsDark] = useState(false);
  const [data, setData] = useState({});
  const [isReady, setIsReady] = useState(false);
  const [currentScreenIndex, setCurrentScreenIndex] = useState(0);
  let screenIndexRef = useRef();
  screenIndexRef.current = currentScreenIndex;

  const SCREENS = [
    {
      name: "HOME",
      screen: <Home data={data} />,
    },
    {
      name: "NAVI",
      screen: <Navigation data={data} />,
    },
    { name: "SETT", screen: <Settings data={data} /> },
  ];

  const updateSoc = (newSoc) => {
    if (newSoc >= 0 && newSoc <= 100) {
      ipcRenderer.send(events.UPDATE_SOC, newSoc);
    }
  };

  const updateSpeed = (newSpeed) => {
    ipcRenderer.send(events.UPDATE_SPEED, newSpeed);
  };

  const updateTotalDistance = (newDistance) => {
    ipcRenderer.send(events.UPDATE_ODO_METER, newDistance);
  };

  const handleInit = (data) => {
    document.onkeyup = keyUp;
    document.onkeydown = keyDown;

    function keyDown(e) {
      e = e || window.event;
      handleKeyPress(e);
      if (e.keyCode == "38") {
        // up arrow
        isAccelerating = true;
      } else if (e.keyCode == "40") {
        // down arrow
        isBraking = true;
      }
    }
    function keyUp(e) {
      e = e || window.event;
      if (e.keyCode == "38") {
        // up arrow
        isAccelerating = false;
      } else if (e.keyCode == "40") {
        // down arrow
        isBraking = false;
      }
    }

    function gearUp() {
      if (gear < gears.length - 1) {
        gear++;
      }
    }

    function gearDown() {
      if (gear > 1) {
        gear--;
      }
    }
    // VEHICLE CONFIG

    let mass = 1000,
      cx = 0.28,
      gears = [0, 0.4, 0.7, 1.0, 1.3, 1.5, 1.68],
      transmitionRatio = 0.17,
      transmitionLoss = 0.15,
      wheelDiameter = 0.5,
      brakeTorqueMax = 300,
      gear = 1,
      overallRatio,
      wheelRpm,
      wheelTorque,
      brakeTorque,
      resistance,
      acceleration;

    // // MOTOR CONFIG

    let rpmIdle = 0,
      rpmMax = 8000,
      rpmRedzone = 6500,
      torqueMin = 20, // in m.kg
      torqueMax = 45, // in m.kg
      torque,
      rpm = 0,
      isAccelerating = false,
      isBraking = false;

    let lastTime = new Date().getTime(),
      nowTime,
      delta;

    // BATTERY CONFIG

    let distanceTraveled = 0;
    // Helper functions

    let torqueByRpm = function (rpm) {
      let torque = torqueMin + (rpm / rpmMax) * (torqueMax - torqueMin);
      return torque;
    };

    function kmh2ms(SPEED) {
      // Km/h to m/s
      return SPEED / 3.6;
    }

    (function loop() {
      window.requestAnimationFrame(loop);

      // Delta time
      nowTime = new Date().getTime();
      delta = (nowTime - lastTime) / 1000; // in seconds
      lastTime = nowTime;

      let oldSpeed = data.SPEED,
        oldRpm = rpm;
      // Torque

      if (isAccelerating && rpm < rpmMax && data.SOC >= 1) {
        // Gas!
        torque = torqueByRpm(rpm);
      } else {
        torque = -((rpm * rpm) / 1000000);
      }

      if (isBraking) {
        // Ooops...
        brakeTorque = brakeTorqueMax;
      } else {
        brakeTorque = 0;
      }

      overallRatio = transmitionRatio * gears[gear];
      wheelTorque = torque / overallRatio - brakeTorque;

      acceleration = (20 * wheelTorque) / ((wheelDiameter * mass) / 2);
      resistance = (0.5 * 1.2 * cx * kmh2ms(data.SPEED)) ^ 2;

      // Speed

      data.SPEED += (acceleration - resistance) * delta;
      updateSpeed(data.SPEED);
      if (data.SPEED < 0) {
        data.SPEED = 0;
        updateSpeed(data.SPEED);
      }

      wheelRpm = data.SPEED / (60 * ((Math.PI * wheelDiameter) / 1000));
      rpm =
        data.SPEED /
        (60 *
          transmitionRatio *
          gears[gear] *
          ((Math.PI * wheelDiameter) / 1000));

      // Idle
      if (rpm < rpmIdle) {
        rpm = oldRpm;
        updateSpeed(oldSpeed);
      }
      // Gear shifter
      if (rpm > rpmRedzone) {
        gearUp();
      } else if (rpm <= rpmIdle + 10 || isBraking) {
        gearDown();
      }

      //update SOC GUI
      if (acceleration > 0) {
        let reducedSoc = data.SOC - (acceleration * 0.001).toFixed(3);
        if (reducedSoc >= 0) {
          data.SOC = reducedSoc;
          updateSoc(Math.round(data.SOC));
        }
      }

      //set odometer
      distanceTraveled = distanceTraveled + data.SPEED / 360000; //convert to km/s and add distance
      updateTotalDistance(Math.floor(distanceTraveled));
    })();
  };

  const handleKeyPress = (e) => {
    const LEFT_KEY = 37;
    const RIGHT_KEY = 39;
    console.log("keyPressed", e);
    switch (e.keyCode) {
      case LEFT_KEY: {
        ipcRenderer.send(events.SWITCH_SCREEN, -1);
        break;
      }
      case RIGHT_KEY: {
        ipcRenderer.send(events.SWITCH_SCREEN, 1);
        break;
      }
      default:
    }
  };

  const handleToggleDarkMode = async () => {
    let isDark = await ipcRenderer.invoke(channels.TOGGLE_DARK_MODE);
    setIsDark(isDark);
  };

  const handleSwitchScreen = (ev, index) => {
    let switchScrenIndex = screenIndexRef.current + index;
    if (switchScrenIndex >= 0 && switchScrenIndex < SCREENS.length) {
      setCurrentScreenIndex(switchScrenIndex);
    }
  };

  const navigateScreen = (screenName) => {
    let index = SCREENS.findIndex((screen) => screen.name === screenName);
    setCurrentScreenIndex(index);
  };

  const handleCharging = () => {
    ipcRenderer.send(events.TOGGLE_CHARGING_STATUS);
  };

  useEffect(() => {
    async function fetchData() {
      let data = await ipcRenderer.invoke(channels.GET_DATA);
      setData(data);
      setIsReady(true);
      handleInit(data);
    }
    fetchData();
    ipcRenderer.on(channels.DATA_UPDATED, (e, data) => {
      setData(data);
    });
    ipcRenderer.on(channels.SWITCH_SCREEN, handleSwitchScreen);
  }, []);

  return (
    <div className="app">
      <div className="app-header">
        <button onClick={handleToggleDarkMode} className="mode-btn">
          <BulbFilled style={{ color: isDark ? "white" : "black" }} />
        </button>
        <button
          onClick={handleCharging}
          className="btn"
          style={{ left: 10, position: "absolute" }}
        >
          <i
            className="fa fa-plug footer-icon"
            style={{ color: data.CHARGING_STATUS ? "#3d7087" : "grey" }}
          />
        </button>
      </div>
      <div className="app-body">
        {isReady ? SCREENS[currentScreenIndex].screen : "Loading....."}
      </div>
      <Footer
        currentScreen={SCREENS[currentScreenIndex].name}
        navigateScreen={navigateScreen}
      />
    </div>
  );
}

export default App;
