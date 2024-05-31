import { useDispatch, useSelector } from "react-redux";
import { selectCurrentToken, setCredentials } from "./authSlice";
import { Outlet, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Spinner } from "react-bootstrap";
import { axiosInstance } from "../hooks/useAxios";

function RequireAuth() {
    const [ token, setToken ] = useState(useSelector(selectCurrentToken))
    const navigate = useNavigate()
    const dispatch = useDispatch()
    
    useEffect(() => {
        if (!token) {
            tryRefreshToken()
        }
    }, [])

    const tryRefreshToken = async () => {
        try {
            const response = await axiosInstance.get('/auth/refresh')
            dispatch(setCredentials(response?.data))
            setToken(response?.data?.token)
        } catch(e) {
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