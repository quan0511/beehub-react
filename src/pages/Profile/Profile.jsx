import React, { useEffect, useState } from "react";
import { Button, Col, Container, Form, Image, ListGroup, Nav, Row, Spinner } from "react-bootstrap";
import { CardImage, ColumnsGap, GearFill, People, PersonVcard, PlusCircle,} from "react-bootstrap-icons";

import NavigatorBar from "../../components/NavigatorBar";
import Panel from "../../components/Panel";

import ProfileAbout from "./ProfileAbout";
import ProfilePost from "./ProfilePost";
import ProfileFriends from "./ProfileFriends";
import ProfilePhotos from "./ProfilePhotos";
import ProfileSetting from "./ProfileSetting";
import { useParams } from "react-router-dom";
import axios from "axios";
import APIService from "../../auth/APIService";

function Profile (){
    const [user, setUser] = useState();
    const [loading, setLoading] = useState(true);
    const [tab, setTab] = useState('posts');
    const { id } = useParams();
    const handelSelectTab = (selectKey)=>{
        console.log(selectKey);
        setTab(selectKey);
    }
    const tabSession = ()=>{
        switch(tab){
            case "posts": 
                return <ProfilePost user={user}/>;
            case "friends":
                return <ProfileFriends user={user} />;
            case "about":
                return <ProfileAbout biography={user.bio} />;
            case "photos":
                return <ProfilePhotos user={user}/>;
            case "setting":
                return <ProfileSetting user={user} />;
            default:
                return  <ProfilePost  user={user}/>;
        }
    }
    useEffect(() => {
        if(id!=null){
            axios.get(`${APIService.URL_REST_API}/profile/${id}`).then((res)=>{
                setUser(res.data);
                console.log(res.data);
            }).finally(()=>{
                setTimeout(() => {
                    setLoading(false);
                }, 1500);
                window.scrollTo({top:0,behavior: "smooth"});
            });
        }
     }, [id]);
    
    
    return (
        <div className="d-flex flex-row m-0 ">
            <Panel />
            {
                loading?
                <div className='d-flex flex-column w-100 justify-content-center align-items-center'>
                    <Spinner animation="border"  role="status">
                        <span className="visually-hidden">Loading...</span>
                    </Spinner>
                </div>
                :
                <div className='d-flex flex-column w-100'>
                    <NavigatorBar user={{id: user.id, image: user.image, fullname: user.fullname, username: user.username}}/>
                    <Container style={{marginTop: "50px"}}>
                        <Row className="p-0" style={{height: "350px",position: "relative"}}>
                            {
                                user.background!=null?
                                <Image src={`${APIService.URL_REST_API}/files/`+user.background} className="object-fit-cover" style={{height: "inherit",objectPosition: "center",width: "100%"}}/>
                                :
                                <div className="d-flex justify-content-center align-items-center bg-secondary">
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
                                    <div style={{marginLeft: "240px", textAlign: "start",marginBottom: "50px"}}>
                                        <h2>{user.fullname}</h2>
                                        <span className="d-block text-black-50">@{user.username}</span>
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
                                                    <Nav.Item >
                                                        <Nav.Link eventKey="setting" style={{width: "80px"}}  className="d-flex flex-column align-items-center justify-content-between p-2 text-dark">
                                                            <GearFill size={20}/>
                                                            <span>Setting</span>
                                                        </Nav.Link>
                                                    </Nav.Item>
                                                </Nav>
                                            </Col>
                                        </Row>
                                    </Container>
                                </div>
                            </div>
                        </Row>
                        {tabSession()}
                    </Container>
                </div>

            }
            
        </div>
    );
}
export default Profile;