import React from "react";
import { Row,Col,Image, Spinner } from "react-bootstrap";
import { Dot, GlobeAmericas, LockFill } from "react-bootstrap-icons";
import NotificationListGroup from "./NotificationListGroup";
import APIService from "../features/APIService";

function SessionLeftGroup({requirements,handleButton}){
    
    return (<div className="d-flex flex-column h-100 section-left-group">
            <h4>{requirements.length} Notifications</h4>
            <div className="mt-4">
                <NotificationListGroup requirements={requirements} handleButton={handleButton}  />
            </div>        
    </div>);
}
export default SessionLeftGroup;