import "./assets/style/index.css";
import { channels } from "../shared/constants";
import React, { useEffect, useRef, useState } from "react";
import { BulbFilled } from "@ant-design/icons";
import Footer from "./components/Footer";
import Meter from "./components/Meter";
// import Test from "./components/test1";
import Charge from "./components/charge";
const { ipcRenderer } = window;

function App() {
  const [isDark, setIsDark] = useState(false);
  const [isCharging, setIsCharging] = useState(false);
  const [soc, setSoc] = useState(0);
  const [interVal, setInterVal] = useState(null);
  let socRef = useRef();
  socRef.current = soc;

  const handleToggleDarkMode = async () => {
    let isDark = await ipcRenderer.invoke(channels.TOGGLE_DARK_MODE);
    setIsDark(isDark);
  };

  const updateSoc = (newSoc) => {
    if (newSoc >= 0 && newSoc <= 100) {
      setSoc(newSoc);
    }
  };

  const handleCharging = () => {
    if (!isCharging) {
      let interVal = setInterval(() => {
        let increaseSoc = socRef.current + 1;
        updateSoc(increaseSoc);
      }, 3000);
      setInterVal(interVal);
    } else {
      clearInterval(interVal);
    }
    setIsCharging(!isCharging);
  };

  useEffect(() => {
    async function fetchData() {
      let soc = await ipcRenderer.invoke(channels.GET_SOC);
      setSoc(soc);
    }
    fetchData();
  }, []);

  return (
    <div className="app">
      <div className="app-header">
        <button onClick={handleToggleDarkMode} className="mode-btn">
          <BulbFilled style={{ color: isDark ? "white" : "black" }} />
        </button>
        <button
          onClick={handleCharging}
          className="btn"
          style={{ left: 10, position: "absolute" }}
        >
          <i
            className="fa fa-plug footer-icon"
            style={{ color: isCharging ? "#3d7087" : "grey" }}
          />
        </button>
      </div>
      <div className="app-body">
        {isCharging ? (
          <Charge soc={soc} />
        ) : (
          <Meter soc={soc} updateSoc={updateSoc} />
        )}
        {/* <Test /> */}
      </div>
      <Footer />
    </div>
  );
}

export default App;
