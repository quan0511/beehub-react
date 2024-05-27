import React from "react";
import { Outlet } from "react-router-dom";
import NavigatorBar from "../components/NavigatorBar";
import Panel from "../components/Panel";
function Layout2({appUser}){
    return (
        <div className="d-flex flex-row m-0 overflow-x-hidden">
            <Panel />
            <div className='d-flex flex-column w-100'>
                <NavigatorBar user={appUser}/>
                <Outlet />
            </div>
        </div>
    );
}
export default Layout2;