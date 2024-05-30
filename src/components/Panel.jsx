import React, { useEffect } from "react";
import { Image, ListGroup } from "react-bootstrap";
import {Cart3, GearFill, JournalBookmark, People, Person, PersonCircle, Play } from "react-bootstrap-icons";
import { Link, Navigate, useLocation } from "react-router-dom";
import Tooltip from 'react-bootstrap/Tooltip'; 
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../auth/authSlice";

function Panel(){
    const userApp = useSelector(selectCurrentUser);
    let location = useLocation();
    if(userApp==null){
        return <Navigate to="/login" state={{ from: location }} replace/>
    }
    return (
        <div className="d-flex flex-column top-0 left-0 shadow " style={{width: "80px",height:"auto"}}>
            <div className="bg-dark" style={{height: "80px",padding: "1rem"}}>
                <Link to="/">
                    <Image src="https://mythemestore.com/beehive-preview/wp-content/themes/beehive/assets/images/logo-icon.svg" fluid width="100%" />
                </Link>
            </div>
            <div className="bg-light position-sticky" style={{padding: "1rem",top:0}}>
            <ListGroup horizontal="md" className="my-2 flex-wrap justify-content-center active">
                    <ListGroup.Item  className="border-0 py-3">
                    <OverlayTrigger delay={{ hide: 350, show: 300 }} 
                        overlay={(props) => ( 
                            <Tooltip {...props}> 
                               Profile 
                            </Tooltip> 
                        )} 
                        placement="right"
                    >
                        <Link to={"/member/profile/"+userApp.username} ><PersonCircle size={20}/></Link>
                        </OverlayTrigger> 
                    </ListGroup.Item>
                    <ListGroup.Item className="border-0 pb-3">
                    <OverlayTrigger delay={{ hide: 350, show: 300 }} 
                        overlay={(props) => ( 
                            <Tooltip {...props}> 
                               Activity 
                            </Tooltip> 
                        )} 
                        placement="right"
                    >
                        <Link to="/" ><JournalBookmark size={20}/></Link>
                    </OverlayTrigger>

                    </ListGroup.Item>
                    
                    <ListGroup.Item  className="border-0 py-3">
                    <OverlayTrigger delay={{ hide: 350, show: 300 }} 
                        overlay={(props) => ( 
                            <Tooltip {...props}> 
                               People 
                            </Tooltip> 
                        )} 
                        placement="right"
                    >
                        <Link to={"/people"} ><Person size={20}/></Link>
                    </OverlayTrigger>
                    </ListGroup.Item>
                    <ListGroup.Item  className="border-0 py-3">
                    <OverlayTrigger delay={{ hide: 350, show: 300 }} 
                        overlay={(props) => ( 
                            <Tooltip {...props}> 
                               Groups 
                            </Tooltip> 
                        )} 
                        placement="right"
                    >
                        <Link to="/listgroup" ><People size={20}/></Link>
                    </OverlayTrigger>
                    </ListGroup.Item>
                    
                    <ListGroup.Item  className="border-0 py-3">
                    <OverlayTrigger delay={{ hide: 350, show: 300 }} 
                        overlay={(props) => ( 
                            <Tooltip {...props}> 
                               Shop 
                            </Tooltip> 
                        )} 
                        placement="right"
                    >
                        <a href="" ><Cart3 size={20}/></a>
                    </OverlayTrigger>
                    </ListGroup.Item>
                    <ListGroup.Item  className="border-0 py-3">
                    <OverlayTrigger delay={{ hide: 350, show: 300 }} 
                        overlay={(props) => ( 
                            <Tooltip {...props}> 
                               Setting 
                            </Tooltip> 
                        )} 
                        placement="right"
                    >
                        <Link to="/member/account-setting" ><GearFill size={20}/></Link>
                    </OverlayTrigger>
                    </ListGroup.Item>
                    {/* 
                    <ListGroup.Item  className="border-0 py-3">
                    <OverlayTrigger delay={{ hide: 350, show: 300 }} 
                        overlay={(props) => ( 
                            <Tooltip {...props}> 
                               Blog 
                            </Tooltip> 
                        )} 
                        placement="right"
                    >
                        <a href="" ><Newspaper size={20}/></a>
                    </OverlayTrigger>
                    </ListGroup.Item> */}
                </ListGroup>
            </div>
        </div>
    );
}
export default Panel;