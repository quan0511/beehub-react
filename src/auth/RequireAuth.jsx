import { useDispatch, useSelector } from "react-redux";
import { selectCurrentToken, setCredentials } from "./authSlice";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useEffect } from "react";

function RequireAuth() {
    const dispatch = useDispatch()
    const token = useSelector(selectCurrentToken)
    const location = useLocation()

    useEffect(() => {
        if (token !== null) return
        // if (localStorage.getItem('token') !== null) dispatch(setCredentials({ ...userData }))
    })

    return ( 
        token
            ? <Outlet/>
            : <Navigate to="/login" state={{ from: location }} replace/>
    );
}

export default RequireAuth;