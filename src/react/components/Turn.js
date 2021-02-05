import React, { useState } from "react";
import left from "./../assets/img/left-turn.svg";
import right from "./../assets/img/right-turn.svg";
import strait from "./../assets/img/strait.svg";
import u from "./../assets/img/u-turn.svg";
function Turn() {
  const [currentTurn, setCurrentTurn] = useState("right");
  const TURNS = {
    left: left,
    right: right,
    strait: strait,
    u: u,
  };
  return (
    <div
      className="turn-container"
      //   style={{
      //     width: "25%",
      //     display: "flex",
      //     flexDirection: "column",
      //     alignItems: "center",
      //     justifyContent: "center",
      //   }}
    >
      <img src={TURNS[currentTurn]} style={{ width: "80%" }} />
      <div
        style={{
          textTransform: "uppercase",
        }}
      >
        500M Turn right
      </div>
    </div>
  );
}

export default Turn;
