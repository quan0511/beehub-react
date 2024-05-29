import React from "react";
import {  Outlet } from "react-router-dom";
import NavigatorBar from "../components/NavigatorBar";
import Panel from "../components/Panel";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../auth/authSlice";
function Layout2(){
    
    return (
        <div className="d-flex flex-row m-0 overflow-x-hidden position-relative">
            <div className="fixed-top" style={{zIndex: 0}}>
                <Panel />
            </div>
            <div className='d-flex flex-column w-100' style={{marginLeft:"80px",zIndex: 1}}>
                <NavigatorBar />
                <Outlet />
            </div>
        </div>
    );
}
export default Layout2;