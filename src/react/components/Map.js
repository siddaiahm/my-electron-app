import React, { useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";
// import MapboxDirections from "@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions";
// import "@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions.css";
import { timeDuration, convertDistance } from "../common";

function Map({ isDark, setRouteInfo }) {
  let mapRef = useRef("").current;
  let style = isDark
    ? "mapbox://styles/mapbox/dark-v10"
    : "mapbox://styles/mapbox/streets-v9";

  // const handleRouteUpdate = (route) => {
  //   let startRoute = route["route"][0];
  //   if (startRoute !== undefined) {
  //     const { distance, duration, legs } = startRoute;
  //     const { steps } = legs[0];
  //     let instruction = [];
  //     let location = null;
  //     let modifier;
  //     if (steps[0].maneuver.type === "depart") {
  //       let tdistance = steps[0].distance + steps[1].distance;
  //       instruction.push(steps[0].maneuver.instruction);
  //       instruction.push(
  //         convertDistance(tdistance) + " " + steps[1].maneuver.instruction
  //       );
  //       location = steps[1].maneuver.location;
  //       modifier = steps[1].maneuver.modifier || "strait";
  //     } else {
  //       instruction.push(
  //         convertDistance(steps[0].distance) +
  //           " " +
  //           steps[0].maneuver.instruction
  //       );
  //       location = steps[0].maneuver.location;
  //       modifier = steps[0].maneuver.modifier || "strait";
  //     }
  //     setRouteInfo({
  //       totalDistance: convertDistance(distance),
  //       totalDuration: timeDuration(duration),
  //       currentLocation: location,
  //       instruction: instruction,
  //       modifier: modifier,
  //     });
  //   }
  // };

  useEffect(() => {
    const mapBoxToken =
      "pk.eyJ1Ijoib3J4YW1vYmlsZWRldiIsImEiOiJja2h2dnI4YjU1N3RiMnRsNmxzcG0xOWprIn0.rpRo-VCSGalmGW-smZoA6w";

    // let directions = new MapboxDirections({
    //   accessToken: mapBoxToken,
    //   unit: "metric",
    //   profile: "mapbox/driving-traffic",
    //   alternatives: true,
    //   controls: {
    //     inputs: false,
    //     instructions: false,
    //     profileSwitcher: false,
    //   },
    //   zoom: 16,
    //   flyTo: true,
    //   congestion: true,
    // });
    // directions.setOrigin([77.5946, 12.9716]);
    // directions.setDestination([77.5046, 12.9016]);

    mapboxgl.accessToken = mapBoxToken;
    let map = new mapboxgl.Map({
      container: mapRef,
      style: style,
      center: [77.5946, 12.9716],
      zoom: 13,
    });
    map.setStyle(style);
    map.setCenter([77.5946, 12.9716]);
    // map.addControl(directions);
    map.flyTo({
      center: [77.5946, 12.9716],
      zoom: 15,
      speed: 0.5,
      easing: function (t) {
        return t;
      },
    });
    // directions.on("route", handleRouteUpdate);
  }, []);

  return (
    <div className="map-container">
      <div
        style={{
          width: "100",
          height: "100%",
          overflow: "hidden",
          borderRadius: 15,
        }}
      >
        <div
          ref={(el) => (mapRef = el)}
          style={{
            width: "100%",
            height: "120%",
          }}
        ></div>
      </div>
      <div className="map-shadow"></div>
    </div>
  );
}

export default Map;
