import React from "react";
import {  Outlet } from "react-router-dom";
import NavigatorBar from "../components/NavigatorBar";
import Panel from "../components/Panel";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../auth/authSlice";
function Layout2(){
    
    return (
        <div className="d-flex flex-row m-0 overflow-x-hidden position-relative">
            <div className="position-relative d-none d-xl-block" style={{zIndex:1}}>
                <div className="" style={{width: "80px",}}>
                    <div style={{zIndex: 0,position: "fixed",top: "0", left: "0"}}>
                        <Panel />
                    </div>
                </div>
            </div>
            <div className='d-flex flex-column position-relative layout2-main' style={{zIndex:0,width:"-webkit-fill-available"}}>
                <NavigatorBar hideButton={true} />
                <Outlet />
            </div>
        </div>
    );
}
export default Layout2;