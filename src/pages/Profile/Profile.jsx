import React, { useState } from "react";
import { Button, Col, Container, Form, Image, ListGroup, Nav, Row } from "react-bootstrap";
import { CardImage, ChatDots, ColumnsGap, GearFill, People, PersonVcard, Sliders2, ThreeDotsVertical } from "react-bootstrap-icons";

import NavigatorBar from "../../components/NavigatorBar";
import Panel from "../../components/Panel";

import ProfileAbout from "./ProfileAbout";
import ProfilePost from "./ProfilePost";
import ProfileFriends from "./ProfileFriends";
import ProfileForum from "./ProfileForum";
import ProfilePhotos from "./ProfilePhotos";
import ProfileSetting from "./ProfileSetting";


function Profile (){
    const [tab, setTab] = useState('posts');
    const handelSelectTab = (selectKey)=>{
        console.log(selectKey);
        setTab(selectKey);
    }
    const tabSession = ()=>{
        switch(tab){
            case "posts": 
                return <ProfilePost/>;
            case "friends":
                return <ProfileFriends/>;
            case "forums":
                return <ProfileForum/>; 
            case "about":
                return <ProfileAbout />;
            case "photos":
                return <ProfilePhotos/>;
            case "setting":
                return <ProfileSetting />;
            default:
                return  <ProfilePost/>;
        }
    }
    return (
        <div className="d-flex flex-row m-0 ">
            <Panel />
            <div className='d-flex flex-column '>
                <NavigatorBar/>
                <Container style={{marginTop: "50px",width: "100vw",}}>
                    <div >
                        <Row className="p-0" style={{height: "350px",position: "relative"}}>
                            <Image src="\assets\images\library\arknights-bg9.png" className="object-fit-cover" style={{height: "inherit",objectPosition: "center",width: "100%"}}/>
                            <div className="position-absolute"style={{top: "250px",left: "1rem",width: "90%"}} >
                                <div className="d-flex flex-column ps-5 bg-white rounded-3 shadow p-2">

                                    <Image src="\assets\images\user\meme-6.jpg"  className="object-fit-cover border-0 rounded position-absolute" style={{width: "220px", height: "220px",top:"-100px"}} />
                                    <div style={{marginLeft: "240px", textAlign: "start",marginBottom: "50px"}}>
                                        <h2>Cat Tuong</h2>
                                        <span className="d-block text-black-50">@Coffee</span>
                                    </div>
                                    <Container >
                                        <Row>
                                            <Col xl={2} >
                                                <ListGroup horizontal>
                                                    <ListGroup.Item className="w-50 border-0">
                                                        <p className="text-center">7<span className="d-block text-black-50">Friends</span></p>
                                                        
                                                    </ListGroup.Item>
                                                    <ListGroup.Item className="w-50 border-0">
                                                        <p className="text-center">22<span  className="d-block text-black-50">Groups</span></p>
                                                        
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
                                                    <Nav.Item  action accessKey="about">
                                                        <Nav.Link eventKey="forums"  style={{width: "80px"}}  className="d-flex flex-column align-items-center justify-content-between p-2 text-dark" >
                                                            <ChatDots size={20}/>
                                                            <span>Forums</span>
                                                        </Nav.Link>
                                                    </Nav.Item>
                                                    <Nav.Item >
                                                        <Nav.Link eventKey="setting" style={{width: "80px"}}  className="d-flex flex-column align-items-center justify-content-between p-2 text-dark">
                                                            <GearFill size={20}/>
                                                            <span>Setting</span>
                                                        </Nav.Link>
                                                    </Nav.Item>
                                                </Nav>
                                                {/* <ListGroup horizontal="md" className="my-2 flex-wrap justify-content-start align-items-center" defaultActiveKey="posts" onSelect={handelSelectTab}>
                                                    <ListGroup.Item style={{width: "72px"}} className="border-0 profile-active d-flex flex-column align-items-center justify-content-between text-light p-2" action accessKey="posts">
                                                        <ColumnsGap size={20}/>
                                                        <span>Posts</span>
                                                        
                                                    </ListGroup.Item>
                                                    <ListGroup.Item style={{width: "72px"}}  className="border-0 border-0 d-flex flex-column align-items-center justify-content-between p-2" action accessKey="about">
                                                        <PersonVcard size={20}/>
                                                        <span>About</span>    
                                                    </ListGroup.Item>
                                                    <ListGroup.Item style={{width: "72px"}}  className="border-0 border-0 d-flex flex-column align-items-center justify-content-between p-2" action href="profile/friends">
                                                        <People size={20}/>
                                                        <span>Friends</span>
                                                    </ListGroup.Item>
                                                    <ListGroup.Item style={{width: "72px"}}  className="border-0 border-0 d-flex flex-column align-items-center justify-content-between p-2" action href="profile/photo">
                                                        <CardImage size={20}/>
                                                        <span>Photos</span>
                                                    </ListGroup.Item>
                                                    <ListGroup.Item style={{width: "72px"}}  className="border-0 border-0 d-flex flex-column align-items-center justify-content-between p-2" action href="profile/forum">
                                                        <ChatDots size={20}/>
                                                        <span>Forums</span>
                                                    </ListGroup.Item>
                                                    <ListGroup.Item style={{width: "72px"}}  className="border-0 border-0 d-flex flex-column align-items-center justify-content-between p-2" action href="profile/setting">
                                                        <GearFill size={20}/>
                                                        <span>Setting</span>
                                                    </ListGroup.Item>
                                                </ListGroup>     */}
                                            </Col>
                                        </Row>
                                    </Container>
                                </div>
                            </div>
                        </Row>
                        {tabSession()}
                    </div>
                </Container>
            </div>
            
        </div>
    );
}
export default Profile;