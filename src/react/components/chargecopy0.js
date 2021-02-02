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
              top: "55%", //height * 0.55,
              right: "50%", //width * 0.25,
              width: "50%", //width * 0.25,
              height: "10%", // width * 0.2,
              overflow: "hidden",
              transformOrigin: "top right",
              transform: `skewY(-35deg) rotate(-16deg)`,
            }}
          >
            <div
              style={{
                position: "absolute",
                top: 0,
                right: 0,
                backgroundColor: "#606062",
                width: "140%",
                height: "100%",
                transformOrigin: "top right",
                transform: "rotate(-45deg)",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  width: "100%",
                  height: "100%",
                  backgroundColor: "#3d7087",
                }}
              ></div>
            </div>
          </div>
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
          <div
            style={{
              position: "absolute",
              left: 0,
              top: 0,
              width: "100%",
              height: 0,
              borderTop: `${height * 0.5}px solid #bdbec0`,
              borderBottom: 0,
              borderLeft: `${width * 0.5}px solid transparent`, //`${width * 0.5}px solid transparent`,
            }}
          ></div>
          <div
            style={{
              position: "absolute",
              left: 0,
              top: 0,
              width: "100%",
              height: "110%",
              backgroundColor: "#3d7087",
              transformOrigin: "top left",
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
              top: "55%", //height * 0.55,
              left: "50%", //width * 0.25,
              width: "50%", //width * 0.25,
              height: "10%", //width * 0.2,
              overflow: "hidden",
              transformOrigin: "top left",
              transform: `skewY(35deg) rotate(16deg)`,
            }}
          >
            <div
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                backgroundColor: "#606062",
                width: "140%",
                height: "100%",
                transformOrigin: "top left",
                transform: "rotate(45deg)",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  width: "100%",
                  height: "100%",
                  backgroundColor: "#579ebd",
                }}
              ></div>
            </div>
          </div>
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
          <div
            style={{
              position: "absolute",
              right: 0,
              top: 0,
              width: width * 0.5,
              height: 0,
              borderTop: `${height * 0.5}px solid #e7e8e9`,
              borderBottom: 0,
              borderRight: `${width * 0.5}px solid transparent`,
            }}
          ></div>
          <div
            style={{
              position: "absolute",
              top: 0,
              right: 0,
              width: "100%",
              height: "110%",
              backgroundColor: "#579ebd",
              transformOrigin: "top right",
              transform: `rotate(18.5deg)`,
            }}
          ></div>
        </div>
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
