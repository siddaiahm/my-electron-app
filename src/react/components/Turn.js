import React from "react";
import left from "./../assets/img/left-turn.svg";
import right from "./../assets/img/right-turn.svg";
import strait from "./../assets/img/strait.svg";
import u from "./../assets/img/u-turn.svg";
function Turn() {
  const routeInfo = { modifier: "left", instruction: ["500M Turn left"] };
  const TURNS = {
    left: left,
    right: right,
    strait: strait,
    uturn: u,
  };
  return (
    <div className="turn-container">
      <img src={TURNS[routeInfo["modifier"]]} style={{ width: "80%" }} />
      <div className="map-instruction">
        {routeInfo.instruction &&
          routeInfo.instruction.map((intst, index) => (
            <i key={index}>{intst}</i>
          ))}
      </div>
    </div>
  );
}

export default Turn;
