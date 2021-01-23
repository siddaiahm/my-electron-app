import "./assets/style/index.css";
import { channels } from "../shared/constants";
import React, { useState } from "react";
import { BulbFilled } from "@ant-design/icons";
import Footer from "./components/Footer";
import Meter from "./components/Meter";
const { ipcRenderer } = window;

function App() {
  const [isDark, setIsDark] = useState(false);

  const handleToggleDarkMode = async () => {
    let isDark = await ipcRenderer.invoke(channels.TOGGLE_DARK_MODE);
    setIsDark(isDark);
  };

  return (
    <div className="app">
      <div className="app-header">
        <button onClick={handleToggleDarkMode} className="mode-btn">
          <BulbFilled style={{ color: isDark ? "white" : "black" }} />
        </button>
      </div>
      <div className="app-body">
        <Meter />
      </div>
      <Footer />
    </div>
  );
}

export default App;
