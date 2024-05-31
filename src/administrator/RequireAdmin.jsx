import { useSelector } from "react-redux";
import { selectCurrentRoles } from "../auth/authSlice";
import { Navigate, Outlet } from "react-router-dom";

export const ADMIN = "ROLE_ADMIN"

function RequireAdmin() {
    const roles = useSelector(selectCurrentRoles)

    return roles?.includes(ADMIN) ?
        <Outlet/> : 
        <Navigate to={'/'}/>
}

export default RequireAdmin;