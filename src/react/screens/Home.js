import React from "react";
import Meter from "../components/Meter";

function Home({ data }) {
  return (
    <div className="home-screen">
      <Meter {...data} />
    </div>
  );
}

export default Home;
