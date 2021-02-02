import React, { useEffect, useState } from "react";

import { ReactSVG } from "react-svg";
import { duration } from "../common";
import svg from "./../assets/img/charge.svg";

function Charge({ soc }) {
  return (
    <div style={{ width: 200, height: 300 }}>
      <ReactSVG
        src={svg}
        renumerateIRIElements={false}
        afterInjection={() => {
          let leftMask = document.getElementById("leftChargeMask");
          let rightMask = document.getElementById("rightChargeMask");
          let chargeText = document.getElementById("chargeText");
          chargeText.textContent = soc + "%";
          let translateY = `translate(0,${250 * (100 - soc) * 0.01})`;
          leftMask.setAttribute("transform", translateY);
          rightMask.setAttribute("transform", translateY);
          let timeText = document.getElementById("timeText");
          timeText.textContent = duration(soc);
        }}
      />
    </div>
  );
}

export default Charge;
