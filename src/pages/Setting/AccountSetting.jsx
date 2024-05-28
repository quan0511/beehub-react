import React, { useEffect, useState } from "react";
import {Accordion, Button, Card, Col, Container, Form, Image, Row} from "react-bootstrap";
import * as bootstrap from 'bootstrap';
import APIService from "../../auth/APIService";
import { Link } from "react-router-dom";
import { FormSettingProfile } from "./FormSettingProfile";
import { FormSettingPassword } from "./FormSettingPassword";
import axios from "axios";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../../auth/authSlice";
export function AccountSetting(){
    const appUser = useSelector(selectCurrentUser);
    const [ account, setAccount] = useState({});
    const [ blockedUsers, setBlockedUsers] = useState([]);
    const triggerTabList = document.querySelectorAll('#myTab button')
        triggerTabList.forEach(triggerEl => {
        const tabTrigger = new bootstrap.Tab(triggerEl)

        triggerEl.addEventListener('click', event => {
            event.preventDefault()
            tabTrigger.show()
        })
    })
    useEffect(()=>{
        axios.get(`${APIService.URL_REST_API}/profile/${appUser.username}`).then((res)=>{
            setAccount(res.data);
            console.log(res.data);
            if(res.data.relationships!=null){
                let blockedList= res.data.relationships.filter((e,i)=> e.typeRelationship == 'BLOCKED');
                setBlockedUsers(blockedList);
            }
        });
    },[])
    return (
        <Container >
            <Row style={{marginTop: "100px", marginBottom: "100px"}} className="bg-white  py-5">
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
                                <FormSettingProfile user={account}/>
                            </div>
                            <div className="tab-pane fade text-start px-5" id="v-tabs-password" role="tabpanel" aria-labelledby="v-tabs-password" tabIndex="0">
                                <FormSettingPassword user={account}/>
                            </div>
                            <div className="tab-pane fade text-start px-5" id="v-tabs-account" role="tabpanel" aria-labelledby="v-tabs-account" tabIndex="0">
                            <Accordion>
                                <Accordion.Item eventKey="0">
                                    <Accordion.Header>Who can see my posts?</Accordion.Header>
                                    <Accordion.Body>
                                        <Row>
                                            <Col xl={8}>
                                                Setting peple can see all posts in your profile or can see your posts by searching
                                            </Col>
                                            <Col xl={4}>
                                                <Form.Select aria-label="Setting Posts">
                                                    <option>Options</option>
                                                    <option value="PUBLIC">Public all posts</option>
                                                    <option value="FOR_FRIEND">Just For Friends</option>
                                                    <option value="HIDDEN">Private</option>
                                                </Form.Select>
                                            </Col>
                                        </Row>
                                    </Accordion.Body>
                                </Accordion.Item>
                                <Accordion.Item eventKey="1">
                                    <Accordion.Header>Who can see my profile?</Accordion.Header>
                                    <Accordion.Body>
                                        <Row>
                                            <Col xl={8} className="mb-3">
                                                Who can see my phone number?
                                            </Col>
                                            <Col xl={4} className="mb-3">
                                                <Form.Select aria-label="Setting Phone number" defaultValue="PUBLIC">
                                                    <option>Options</option>
                                                    <option value="PUBLIC">Public</option>
                                                    <option value="FOR_FRIEND">Just For Friends</option>
                                                    <option value="HIDDEN">Private</option>
                                                </Form.Select>
                                            </Col>
                                            <Col xl={8} className="mb-3">
                                                Who can see my email?
                                            </Col>
                                            <Col xl={4} className="mb-3">
                                                <Form.Select aria-label="Setting Email" defaultValue="PUBLIC">
                                                    <option>Options</option>
                                                    <option value="PUBLIC">Public</option>
                                                    <option value="FOR_FRIEND">Just For Friends</option>
                                                    <option value="HIDDEN">Private</option>
                                                </Form.Select>
                                            </Col>
                                            <Col xl={8} className="mb-3">
                                                Who can see my gender?
                                            </Col>
                                            <Col xl={4} className="mb-3">
                                                <Form.Select aria-label="Setting Gender" defaultValue="PUBLIC">
                                                    <option>Options</option>
                                                    <option value="PUBLIC">Public</option>
                                                    <option value="FOR_FRIEND">Just For Friends</option>
                                                    <option value="HIDDEN">Private</option>
                                                </Form.Select>
                                            </Col>
                                            <Col xl={8} className="mb-3">
                                                Who can see my list friend?
                                            </Col>
                                            <Col xl={4} className="mb-3">
                                                <Form.Select aria-label="Setting List Friend" defaultValue="PUBLIC">
                                                    <option>Options</option>
                                                    <option value="PUBLIC">Public</option>
                                                    <option value="FOR_FRIEND">Just For Friends</option>
                                                    <option value="HIDDEN">Private</option>
                                                </Form.Select>
                                            </Col>
                                            <Col xl={8} className="mb-3">
                                                Who can see my birthday?
                                            </Col>
                                            <Col xl={4} className="mb-3">
                                                <Form.Select aria-label="Setting Birthday" defaultValue="PUBLIC">
                                                    <option>Options</option>
                                                    <option value="PUBLIC">Public</option>
                                                    <option value="FOR_FRIEND">Just For Friends</option>
                                                    <option value="HIDDEN">Private</option>
                                                </Form.Select>
                                            </Col>
                                        </Row>
                                    </Accordion.Body>
                                </Accordion.Item>
                            </Accordion>
                            </div>
                            <div className="tab-pane fade text-start px-5" id="v-tabs-blocklist" role="tabpanel" aria-labelledby="v-tabs-blocklist" tabIndex="0">
                                <h4>List User Blocked</h4>
                                <hr/>
                                <div className="mt-3 d-flex flex-column">
                                    {blockedUsers.length>0?
                                        blockedUsers.map((block, index)=>{
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
        </Container>
    );
}
