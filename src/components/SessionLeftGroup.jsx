import React, { useEffect, useState } from "react";
import { Row,Col,Image, Spinner } from "react-bootstrap";
import { Dot, GlobeAmericas, LockFill } from "react-bootstrap-icons";
import NotificationListGroup from "./NotificationListGroup";
import APIService from "../auth/APIService";
import axios from "axios";
import { useParams } from "react-router-dom";
function SessionLeftGroup({appUser}){
    const [group, setGroup]= useState({});
    const [loading, setLoading] =useState(true);
    const {id} = useParams(); 
    useEffect(()=>{
        if(!loading) setLoading(true);
        axios.get(`${APIService.URL_REST_API}/user/${appUser.id}/get-group/${id}`).then((res)=>{
            setGroup(res.data);
        }).finally(()=>{
            setLoading(false);
        })
    },[])
    if(loading){
        <div className="d-flex justify-content-center align-items-center" style={{marginTop: "400px"}}> 
            <Spinner animation="border" />
        </div>
    }
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