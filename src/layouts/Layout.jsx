import React, { useEffect } from "react";
import { Col, Container, Row} from "react-bootstrap";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import SessionLeft from "../components/SessionLeft";
import NavigatorBar from "../components/NavigatorBar";
import { useDispatch, useSelector } from "react-redux";
import { selectCurrentToken } from "../auth/authSlice";
function Layout(){
    const dispatch = useDispatch()
    const token = useSelector(selectCurrentToken)
    const location = useLocation()
    useEffect(() => {
        if (token !== null) return
        // if (localStorage.getItem('token') !== null) dispatch(setCredentials({ ...userData }))
    })
    if(location.pathname=='/login'|| location.pathname=='/register'){
    
        return <Container className="p-0" fluid>
            <Outlet />
        </Container>
    }
    return (
        token ?
        <Container className="p-0" fluid>
            <Row>
                <Col xl={3} className='p-0 ' >
                    <SessionLeft/>
                </Col>
                <Col xl={9} className='p-0'>
                    <div className='d-flex flex-column'>
                        <NavigatorBar/>
                        <Outlet />
                    </div>
                </Col>
            </Row>
        </Container>
        : <Navigate to="/login" state={{ from: location }} replace/>
    );
}
export default Layout;