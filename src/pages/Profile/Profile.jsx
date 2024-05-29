import React, { useEffect, useState } from "react";
import { Button, Col, Container, Form, Image, ListGroup, Nav, Row, Spinner } from "react-bootstrap";
import { CardImage, ColumnsGap, GearFill, People, PersonVcard, PlusCircle,} from "react-bootstrap-icons";


import ProfileAbout from "./ProfileAbout";
import ProfilePost from "./ProfilePost";
import ProfileFriends from "./ProfileFriends";
import ProfilePhotos from "./ProfilePhotos";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import APIService from "../../features/APIService";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../../auth/authSlice";
import { useProfileQuery } from "../../user/userApiSlice";

function Profile (){
    const appUser = useSelector(selectCurrentUser);
    const { username } = useParams();
    const {data: user, isLoading, isSuccess} = useProfileQuery({id: appUser.id,username: username});
    const [tab, setTab] = useState('posts');
    const handelSelectTab = (selectKey)=>{
        setTab(selectKey);
    }
    const tabSession = ()=>{
        switch(tab){
            case "posts": 
                return <ProfilePost user={user}/>;
            case "friends":
                let listsfriend =  user.relationships.filter((e)=> e.typeRelationship != "BLOCKED");
                return <ProfileFriends friends={listsfriend} />;
            case "about":
                return <ProfileAbout user={user} />;
            case "photos":
                return <ProfilePhotos galleries={user.galleries}/>;
            case "setting":
                return <ProfileSetting user={user} />;
            default:
                return  <ProfilePost  user={user}/>;
        }
    }
    const getButton = ()=>{
        if(user!=null){
            switch(user.relationship_with_user){
                case "BLOCKED":
                   return <Button variant="danger">Unblock</Button>
                case "FRIEND": 
                    return <Button variant="outline-danger" >Unfriend</Button>
                case "SENT_REQUEST":
                    return <Button variant="outline-warning">Cancel Request</Button>
                case "NOT_ACCEPT":
                    return <Button variant="primary">Accept</Button>
                default:
                    return <Button variant="outline-primary">Add Friend</Button>
            }
        }
    }

    if(isLoading || !isSuccess){
        return (
            <Container style={{marginTop: "150px"}}>
                <Row>
                    <Col xl={2} className="mx-auto pt-5">
                    <Spinner animation="border"  role="status">
                        <span className="visually-hidden">Loading...</span>
                    </Spinner>
                    </Col>
                </Row>
            </Container>
        );
    }
    
    return (
            <Container style={{marginTop: "50px"}}>
                <Row className="p-0" style={{position: "relative"}}>
                    {
                        user.background!=null?
                        <Image src={`${APIService.URL_REST_API}/files/`+user.background} className="object-fit-cover" style={{height: "350px",objectPosition: "center",width: "100%"}}/>
                        :
                        <div className="d-flex justify-content-center align-items-center bg-secondary" style={{height: "350px"}}>
                            <Button variant="link">
                                <PlusCircle size={30} color="black" />
                            </Button>
                        </div>
                    }
                    <div className="position-absolute"style={{top: "250px",left: "1rem",width: "90%"}} >
                        <div className="d-flex flex-column ps-5 bg-white rounded-3 shadow p-2">
                            {
                                user.image!=null?
                                <Image src={`${APIService.URL_REST_API}/files/`+user.image}  className="object-fit-cover border-0 rounded position-absolute" style={{width: "220px", height: "220px",top:"-100px"}} />
                                :
                                (user.gender=='female'?
                                <Image src={`${APIService.URL_REST_API}/files/user_female.png`}  className="object-fit-cover border-0 rounded position-absolute" style={{width: "220px", height: "220px",top:"-100px"}} />
                                :
                                <Image src={`${APIService.URL_REST_API}/files/user_male.png`}  className="object-fit-cover border-0 rounded position-absolute" style={{width: "220px", height: "220px",top:"-100px"}} />
                                )
                            }
                            <div className="d-flex flex-row justify-content-between align-items-center pe-5" style={{marginLeft: "240px",marginBottom: "50px"}}>
                                <div >
                                    <h2>{user.fullname}</h2>
                                    <span className="d-block text-black-50">@{user.username}</span>
                                </div>
                                <div>
                                    {getButton()}
                                </div>
                            </div>
                            <Container >
                                <Row>
                                    <Col xl={2} className="d-flex justify-content-center align-items-center ms-3">
                                        <ListGroup horizontal>
                                            <ListGroup.Item className="w-50 border-0">
                                                <p className="text-center fs-5"><span className="fw-bold">{user.relationships.filter(e=>e.typeRelationship=='FRIEND').length}</span><span className="d-block text-black-50">Friends</span></p>
                                                
                                            </ListGroup.Item>
                                            <ListGroup.Item className="w-50 border-0">
                                                <p className="text-center fs-5"><span className="fw-bold">{user.group_joined.length}</span><span  className="d-block text-black-50">Groups</span></p>
                                                
                                            </ListGroup.Item>
                                        </ListGroup>
                                    </Col>
                                    <Col xl={8} className="mx-auto" >
                                        <Nav horizontal="md"  variant="tabs" defaultActiveKey="posts" className="my-2 flex-wrap justify-content-start align-items-center" onSelect={handelSelectTab}>
                                            <Nav.Item>
                                                <Nav.Link eventKey="posts"  style={{width: "80px"}} className="profile-active d-flex flex-column align-items-center justify-content-between text-light p-2 text-dark">
                                                    <ColumnsGap size={20}/>
                                                    <span>Posts</span>
                                                </Nav.Link>
                                            </Nav.Item>
                                            <Nav.Item  >
                                                <Nav.Link eventKey="about"  style={{width: "80px"}}  className="d-flex flex-column align-items-center justify-content-between p-2 text-dark">
                                                    <PersonVcard size={20}/>
                                                    <span>About</span>
                                                </Nav.Link>
                                            </Nav.Item>
                                            <Nav.Item>
                                                <Nav.Link eventKey="friends"  style={{width: "80px"}}  className="d-flex flex-column align-items-center justify-content-between p-2 text-dark">
                                                    <People size={20}/>
                                                    <span>Friends</span>
                                                </Nav.Link>
                                            </Nav.Item>
                                            <Nav.Item   >
                                                <Nav.Link eventKey="photos" style={{width: "80px"}}  className="d-flex flex-column align-items-center justify-content-between p-2 text-dark">
                                                    <CardImage size={20}/>
                                                    <span>Photos</span>
                                                </Nav.Link>
                                            </Nav.Item>
                                            {appUser.username!=username?
                                            <></>
                                            :
                                            <Nav.Item >
                                                <Link to="/member/account-setting" style={{width: "80px", textDecoration: "none"}}  className="d-flex flex-column align-items-center justify-content-between p-2 text-dark">
                                                    <GearFill size={20}/>
                                                    <span>Setting</span>
                                                </Link>
                                            </Nav.Item>
                                            }
                                        </Nav>
                                    </Col>
                                </Row>
                            </Container>
                        </div>
                    </div>
                </Row>
                {tabSession()}
            </Container>
    );
}
export default Profile;