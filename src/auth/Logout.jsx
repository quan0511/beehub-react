import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useLogoutMutation } from "./authApiSlice";
import { Navigate } from "react-router-dom";
import BeehubSpinner from "../components/BeehubSpinner";
import { logOut } from "./authSlice";
import { closeChat } from "../messages/chatboxSlice";
import { endWs } from "../messages/websocketSlice";

function Logout() {
    const [logout, { isLoading }] = useLogoutMutation()
    const dispatch = useDispatch();

    const handleLogout = async () => {
        // logout from server
        await logout()
        // logout from client
        dispatch(closeChat())
        dispatch(endWs())
        dispatch(logOut())
    }
    useEffect(() => {
        handleLogout()
    })
    return isLoading ?
        <div className="w-100 min-vh-100 d-flex justify-content-center align-items-center">
            <BeehubSpinner />
        </div>
        : <Navigate to={'/login'} replace={true} />;
}

export default Logout;