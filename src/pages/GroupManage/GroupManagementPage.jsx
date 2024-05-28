import React, { useEffect, useState } from "react";
import { Button, Col, Container,  Form,  Row, Spinner } from "react-bootstrap";
import { Link, Navigate, useParams } from "react-router-dom";
import axios from "axios";
import APIService from "../../auth/APIService";
import { GeneralSetting } from "./GeneralSetting";
import { ListMember } from "./ListMember";
import { ListGroupManagers } from "./ListGroupManagers";
import SessionLeftGroup from "../../components/SessionLeftGroup";
import { ListGroupReports } from "./ListGroupReports";

export const GroupManagementPage=({appUser})=>{
    const [loading, setLoading]=useState(true);
    const {id} =useParams();
    const [group, setGroup] = useState();
    const [checkMember ,setCheckMember] =useState(false);
    
    useEffect(()=>{
        axios.get(`${APIService.URL_REST_API}/user/${appUser.id}/get-group/${id}`).then((res)=>{
            setGroup(res.data); 
            console.log(res.data);
            if(res.data.member_role==null || res.data.member_role=="MEMBER"){
                setCheckMember(true);
            }
        })
    },[])
    if(checkMember){
        return <Navigate to={"/group/"+id} replace />
    }
    if(!group){
        return <div className="d-flex justify-content-center align-items-center" style={{marginTop: "400px"}}> 
        <Spinner animation="border" />
    </div>;
    }
    return (
            <Row>
                <Col xl={9} className="p-5" style={{height: "350px",position: "relative"}}>
                <Row style={{padding: "80px 10px 100px 10px"}}>
                        <Col xl={4} className="nav flex-column nav-underline me-3 border-end pe-4" id="myTab" role="tablist" aria-orientation="vertical">
                            <h4>Settings</h4>
                            <hr/>
                            <button className="nav-link text-start text-black fs-5 active" id="v-tabs-general-tab" data-bs-toggle="tab" data-bs-target="#v-tabs-general" type="button" role="tab" aria-controls="v-tabs-general" aria-selected="true">General Setting</button>
                            <button className="nav-link text-start text-black fs-5" id="v-tabs-members-tab" data-bs-toggle="tab" data-bs-target="#v-tabs-members" type="button" role="tab" aria-controls="v-tabs-members" aria-selected="false">Manage Members</button>
                            <button className="nav-link text-start text-black fs-5" id="v-tabs-admin-tab" data-bs-toggle="tab" data-bs-target="#v-tabs-admin" type="button" role="tab" aria-controls="v-tabs-admin" aria-selected="false">Manage Administrators</button>
                            <button className="nav-link text-start text-black fs-5" id="v-tabs-report-tab" data-bs-toggle="tab" data-bs-target="#v-tabs-report" type="button" role="tab" aria-controls="v-tabs-report" aria-selected="false">List Reports</button>
                            <Link className="nav-link text-start text-black fs-5" to={"/group/"+id} >Go to Group Page</Link>
                        </Col>
                        <Col className="tab-content " id="myTabContent" >
                            <div className="tab-pane fade show active text-start px-2 " id="v-tabs-general" role="tabpanel" aria-labelledby="v-tabs-general" tabIndex="0">
                                <GeneralSetting group={group}/>
                            </div>
                            <div className="tab-pane fade text-start px-5" id="v-tabs-members" role="tabpanel" aria-labelledby="v-tabs-members" tabIndex="0">
                                <ListMember members={group.group_members.filter(e=> e.role == 'MEMBER')}/>
                            </div>
                            <div className="tab-pane fade text-start px-5" id="v-tabs-admin" role="tabpanel" aria-labelledby="v-tabs-admin" tabIndex="0">
                                <ListGroupManagers managers={group.group_members.filter(e=>e.role!='MEMBER')}/>
                            </div>
                            <div className="tab-pane fade text-start px-5" id="v-tabs-report" role="tabpanel" aria-labelledby="v-tabs-report" tabIndex="0">
                               <ListGroupReports reports={group.reports_of_group}/>
                            </div>
                        </Col>
                    </Row>
                </Col>
                <Col xl={3} >
                    <SessionLeftGroup requirements={group.requirements} />
                </Col>
            </Row>
    );
}