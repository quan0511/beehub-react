import React from "react";

import "./Trigger.scss"

export function Trigger({collapsed, setCollapsed} :{collapsed : boolean, setCollapsed: Function}) {
    return (
        <div className={!collapsed ? "trigger opened" : "trigger"} onClick={() => setCollapsed(!collapsed)}>
            <span className="dart"></span>
        </div>
    );
}