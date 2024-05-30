import React from "react";
import { Col, Container, Row, Spinner} from "react-bootstrap";
import {Outlet } from "react-router-dom";
import SessionLeft from "../components/SessionLeft";
import NavigatorBar from "../components/NavigatorBar";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../auth/authSlice";
function Layout(){
    const user = useSelector(selectCurrentUser);
    
    return (
        <Container className="p-0 overflow-x-hidden" fluid>
            <Row >
                <Col xl={3} className='p-0 ' >
                    <SessionLeft appUser={user}/>
                </Col>
                <Col xl={9} className='p-0'>
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