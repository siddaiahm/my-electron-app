import React, { useEffect, useState } from "react";

import { ReactSVG } from "react-svg";
// import svg from "./../assets/img/drawing1.svg";
import svg from "./../assets/img/speedometer2.svg";

function Test() {
  return (
    <div style={{ width: 400, height: 400 }}>
      <ReactSVG
        src={svg}
        renumerateIRIElements={false}
        afterInjection={() => {
          let left = document.getElementById("speedMask");
          left.style.transform = "rotate(-172deg)";
          left.style.transformOrigin = "50% 50%";
          //   let right = document.getElementById("path36");
          //   right.style.transform = "rotate(10deg)";
          //   right.style.transformOrigin = "46% 41%";
          //   transform-origin: 50% 50%;
          //           transform: rotate(180deg);
        }}
      />
    </div>
  );
}

export default Test;
