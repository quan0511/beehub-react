import React, { useEffect } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import NavigatorBar from "../components/NavigatorBar";
import Panel from "../components/Panel";
import { useDispatch, useSelector } from "react-redux";
import { selectCurrentToken } from "../auth/authSlice";
function Layout2({appUser}){
    const dispatch = useDispatch()
    const token = useSelector(selectCurrentToken)
    const location = useLocation()
    useEffect(() => {
        if (token !== null) return
        // if (localStorage.getItem('token') !== null) dispatch(setCredentials({ ...userData }))
    })
    if(!token){
        <Navigate to="/login" state={{ from: location }} replace/>
    }
    return (
        <div className="d-flex flex-row m-0 overflow-x-hidden">
            <Panel />
            <div className='d-flex flex-column w-100'>
                <NavigatorBar />
                <Outlet />
            </div>
        </div>
    );
}
export default Layout2;