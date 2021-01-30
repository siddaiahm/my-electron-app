import React from "react";

function Charge() {
  const width = 200,
    height = 300,
    border = "1px solid black";
  return (
    <div
      style={{
        width: width,
        height: height,
        display: "flex",
      }}
    >
      <div
        style={{
          position: "relative",
          width,
          height,
        }}
      >
        <div
          style={{
            position: "absolute",
            width: width * 0.5,
            height,
            overflow: "hidden",
            backgroundColor: "white",
          }}
        >
          <div
            style={{
              position: "absolute",
              top: height * 0.55,
              width: 0,
              height: 0,
              borderBottom: `${width * 0.21}px solid #606062`,

              borderLeft: `${width * 0.25}px solid transparent`,
              transformOrigin: "top right",
              transform: `skewY(-18.5deg) rotate(-17deg)`,
            }}
          ></div>
          <div
            style={{
              position: "relative",
              width: "100%",
              height: "110%",
              transformOrigin: "top left",
              backgroundColor: "#939598",
              transform: `rotate(-18.5deg)`,
            }}
          ></div>
        </div>
        <div
          style={{
            position: "absolute",
            width: width * 0.5,
            height,
            right: 0,
            overflow: "hidden",
            backgroundColor: "white",
          }}
        >
          <div
            style={{
              position: "absolute",
              top: height * 0.55,
              left: width * 0.25,
              width: 0,
              height: 0,
              borderBottom: `${width * 0.21}px solid #606062`,
              borderRight: `${width * 0.25}px solid transparent`,
              transformOrigin: "top left",
              transform: `skewY(18.5deg) rotate(17deg)`,
            }}
          ></div>
          <div
            style={{
              position: "relative",
              width: "100%",
              height: "110%",
              transformOrigin: "top right",
              backgroundColor: "#939598",
              overflow: "hidden",
              transform: `rotate(18.5deg)`,
            }}
          >
            <div
              style={{
                position: "absolute",
                left: "102%",
                width: "100%",
                height: "100%",
                transformOrigin: "top left",
                backgroundColor: "#d1d2d4",
                transform: `rotate(15deg)`,
              }}
            ></div>
          </div>
        </div>
        <div
          style={{
            position: "absolute",
            width: width * 0.5,
            height: 0,
            borderTop: `${height * 0.5}px solid #bdbec0`,
            opacity: 0.5,
            borderBottom: 0,
            borderLeft: `${width * 0.5}px solid transparent`,
          }}
        ></div>
        <div
          style={{
            position: "absolute",
            right: 0,
            width: width * 0.5,
            height: 0,
            borderTop: `${height * 0.5}px solid #e7e8e9`,
            opacity: 0.5,
            borderBottom: 0,
            borderRight: `${width * 0.5}px solid transparent`,
          }}
        ></div>
        <div
          style={{
            position: "absolute",
            width: width,
            height: 0,
            borderTop: `${height * 0.3}px solid white`,
            borderBottom: 0,
            borderLeft: `${width * 0.35}px solid transparent`,
            borderRight: `${width * 0.35}px solid transparent`,
          }}
        ></div>
      </div>
    </div>
  );
}

export default Charge;
