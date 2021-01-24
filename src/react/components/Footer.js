import React, { useEffect, useState } from "react";
import { BranchesOutlined, SettingFilled } from "@ant-design/icons";
import logo from "../assets/img/logo.png";
function Footer() {
  const [date, setDate] = useState(new Date());
  const [iconStyle, setIconStyle] = useState({});

  const handleDate = () => {
    (function loop() {
      window.requestAnimationFrame(loop);
      setDate(new Date());
    })();
  };
  useEffect(() => {
    handleDate();
  }, []);

  const handleNavigation = (icon) => {
    setIconStyle({ [icon]: "active" });
  };

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
        <button className="btn" onClick={() => handleNavigation("nav")}>
          <i className={"fa fa-map footer-icon " + (iconStyle["nav"] || "")} />
        </button>
        <button className="app-logo" onClick={() => handleNavigation({})}>
          <img
            src={logo}
            style={{
              width: 40,
              height: 40,
            }}
          />
        </button>
        <button className="btn" onClick={() => handleNavigation("setting")}>
          <i
            className={"fa fa-cog footer-icon " + (iconStyle["setting"] || "")}
            // style={iconStyle["setting"] || {}}
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
