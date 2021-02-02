import React, { useEffect, useState } from "react";

import { ReactSVG } from "react-svg";
// import svg from "./../assets/img/drawing1.svg";
import svg from "./../assets/img/speedometer2.svg";

function Test() {
  return (
    <div style={{ width: 200, height: 300 }}>
      <ReactSVG
        src={svg}
        renumerateIRIElements={false}
        afterInjection={() => {
          let left = document.getElementById("leftChargeMask");
          let right = document.getElementById("rightChargeMask");
          let chargeText = document.getElementById("chargeText");
          let timeText = document.getElementById("timeText");
        }}
      />
    </div>
  );
}

export default Test;
