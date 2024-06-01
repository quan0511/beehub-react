import React, { useEffect, useState } from "react";
import {  Col, Container, Form, Row, Spinner } from "react-bootstrap";
import { Link, Navigate, useParams } from "react-router-dom";
import APIService from "../../features/APIService";
import { GeneralSetting } from "./GeneralSetting";
import { ListMember } from "./ListMember";
import { ListGroupManagers } from "./ListGroupManagers";
import SessionLeftGroup from "../../components/SessionLeftGroup";
import { ListGroupReports } from "./ListGroupReports";
import { useDispatch, useSelector } from "react-redux";
import { selectCurrentToken, selectCurrentUser } from "../../auth/authSlice";
import { useGroupInfoQuery } from "../../features/userApiSlice";
import BeehubSpinner from "../../components/BeehubSpinner";
import { refresh } from "../../features/userSlice";

export const GroupManagementPage=()=>{
    const appUser = useSelector(selectCurrentUser);
    const token = useSelector(selectCurrentToken);
    const {id} =useParams();
    const dispatch = useDispatch();
    const reset = useSelector((state)=>state.user.reset);
    const {data: group} =useGroupInfoQuery({id_user: appUser.id, id_group: id,reset: reset});
    const [checkMember ,setCheckMember] =useState(false);
    const handleButton= async(typeClick,user_id)=>{
        let resp = await APIService.createRequirement(appUser.id, {receiver_id: user_id, group_id: group.id, type: typeClick },token);
        if(resp.result!='unsuccess'||resp.result != 'error'){
            dispatch(refresh())
        }
    }
    useEffect(()=>{
        if(group !=null&& (group.member_role==null || group.member_role=="MEMBER")){
            setCheckMember(true);
        }
    },[])
    if(checkMember){
        this.context.router.goBack()
    }
    if(!group){
        return <div className="d-flex justify-content-center align-items-center" style={{marginTop: "400px"}}> 
        {BeehubSpinner()}
    </div>;
    }
    return (
        <Container>
            <Row className="group-manage-page">
                <Col xl={3} lg={12} md={12} sm={12} xs={12} >
                    <SessionLeftGroup requirements={group.requirements} handleButton={handleButton}/>
                </Col>
                <Col xl={9} lg={12} md={12} sm={12} xs={12} className="position-relative mt-sm-5 ps-sm-4 mt-md-4 mt-lg-4 ms-lg-4 mx-xl-auto text-center ms-md-3"style={{marginBottom: "100px"}}>
                    <Row>
                        <h3>Settings</h3>
                        <Col xl={4} lg={4} md={4} sm={12} className="nav flex-lg-column flex-xl-column flex-md-column flex-sm-row nav-underline border-end pe-4" id="myTab" role="tablist" aria-orientation="vertical">
                            <hr/>
                            <button className="nav-link text-start text-black fs-5 active" id="v-tabs-general-tab" data-bs-toggle="tab" data-bs-target="#v-tabs-general" type="button" role="tab" aria-controls="v-tabs-general" aria-selected="true">General Setting</button>
                            <button className="nav-link text-start text-black fs-5" id="v-tabs-members-tab" data-bs-toggle="tab" data-bs-target="#v-tabs-members" type="button" role="tab" aria-controls="v-tabs-members" aria-selected="false">Manage Members</button>
                            <button className="nav-link text-start text-black fs-5" id="v-tabs-admin-tab" data-bs-toggle="tab" data-bs-target="#v-tabs-admin" type="button" role="tab" aria-controls="v-tabs-admin" aria-selected="false">Manage Administrators</button>
                            <button className="nav-link text-start text-black fs-5" id="v-tabs-report-tab" data-bs-toggle="tab" data-bs-target="#v-tabs-report" type="button" role="tab" aria-controls="v-tabs-report" aria-selected="false">List Reports</button>
                            {
                                group.member_role=="GROUP_CREATOR"?
                                <button className="nav-link text-start text-black fs-5" id="v-tabs-sercurity-tab" data-bs-toggle="tab" data-bs-target="#v-tabs-sercurity" type="button" role="tab" aria-controls="v-tabs-sercurity" aria-selected="false">Sercurity</button>
                                :<></>
                            }
                            <Link className="nav-link text-start text-black fs-5" to={"/group/"+id} >Go to Group Page</Link>
                        </Col>
                        <Col xl={8} lg={8} md={8} sm={12} className="tab-content " >
                            <div className="tab-pane fade show active text-start px-2 " id="v-tabs-general" role="tabpanel" aria-labelledby="v-tabs-general" tabIndex="0">
                                <GeneralSetting user_id={appUser.id} group={group}  />
                            </div>
                            <div className="tab-pane fade text-start px-5" id="v-tabs-members" role="tabpanel" aria-labelledby="v-tabs-members" tabIndex="0">
                                <ListMember handleButton={handleButton} members={group.group_members.filter(e=> e.role == 'MEMBER')} user_id={appUser.id}/>
                            </div>
                            <div className="tab-pane fade text-start px-5" id="v-tabs-admin" role="tabpanel" aria-labelledby="v-tabs-admin" tabIndex="0">
                                <ListGroupManagers handleButton={handleButton}  managers={group.group_members.filter(e=>e.role!='MEMBER')} user_id={appUser.id}/>
                            </div>
                            <div className="tab-pane fade text-start px-5" id="v-tabs-report" role="tabpanel" aria-labelledby="v-tabs-report" tabIndex="0">
                               <ListGroupReports user_id={appUser.id} group_id={group.id} reports={group.reports_of_group}  />
                            </div>
                            {
                                group.member_role=="GROUP_CREATOR"?
                                <div className="tab-pane fade text-start px-5" id="v-tabs-sercurity" role="tabpanel" aria-labelledby="v-tabs-sercurity" tabIndex="0">
                                        <h3>Sercurity groups</h3>
                                    <div className="d-flex flex-lg-column flex-md-column">
                                        <hr/>
                                        <Row xl={2} lg={2} md={2} sm={2}>
                                            <Col className="mb-3">
                                                <p>Setting Public / Private for group</p>
                                            </Col>
                                            <Col className="mb-3">
                                                <Form.Select onChange={()=>{handleButton("TOGGLE_PUBLIC_GROUP",appUser.id)}} >
                                                    <option value="true">Public</option>
                                                    <option value="false">Private</option>
                                                </Form.Select>
                                            </Col>
                                            <Col className="mb-3">
                                                <p>Setting Deactive / Active for group</p>
                                            </Col>
                                            <Col className="mb-3">
                                                <Form.Select onChange={()=>{handleButton("TOGGLE_ACTIVE_GROUP",appUser.id)}} >
                                                    <option value="true">Active</option>
                                                    <option value="false">Deactive</option>
                                                </Form.Select>
                                            </Col>
                                        </Row>
                                    </div>
                                </div>
                                :<></>
                            }
                        </Col>
                    </Row>
                </Col>
                
            </Row>
        </Container>
    );
}