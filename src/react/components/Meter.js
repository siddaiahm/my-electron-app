import React, { useEffect, useState } from "react";

import { ReactSVG } from "react-svg";
import svg from "./../assets/img/speedometer.svg";

function Meter({ soc, updateSoc }) {
  const [meterValue, setMeterValue] = useState(0);
  const [isReady, setIsReady] = useState(false);
  const [totalDistance, setTotalDistance] = useState(0);
  const [tripDistance, setTripDistance] = useState(4);

  let config = {
    valueMin: 0,
    valueMax: 220,
    valueRed: 165,
    angleMin: 0,
    angleMax: 180,
  };
  const value2percent = function (value) {
    let angle =
      (value / (config.valueMax - config.valueMin)) *
        (config.angleMax - config.angleMin) +
      config.angleMin;
    let percent = (angle / 180) * 100;
    return percent;
  };

  const handleInit = () => {
    document.onkeydown = keyDown;
    document.onkeyup = keyUp;

    function keyDown(e) {
      e = e || window.event;
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
      speed = 0, // in km/h
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

    function kmh2ms(speed) {
      // Km/h to m/s
      return speed / 3.6;
    }

    (function loop() {
      window.requestAnimationFrame(loop);

      // Delta time
      nowTime = new Date().getTime();
      delta = (nowTime - lastTime) / 1000; // in seconds
      lastTime = nowTime;

      let oldSpeed = speed,
        oldRpm = rpm;
      // Torque

      if (isAccelerating && rpm < rpmMax && soc >= 1) {
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
      resistance = (0.5 * 1.2 * cx * kmh2ms(speed)) ^ 2;

      // Speed

      speed += (acceleration - resistance) * delta;

      if (speed < 0) {
        speed = 0;
      }

      wheelRpm = speed / (60 * ((Math.PI * wheelDiameter) / 1000));
      rpm =
        speed /
        (60 *
          transmitionRatio *
          gears[gear] *
          ((Math.PI * wheelDiameter) / 1000));

      // Idle
      if (rpm < rpmIdle) {
        rpm = oldRpm;
        speed = oldSpeed;
      }
      // Gear shifter
      if (rpm > rpmRedzone) {
        gearUp();
      } else if (rpm <= rpmIdle + 10 || isBraking) {
        gearDown();
      }

      //update soc GUI
      if (acceleration > 0) {
        let reducedSoc = soc - (acceleration * 0.001).toFixed(3);
        if (reducedSoc >= 0) {
          soc = reducedSoc;
          updateSoc(Math.round(soc));
        }
      }

      // Update GUI
      setMeterValue(Math.round(speed));
      //set odometer
      distanceTraveled = distanceTraveled + speed / 360000; //convert to km/s and add distance
      setTotalDistance(Math.floor(distanceTraveled));
    })();
  };

  useEffect(() => {
    if (isReady) {
      handleInit();
    }
  }, [isReady]);

  useEffect(() => {
    return () => setIsReady(false);
  }, []);

  return (
    <div style={{ width: 300, height: 300 }}>
      <ReactSVG
        src={svg}
        renumerateIRIElements={false}
        afterInjection={() => {
          setIsReady(true);
          let socMask = document.getElementById("socMask");
          socMask.setAttribute(
            "transform",
            `rotate(${121 * (100 - soc) * 0.01})`
          );
          socMask.setAttribute("transform-origin", "50% 50%");
          let speedMask = document.getElementById("speedMask");
          speedMask.setAttribute(
            "transform",
            `rotate(-${170 * (100 - value2percent(meterValue)) * 0.01})`
          );
          speedMask.setAttribute("transform-origin", "50% 50%");
          let speedText = document.getElementById("speedText");
          speedText.textContent = meterValue;
          let socText = document.getElementById("socText");
          socText.textContent = soc + "%";
        }}
      />
      <div className="meter-info">
        <div className="odo-meter">
          <i>Odometer</i>
          <i>{totalDistance} km</i>
        </div>
        <div className="trip-meter">
          <i>Tripmeter</i>
          <i>{tripDistance} km</i>
        </div>
      </div>
    </div>
  );
}

export default Meter;
