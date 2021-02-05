import React, { useEffect, useState } from "react";

import { ReactSVG } from "react-svg";
import { duration } from "../common";
import svg from "./../assets/img/charge.svg";

function Charge({ SOC }) {
  return (
    <div style={{ width: 200, height: 300 }}>
      <ReactSVG
        src={svg}
        renumerateIRIElements={false}
        loading={() => <span>Loading...</span>}
        afterInjection={(error, svg) => {
          if (error) {
            return;
          }
          let leftMask = document.getElementById("leftChargeMask");
          let rightMask = document.getElementById("rightChargeMask");
          let chargeText = document.getElementById("chargeText");
          let timeText = document.getElementById("timeText");
          if (leftMask && rightMask && chargeText && timeText) {
            chargeText.textContent = SOC + "%";
            let translateY = `translate(0,${250 * (100 - SOC) * 0.01})`;
            leftMask.setAttribute("transform", translateY);
            rightMask.setAttribute("transform", translateY);
            timeText.textContent = duration(SOC);
          }
        }}
      />
    </div>
  );
}

export default Charge;
