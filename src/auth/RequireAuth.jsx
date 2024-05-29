import { useSelector } from "react-redux";
import { selectCurrentToken, setCredentials } from "./authSlice";
import { Navigate, Outlet, useLocation } from "react-router-dom";

function RequireAuth() {
    const token = useSelector(selectCurrentToken)
    const location = useLocation()
    console.log(token);
    return ( 
        token
            ? <Outlet/>
            : <Navigate to="/login" state={{ from: location }} replace/>
    );
}

export default RequireAuth;