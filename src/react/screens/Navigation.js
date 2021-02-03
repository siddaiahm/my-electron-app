import React from "react";
import Meter from "../components/Meter";

function Navigation({ data }) {
  return (
    <>
      <Meter {...data} />
    </>
  );
}

export default Navigation;
