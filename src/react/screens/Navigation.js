import React, { useState } from "react";
import Map from "../components/Map";
import Meter from "../components/Meter";
import Turn from "../components/Turn";

function Navigation({ data, isDark }) {
  const [routeInfo, setRouteInfo] = useState(null);

  return (
    <div className="navigation-screen">
      <Turn routeInfo={routeInfo} />
      <Meter {...data} style={{ width: "30%" }} />
      <Map isDark={isDark} setRouteInfo={setRouteInfo} />
    </div>
  );
}

export default Navigation;
