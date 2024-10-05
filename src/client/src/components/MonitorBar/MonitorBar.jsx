import React from "react";
 
const MonitorBar = React.memo(({ width = 0, text = "", heading= "" }) => {
    return <div className="monitor-bar-container">
        <h4>{heading}</h4>
        <div className="bar-monitor">
            <div className="filled-data" style={{ width: width }}>
                <div className="filled-text"><span>{text}</span></div>
            </div>
        </div>
        </div>
});

export default MonitorBar;