import React from "react";
import {  Outlet } from "react-router-dom";
import NavigatorBar from "../components/NavigatorBar";
import Panel from "../components/Panel";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../auth/authSlice";
function Layout2(){
    
    return (
        <div className="d-flex flex-row m-0 overflow-x-hidden position-relative">
            <div className="position-relative" style={{width: "80px",zIndex:1}}>
                <div style={{zIndex: 0,position: "fixed",top: "0", left: "0"}}>
                    <Panel />
                </div>
            </div>
            <div className='d-flex flex-column w-100 position-relative' style={{marginLeft:"40px",zIndex:0}}>
                <NavigatorBar />
                <Outlet />
            </div>
        </div>
    );
}
export default Layout2;