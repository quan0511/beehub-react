import React from "react";
import { Row,Col,Image } from "react-bootstrap";
import { Dot, GlobeAmericas } from "react-bootstrap-icons";
import NotificationListGroup from "./NotificationListGroup";
function SessionLeftGroup(){
    return (<div className="d-flex flex-column h-100 " style={{backgroundColor: "#383a45",backgroundImage:"linear-gradient(135deg, #4f5261 0%, #383a45 50%)", position: "fixed", top:"0px",paddingTop: "80px",width:"inherit"}}>
        <Row  style={{width:"400px"}}>
            <Col xl={3} className="ms-4 pe-0">
                <Image src="\assets\images\groups\meme_9.png" style={{height:"60px"}} rounded fluid/>
            </Col>
            <Col xl={7} className="text-light text-start ps-0">
                <h3 style={{fontSize: "1.3rem"}}>Arknights Global</h3>
                <p style={{fontSize: "13px"}}>
                    <GlobeAmericas /> Public group 
                    <Dot/> 122K memmbers
                </p>
            </Col>
            <Col xl={12} className="text-start ms-4 mt-3">
                <p className="text-white-50 fs-5" >Notifications</p>
                <div className="">
                    <NotificationListGroup/>
                </div>
            </Col>
        </Row>        
    </div>);
}
export default SessionLeftGroup;