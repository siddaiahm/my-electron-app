import React from "react";

function Settings({ tabInfo, currentTabIndex }) {
  return (
    <div className="settings-screen">
      <div className="left-tab">
        <div className="tab-title">{tabInfo.name}</div>
        {tabInfo.tabArray.map((tab) => (
          <div
            key={tab.id}
            className={
              "tab-btn " + (currentTabIndex === tab.id ? "active" : "")
            }
          >
            <button>{tab.name}</button>
          </div>
        ))}
      </div>
      <div className="right-tab">
        {tabInfo.tabArray[currentTabIndex].component}
      </div>
    </div>
  );
}

export default Settings;
