import React from "react";
import { Row,Col,Image, Spinner } from "react-bootstrap";
import { Dot, GlobeAmericas, LockFill } from "react-bootstrap-icons";
import NotificationListGroup from "./NotificationListGroup";
import APIService from "../features/APIService";

function SessionLeftGroup({requirements}){
    
    return (<div className="d-flex flex-column h-100 "style={{padding: "80px 2px 100px 10px"}}>
            <h4>{requirements.length} Notifications</h4>
            <div className="mt-4">
                <NotificationListGroup requirements={requirements}  />
            </div>        
    </div>);
}
export default SessionLeftGroup;