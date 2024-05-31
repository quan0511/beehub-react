import React from "react";
import { Col, Container, Row, Spinner} from "react-bootstrap";
import {Outlet } from "react-router-dom";
import SessionLeft from "../components/SessionLeft";
import NavigatorBar from "../components/NavigatorBar";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../auth/authSlice";
import BeehubSpinner from "../components/BeehubSpinner";
function Layout(){
    const user = useSelector(selectCurrentUser);
    // const user=null;
    if(user==null){
        return (
        <Container className="p-0 overflow-x-hidden" fluid>
            <Row >
                <Col xl={9} className='p-0 d-flex flex-column justify-content-center align-items-center mx-auto'style={{height: "600px"}}>
                    <div >
                        {BeehubSpinner ()}
                    </div>
                </Col>
            </Row>
        </Container>    
        );
    }
    return (
        <Container className="p-0 overflow-x-hidden" fluid>
            <Row >
                <Col xl={3} className='p-0 session_left' >
                    <SessionLeft appUser={user}/>
                </Col>
                <Col xl={9} md={12}  className='p-0 main'>
                    <div className='d-flex flex-column'>
                        <NavigatorBar user={user}/>
                        <Outlet />
                    </div>
                </Col>
            </Row>
        </Container>
    );
}
export default Layout;