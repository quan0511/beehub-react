import { useDispatch, useSelector } from "react-redux";
import { selectCurrentToken, setCredentials } from "./authSlice";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import APIService from "../features/APIService";
import { Spinner } from "react-bootstrap";

function RequireAuth() {
    const [ token, setToken ] = useState(useSelector(selectCurrentToken))
    const location = useLocation()
    const navigate = useNavigate()

    const dispatch = useDispatch()

    useEffect(() => {
        if (!token) {
            tryRefreshToken()
        }
    }, [])

    const tryRefreshToken = async () => {
        try {
            const response = await APIService.axios.get('/auth/refresh')
            dispatch(setCredentials(response?.data))
            setToken(response?.data?.token)
        } catch(e) {
            console.error(e)
            navigate('/login', { replace: true })
        }
    }

    return ( 
        token
            ? <Outlet/>
            : <div className="w-100 min-vh-100 d-flex justify-content-center align-items-center">
                <Spinner style={{color: '#8224e3'}}/>
            </div>
    );
}

export default RequireAuth;