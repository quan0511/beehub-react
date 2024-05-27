import React from "react";
import { Col, Container, Row} from "react-bootstrap";
import { Outlet } from "react-router-dom";
import SessionLeft from "../components/SessionLeft";
import NavigatorBar from "../components/NavigatorBar";
function Layout({appUser}){
    return (
        <Container className="p-0" fluid>
            <Row>
                <Col xl={3} className='p-0 ' >
                    <SessionLeft user={appUser}/>
                </Col>
                <Col xl={9} className='p-0'>
                    <div className='d-flex flex-column'>
                        <NavigatorBar user={appUser}/>
                        <Outlet />
                    </div>
                </Col>
            </Row>
        </Container>
    );
}
export default Layout;