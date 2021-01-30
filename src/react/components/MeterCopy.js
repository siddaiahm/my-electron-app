import React, { useEffect, useState } from "react";

function Meter() {
  const [meterValue, setMeterValue] = useState(0);
  const [chargeValue, setChargeValue] = useState(0);
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

  let leftTransformerDegree = "0deg";
  leftTransformerDegree = value2percent(meterValue) * 1.8 + "deg";
  let rightTransformerDegree = "180deg";
  rightTransformerDegree = -(17 * 1.8 + chargeValue * 1.25) + "deg";

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

    let soc = 90;
    let distanceTraveled = 0;
    // Helper functions

    setChargeValue(soc);

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

      //update charge GUI
      if (acceleration > 0) {
        let reducedSoc = soc - (acceleration * 0.001).toFixed(3);
        if (reducedSoc >= 0) {
          soc = reducedSoc;
          setChargeValue(Math.round(soc));
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
    handleInit();
  }, []);

  return (
    <>
      <div className="circle1">
        <div className="circle2">
          <div className="circle3">
            <div className="circle4">
              <div
                className="circle5"
                style={{
                  transform:
                    "translateX(-50%) rotate(" +
                    leftTransformerDegree +
                    ") translateX(50%)",
                }}
              ></div>
              <div className="circle6"></div>
            </div>
          </div>
        </div>
        <div className="circle7">
          <div className="circle8">
            <div className="circle9" />
            <div
              className="circle10"
              style={{
                transform: `translateX(50%) rotate(${rightTransformerDegree}) translateX(-50%)`,
              }}
            ></div>
          </div>
          <div className="circle11" />
          <div className="circle12">
            <div className="circle13">{chargeValue + "%"}</div>
          </div>
          <div className="circle14">
            <div className="circle15">
              <i class="fa fa-rotate-180 fa-battery-0 icon1"></i>
              <i class="fa fa-rotate-270 fa-bolt icon2"></i>
            </div>
          </div>
        </div>
        <div className="circle16" />
        <div className="inner-circle">
          <div className="inner-circle1">
            <div className="inner-circle2">
              <div className="inner-circle3">
                <div className="inner-circle4">
                  <i className="inner-text1">{meterValue}</i>
                  <i className="inner-text2">KM/H</i>
                  <div className="inner-center-line" />
                  <i className="inner-text3">170</i>
                  <i className="inner-text2">KM LEFT</i>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
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
    </>
  );
}

export default Meter;
