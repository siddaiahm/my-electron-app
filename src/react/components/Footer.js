import React, { useEffect, useState } from "react";
import logo from "../assets/img/logo.png";

function Footer({ currentScreen, navigateScreen }) {
  const [date, setDate] = useState(new Date());

  const handleDate = () => {
    (function loop() {
      window.requestAnimationFrame(loop);
      setDate(new Date());
    })();
  };
  useEffect(() => {
    handleDate();
  }, []);

  return (
    <div className="footer">
      <div className="footer-left">
        {date.toLocaleDateString(navigator.language, {
          weekday: "short",
          month: "short",
          day: "numeric",
        })}
      </div>
      <div className="footer-center">
        <button className="btn" onClick={() => navigateScreen("NAVI")}>
          <i
            className={
              "fa fa-map footer-icon " +
              (currentScreen === "NAVI" ? "active" : "")
            }
          />
        </button>
        <button className="app-logo" onClick={() => navigateScreen("HOME")}>
          <img
            src={logo}
            style={{
              width: 40,
              height: 40,
            }}
          />
        </button>
        <button className="btn" onClick={() => navigateScreen("SETT")}>
          <i
            className={
              "fa fa-cog footer-icon " +
              (currentScreen === "SETT" ? "active" : "")
            }
          />
        </button>
      </div>
      <div className="footer-right">
        {date.toLocaleTimeString(navigator.language, {
          hour: "2-digit",
          minute: "2-digit",
        })}
      </div>
    </div>
  );
}

export default Footer;
