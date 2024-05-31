import React, { useEffect, useState } from "react";
import {Button, Card, Col, Container,  Image, Row, Spinner, Toast, ToastContainer} from "react-bootstrap";
import * as bootstrap from 'bootstrap';
import APIService from "../../features/APIService";
import { Link } from "react-router-dom";
import { FormSettingProfile } from "./FormSettingProfile";
import { FormSettingPassword } from "./FormSettingPassword";
import { useDispatch, useSelector } from "react-redux";
import { selectCurrentToken, selectCurrentUser } from "../../auth/authSlice";
import { useProfileQuery } from "../../user/userApiSlice";
import { SettingItems } from "./SettingItems";
import { refresh } from "../../features/userSlice";
export function AccountSetting(){
    const appUser = useSelector(selectCurrentUser);
    const token = useSelector(selectCurrentToken);
    const dispatch = useDispatch();
    const reset = useSelector((state)=>state.user.reset);
    const {data: account, isLoading} = useProfileQuery({id: appUser.id,username: appUser.username,reset:reset});
    const [ blockedUsers, setBlockedUsers] = useState([]);
    const [ messageToast, setMessageToast] = useState(false);
    const [ messageToastError, setMessageToastError] = useState(false);
    //For bootstrap
    const triggerTabList = document.querySelectorAll('#myTab button')
        triggerTabList.forEach(triggerEl => {
        const tabTrigger = new bootstrap.Tab(triggerEl)

        triggerEl.addEventListener('click', event => {
            event.preventDefault()
            tabTrigger.show()
        })
    })
    const handleClick= async (typeClick,receiver_id)=>{
        let resp = await APIService.createRequirement(appUser.id, {sender_id: appUser.id, receiver_id:receiver_id, type: typeClick },token);
        if(resp.result != 'unsuccess'|| resp.result !="error"){
            dispatch(refresh())
        }
    }
    useEffect(()=>{
        if(!isLoading && account!=null&& account.relationships!=null){
            let blockedList= account.relationships.filter((e,i)=> e.typeRelationship == 'BLOCKED');
            setBlockedUsers(blockedList);
        }
    },[])
    return (
        <Container >
            <Row  className="bg-white">
                <Col xl={12} className="position-relative" style={{height: "90px", marginTop:"50px"}}>
                    <ToastContainer
                        className="p-3"
                        position="top-center"
                        style={{ zIndex: 1 }}
                    >
                        <Toast variant="success" onClose={() => setMessageToast(false)} show={messageToast} delay={2000} autohide>
                            <Toast.Header>
                                <img src="https://mythemestore.com/beehive-preview/wp-content/themes/beehive/assets/images/logo-icon.svg" height={20} className="rounded me-2" alt="" />
                                <strong className="me-auto">Beehub notification</strong>
                            </Toast.Header>
                            <Toast.Body className="text-start h5">Update successfully
                            
                            </Toast.Body>
                        </Toast>
                    </ToastContainer>
                    <ToastContainer
                        className="p-3"
                        position="top-center"
                        style={{ zIndex: 1 }}
                    >
                        <Toast onClose={() => setMessageToastError(false)} show={messageToastError} delay={2000} autohide>
                            <Toast.Header>
                                <img src="https://mythemestore.com/beehive-preview/wp-content/themes/beehive/assets/images/logo-icon.svg" height={20} className="rounded me-2" alt="" />
                                <strong className="me-auto">Beehub notification</strong>
                            </Toast.Header>
                            <Toast.Body className="text-start h5">Setting failure. Let try again.
                            </Toast.Body>
                        </Toast>
                    </ToastContainer>
                </Col>
                <Col xl={10} className="mx-auto mt-3"style={{marginBottom: "100px"}} >
                    <div className="d-flex align-items-start">
                        <div className="nav flex-column nav-underline me-3 border-end pe-4 flex-fill" id="myTab" role="tablist" aria-orientation="vertical">
                            <h4>Settings</h4>
                            <hr/>
                            <button className="nav-link text-start text-black fs-5 active" id="v-tabs-profile-tab" data-bs-toggle="tab" data-bs-target="#v-tabs-profile" type="button" role="tab" aria-controls="v-tabs-profile" aria-selected="true">Profile</button>
                            <button className="nav-link text-start text-black fs-5" id="v-tabs-password-tab" data-bs-toggle="tab" data-bs-target="#v-tabs-password" type="button" role="tab" aria-controls="v-tabs-password" aria-selected="false">Password Setting</button>
                            <button className="nav-link text-start text-black fs-5" id="v-tabs-account-tab" data-bs-toggle="tab" data-bs-target="#v-tabs-account" type="button" role="tab" aria-controls="v-tabs-account" aria-selected="false">Account Settings</button>
                            <button className="nav-link text-start text-black fs-5" id="v-tabs-blocklist-tab" data-bs-toggle="tab" data-bs-target="#v-tabs-blocklist" type="button" role="tab" aria-controls="v-tabs-blocklist" aria-selected="false">Block List</button>
                        </div>
                        {isLoading ? 
                             <div className="tab-content " id="myTabContent" style={{width: "800px"}}>
                            <Spinner animation="border" /></div>
                        :
                        <div className="tab-content " id="myTabContent" style={{width: "800px"}}>
                            <div className="tab-pane fade show active text-start px-5" id="v-tabs-profile" role="tabpanel" aria-labelledby="v-tabs-profile" tabIndex="0">
                                <FormSettingProfile user={account} setMessageToast={setMessageToast} setMessageToastError={setMessageToastError} />
                            </div>
                            <div className="tab-pane fade text-start px-5" id="v-tabs-password" role="tabpanel" aria-labelledby="v-tabs-password" tabIndex="0">
                                <FormSettingPassword user={account} setMessageToast={setMessageToast} setMessageToastError={setMessageToastError} />
                            </div>
                            <div className="tab-pane fade text-start px-5" id="v-tabs-account" role="tabpanel" aria-labelledby="v-tabs-account" tabIndex="0">
                                <SettingItems settings={account!=null?account.user_settings:[]}  setMessageToast={setMessageToast} setMessageToastError={setMessageToastError} />
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
                                                    <Card.Title style={{width: "200px", marginLeft: "20px"}} ><p style={{fontSize: "18px"}}>{block.fullname}</p></Card.Title>
                                                </div>
                                                <Button variant="outline-danger" style={{width: "150px"}} onClick={()=> handleClick("UN_BLOCK",block.id)} >Unblock</Button>
                                            </Card.Body>
                                        </Card>);
                                        })
                                    :<p className="fs-5">Not Found Blocked</p>
                                    }
                                </div>
                            </div>
                        </div>
                        }
                    </div>
                </Col>
            </Row>
        </Container>
    );
}
