import React from "react";
import {Col, Row,Card, Form, InputGroup, Button, Image, Spinner, Dropdown } from "react-bootstrap";
import { Ban, Search, ThreeDots, } from "react-bootstrap-icons";
import APIService from "../../features/APIService";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { selectCurrentToken } from "../../auth/authSlice";
import { changedProfile, refresh } from "../../features/userSlice";

function ProfileFriends({appUser,friends,hideFriend,user_id}){
    const token = useSelector(selectCurrentToken);
    const dispatch = useDispatch();
    const handleClick= async (typeClick,friend_id)=>{
        let resp = await APIService.createRequirement(appUser.id, {sender_id: appUser.id, receiver_id: friend_id, type: typeClick },token);
        dispatch(refresh());
    }
    if(hideFriend()){
        return <Row className="mb-5">
                    <Col xl={10} className=" profile-tab">
                        <h3>You have no permission to see this user friends</h3>
                    </Col>
                </Row>
    }
    return (
        <Row className="mb-5">
            <Col xl={10} className=" profile-tab">
                <div className=" w-100 ps-4 pe-2">
                    <Row >
                        <Col xl={6} lg={6} md={5} sm={5}>
                            <h3>Friends</h3>
                        </Col>
                        <Col xl={4} lg={4} md={5} sm={5}>
                            <Form  >
                                <InputGroup >
                                    <InputGroup.Text id="basic-addon2" style={{borderRight: 0, borderTopLeftRadius: "50rem", borderBottomLeftRadius: "50rem",backgroundColor: "#ffffff"}}>
                                        <Search />
                                    </InputGroup.Text>
                                    <Form.Control style={{borderLeft: 0 , borderTopRightRadius: "50rem", borderBottomRightRadius: "50rem"}} 
                                        placeholder="Search Friends"
                                        aria-describedby="basic-addon2"
                                    />
                                </InputGroup>
                            </Form>
                        </Col>
                        <Col >
                            <Button variant="secondary">
                                <ThreeDots/>
                            </Button>
                        </Col>
                    </Row>
                    <hr/>
                    <Row xl={2} lg={2} md={2} sm={1}>
                        {friends?
                            friends.map((friend,index)=>{
                                let urlImage = friend.image!=null?friend.image: (friend.gender =='female'? APIService.URL_REST_API+"/files/user_female.png": APIService.URL_REST_API+"/files/user_male.png");
                                return (<Col key={index}>
                                            <Card className="p-1 mb-2 text-start">
                                                <Row className="g-0" >
                                                    <Col xl={3} md={3} sm={2}>
                                                    <Link to={`/member/profile/${friend.username}`}><Image src={urlImage} fluid rounded /></Link>
                                                    </Col>
                                                    <Col xl={5} md={5} sm={6} className="d-flex flex-column ms-auto justify-content-center align-items-start ps-4">
                                                        <h4>
                                                            <Link to={`/member/profile/${friend.username}`} onClick={()=>{dispatch(changedProfile());}} className="text-decoration-none text-black">{friend.fullname} 
                                                            {
                                                                friend._banned?
                                                                <Ban color="red" className="ms-4"/>    
                                                                :<></>
                                                            }
                                                            </Link>
                                                        </h4>
                                                        <p>Friends: {friend.friend_counter}</p>
                                                    </Col>
                                                    {
                                                        user_id != appUser.id || friend._banned?
                                                        <Col xl={4} md={4} sm={3} className="d-flex flex-row justify-content-start align-items-start pt-2 pe-2">
                                                            
                                                        </Col>
                                                        :
                                                        <Col xl={4} md={4} sm={3} className="d-flex flex-row justify-content-start align-items-start pt-2 pe-2">
                                                            <Dropdown>
                                                                <Dropdown.Toggle variant="outline-secondary" id="dropdown-basic">
                                                                    Options
                                                                </Dropdown.Toggle>

                                                                <Dropdown.Menu>
                                                                    <Dropdown.Item as="button" onClick={()=> { handleClick("UN_FRIEND",friend.id)}}>Unfriend</Dropdown.Item>
                                                                    <Dropdown.Item as="button" onClick={()=> { handleClick("BLOCK",friend.id)}}>Block</Dropdown.Item>
                                                                </Dropdown.Menu>
                                                            </Dropdown>
                                                        </Col>
                                                    }
                                                </Row>
                                            </Card>
                                        </Col>);
                            })
                        :
                        <Col>
                            <Spinner animation="border"></Spinner>
                        </Col>
                        
                        }
                        
                    </Row>
                </div>
            </Col>
        </Row>
    );
}
export default ProfileFriends;