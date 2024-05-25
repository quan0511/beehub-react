import React, { useState } from "react";
import {Button, Card, Col, Form, Image, Row, Tab, Tabs} from "react-bootstrap";
import * as bootstrap from 'bootstrap';
import APIService from "../../auth/APIService";
import { Link } from "react-router-dom";
import { FormSettingProfile } from "../../components/FormSettingProfile";
import { FormSettingPassword } from "../../components/FormSettingPassword";
function ProfileSetting({user}){
    let blockedUser = user.relationships.filter((val)=> val.typeRelationship=="BLOCKED");
    const triggerTabList = document.querySelectorAll('#myTab button')
        triggerTabList.forEach(triggerEl => {
        const tabTrigger = new bootstrap.Tab(triggerEl)

        triggerEl.addEventListener('click', event => {
            event.preventDefault()
            tabTrigger.show()
        })
    })
    return (
        <Row style={{marginTop: "150px", marginBottom: "100px"}} className="bg-white border border-2 rounded-2 py-5">
            <Col xl={10} className="mx-auto" >
                <div className="d-flex align-items-start">
                    <div className="nav flex-column nav-underline me-3 border-end pe-4 flex-fill" id="myTab" role="tablist" aria-orientation="vertical">
                        <h4>Settings</h4>
                        <hr/>
                        <button className="nav-link text-start text-black fs-5 active" id="v-tabs-profile-tab" data-bs-toggle="tab" data-bs-target="#v-tabs-profile" type="button" role="tab" aria-controls="v-tabs-profile" aria-selected="true">Profile</button>
                        <button className="nav-link text-start text-black fs-5" id="v-tabs-password-tab" data-bs-toggle="tab" data-bs-target="#v-tabs-password" type="button" role="tab" aria-controls="v-tabs-password" aria-selected="false">Password Setting</button>
                        <button className="nav-link text-start text-black fs-5" id="v-tabs-account-tab" data-bs-toggle="tab" data-bs-target="#v-tabs-account" type="button" role="tab" aria-controls="v-tabs-account" aria-selected="false">Account Settings</button>
                        <button className="nav-link text-start text-black fs-5" id="v-tabs-blocklist-tab" data-bs-toggle="tab" data-bs-target="#v-tabs-blocklist" type="button" role="tab" aria-controls="v-tabs-blocklist" aria-selected="false">Block List</button>
                    </div>
                    <div className="tab-content " id="myTabContent" style={{width: "800px"}}>
                        <div className="tab-pane fade show active text-start px-5" id="v-tabs-profile" role="tabpanel" aria-labelledby="v-tabs-profile" tabIndex="0">
                            <FormSettingProfile user={user}/>
                        </div>
                        <div className="tab-pane fade text-start px-5" id="v-tabs-password" role="tabpanel" aria-labelledby="v-tabs-password" tabIndex="0">
                            <FormSettingPassword user={user}/>
                        </div>
                        <div className="tab-pane fade text-start px-5" id="v-tabs-account" role="tabpanel" aria-labelledby="v-tabs-account" tabIndex="0">
                            <p>Account Setting</p>
                        </div>
                        <div className="tab-pane fade text-start px-5" id="v-tabs-blocklist" role="tabpanel" aria-labelledby="v-tabs-blocklist" tabIndex="0">
                            <h4>List User Blocked</h4>
                            <hr/>
                            <div className="mt-3 d-flex flex-column">
                                {blockedUser.length>0?
                                    blockedUser.map((block, index)=>{
                                        let image = block.image!=null?block.image:(block.gender=='female'? APIService.URL_REST_API+"/files/user_female.png":APIService.URL_REST_API+"/files/user_male.png");
                                        return (<Card key={index} className="mb-2 p-1">
                                        <Card.Body className="d-flex flex-row justify-content-between align-items-center" >
                                            <div className="d-flex flex-row justify-content-between align-items-center">
                                                <Image src={image}  style={{height: "80px",width: "80px", objectFit: "contain"}} rounded/>
                                                <Card.Title style={{width: "200px", marginLeft: "20px"}} ><Link to={"/"+block.username} style={{textDecoration: "none", color:"black",fontSize: "18px"}}>{block.fullname}</Link></Card.Title>
                                            </div>
                                            <Button variant="outline-danger" style={{width: "150px"}}>Unblock</Button>
                                        </Card.Body>
                                    </Card>);
                                    })
                                :<p className="fs-5">Not Found Blocked</p>
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </Col>
        </Row>
    );
}
export default ProfileSetting;