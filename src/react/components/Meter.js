import React from "react";
import { ReactSVG } from "react-svg";
import svg from "./../assets/img/speedometer.svg";

function Meter({ SOC, SPEED, ODO_METER, TRIP_METER, style }) {
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
    <div style={style}>
      <ReactSVG
        src={svg}
        renumerateIRIElements={false}
        loading={() => <span>Loading...</span>}
        afterInjection={(error, svg) => {
          if (error) {
            return;
          }
          let socMask = document.getElementById("socMask");
          let speedMask = document.getElementById("speedMask");
          let speedText = document.getElementById("speedText");
          let socText = document.getElementById("socText");
          let socElm = document.getElementById("soc");
          if (socMask && speedMask && speedText && socText && socElm) {
            socMask.setAttribute(
              "transform",
              `rotate(${125 * (100 - SOC) * 0.01})`
            );
            socMask.setAttribute("transform-origin", "50% 50%");
            let meterValue = Math.round(SPEED);
            speedMask.setAttribute(
              "transform",
              `rotate(-${170 * (100 - value2percent(meterValue)) * 0.01})`
            );
            speedMask.setAttribute("transform-origin", "50% 50%");
            speedText.textContent = meterValue;
            socText.textContent = SOC + "%";

            if (SOC < 30) {
              socElm.setAttribute("fill", "red");
            } else {
              socElm.setAttribute("fill", "url(#linearGradient1460)");
            }
          }
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
