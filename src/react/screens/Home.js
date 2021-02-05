import React from "react";
import Meter from "../components/Meter";
import Charge from "../components/charge";

function Home({ data }) {
  return (
    <div className="home-screen">
      {data.CHARGING_STATUS ? <Charge {...data} /> : <Meter {...data} />}
    </div>
  );
}

export default Home;
