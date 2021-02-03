import React from "react";
import { ReactSVG } from "react-svg";
import svg from "./../assets/img/speedometer.svg";

function Meter({ SOC, SPEED, ODO_METER, TRIP_METER }) {
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

  return (
    <div style={{ width: 300, height: 300 }}>
      <ReactSVG
        src={svg}
        renumerateIRIElements={false}
        loading={() => <span>Loading...</span>}
        afterInjection={(error, _) => {
          if (error) {
            return;
          }
          let socMask = document.getElementById("socMask");
          socMask.setAttribute(
            "transform",
            `rotate(${125 * (100 - SOC) * 0.01})`
          );
          socMask.setAttribute("transform-origin", "50% 50%");
          let speedMask = document.getElementById("speedMask");
          let meterValue = Math.round(SPEED);
          speedMask.setAttribute(
            "transform",
            `rotate(-${170 * (100 - value2percent(meterValue)) * 0.01})`
          );
          speedMask.setAttribute("transform-origin", "50% 50%");
          let speedText = document.getElementById("speedText");
          speedText.textContent = meterValue;
          let socText = document.getElementById("socText");
          socText.textContent = SOC + "%";
        }}
      />
      <div className="meter-info">
        <div className="odo-meter">
          <i>Odometer</i>
          <i>{ODO_METER} km</i>
        </div>
        <div className="trip-meter">
          <i>Tripmeter</i>
          <i>{TRIP_METER} km</i>
        </div>
      </div>
    </div>
  );
}

export default Meter;
