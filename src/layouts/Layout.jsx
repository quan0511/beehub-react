import React, { useEffect } from "react";
import { Alert, Col, Container, Row, Spinner} from "react-bootstrap";
import {Outlet } from "react-router-dom";
import SessionLeft from "../components/SessionLeft";
import NavigatorBar from "../components/NavigatorBar";
import { useDispatch, useSelector } from "react-redux";
import { selectCurrentUser } from "../auth/authSlice";
import BeehubSpinner from "../components/BeehubSpinner";
import { closeMessageAlert, refresh } from "../features/userSlice";
function Layout(){
    const user = useSelector(selectCurrentUser);
    const showMessage = useSelector((state)=> state.user.showMessage);
    const message = useSelector((state)=> state.user.message);
    const dispatch = useDispatch();
    // const user=null;
    if(user==null){
        return (
        <Container className="p-0 overflow-x-hidden" fluid>
            <Row >
                <Col xl={9} className='p-0 d-flex flex-column justify-content-center align-items-center mx-auto'style={{height: "600px"}}>
                    <div >
                        <BeehubSpinner/>
                    </div>
                </Col>
            </Row>
        </Container>    
        );
    }
    useEffect(()=>{
        if(showMessage){
            setTimeout(()=> {
                dispatch(closeMessageAlert());
            }, 2000);
        }
    }, [showMessage])
    return (
        <Container className="p-0 overflow-x-hidden position-relative" fluid>
            <Alert show={showMessage} variant="success" className="position-fixed" style={{zIndex: 4, top: "80px" , left: "50%"}}  >
                {message??"Update Successful"}
            </Alert>
            <Row >
                <Col xl={3} className='p-0 section-left' style={{marginRight: '-5px'}} >
                    <SessionLeft appUser={user}/>
                </Col>
                <Col xl={9} md={12}  className='p-0 main'>
                    <div className='d-flex flex-column'>
                        <NavigatorBar hideButton={false} />
                        <Outlet />
                    </div>
                </Col>
            </Row>
        </Container>
    );
}
export default Layout;