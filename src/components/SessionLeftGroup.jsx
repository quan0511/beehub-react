import React from "react";
import { Row,Col,Image } from "react-bootstrap";
import { Dot, GlobeAmericas, LockFill } from "react-bootstrap-icons";
import NotificationListGroup from "./NotificationListGroup";
import APIService from "../auth/APIService";
function SessionLeftGroup({group}){
    return (<div className="d-flex flex-column h-100 " style={{backgroundColor: "#383a45",backgroundImage:"linear-gradient(135deg, #4f5261 0%, #383a45 50%)", position: "fixed", top:"0px",paddingTop: "80px",width:"inherit"}}>
        <Row >
            <Col xl={3} className="ms-auto ps-2">
                {group.image_group!=null?
                <Image src={group.image_group} style={{height:"40px"}} rounded fluid/>
                :<Image src={APIService.URL_REST_API+"/files/group_image.png"} style={{height:"40px"}} rounded fluid/>
                }
            </Col>
            <Col xl={8} className="text-light text-start">
                <h3 style={{fontSize: "1.3rem"}}>{group.groupname}</h3>
                    <p style={{fontSize:"13px"}}> {
                            group.public_group?
                            <span><GlobeAmericas /> Public group</span>                            
                            :<span><LockFill/> Private group</span>
                        } <br/><Dot/>{group.member_count} members</p>
                    
            </Col>
            {
                group.member_role == 'GROUP_CREATOR' || group.member_role == 'GROUP_MANAGER'?
                <Col xl={12} className="text-start ms-4 mt-3">
                    <p className="text-white-50 fs-5" >Notifications</p>
                    <div className="">
                        <NotificationListGroup requirements={group.requirements} reports={group.reports_of_group} />
                    </div>
                </Col>
                :<></>
            }
        </Row>        
    </div>);
}
export default SessionLeftGroup;