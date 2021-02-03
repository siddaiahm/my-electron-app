import React from "react";
import Meter from "../components/Meter";
import Charge from "../components/charge";

function Home({ data }) {
  return (
    <>{data.CHARGING_STATUS ? <Charge {...data} /> : <Meter {...data} />}</>
  );
}

export default Home;
