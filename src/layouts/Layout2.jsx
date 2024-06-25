import React, { useEffect } from "react";
import {  Outlet } from "react-router-dom";
import NavigatorBar from "../components/NavigatorBar";
import Panel from "../components/Panel";
import { useDispatch, useSelector } from "react-redux";
import { Alert } from "react-bootstrap";
import { closeMessageAlert } from "../features/userSlice";
function Layout2(){
    const showMessage = useSelector((state)=> state.user.showMessage);
    const message = useSelector((state)=> state.user.message);
    const dispatch = useDispatch();
    useEffect(()=>{
        if(showMessage){
            setTimeout(()=> {
                dispatch(closeMessageAlert());
            }, 2000);
        }
    }, [showMessage])
    return (
        <div className="d-flex flex-row m-0 overflow-x-hidden position-relative">
            <Alert show={showMessage} variant="success" className="position-fixed" style={{zIndex: 4, top: "80px" , left: "50%"}}  >
                {message??"Update Successful"}
            </Alert>
            <div className="position-relative d-none d-xl-block" style={{zIndex:1}}>
                <div className="" style={{width: "80px",}}>
                    <div style={{zIndex: 0,position: "fixed",top: "0", left: "0"}}>
                        <Panel />
                    </div>
                </div>
            </div>
            <div className='d-flex flex-column position-relative layout2-main' style={{zIndex:0,width:"-webkit-fill-available"}}>
                <NavigatorBar hideButton={true} />
                <Outlet />
            </div>
        </div>
    );
}
export default Layout2;