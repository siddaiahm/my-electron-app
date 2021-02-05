import React from "react";
import Map from "../components/Map";
import Meter from "../components/Meter";
import Turn from "../components/Turn";

function Navigation({ data }) {
  return (
    <div className="navigation-screen">
      <Turn />
      <Meter {...data} />
      <Map />
    </div>
  );
}

export default Navigation;
