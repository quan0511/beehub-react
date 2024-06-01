import React, { useEffect, useState } from "react";
import { Button, Col, Container, Form, Image, ListGroup, Modal, Nav, Row, Spinner } from "react-bootstrap";
import { CardImage, ColumnsGap, GearFill, PenFill, PencilFill, People, PersonVcard, Plus, PlusCircle,} from "react-bootstrap-icons";

import "./Profile.css"
import ProfileAbout from "./ProfileAbout";
import ProfilePost from "./ProfilePost";
import ProfileFriends from "./ProfileFriends";
import ProfilePhotos from "./ProfilePhotos";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import APIService from "../../features/APIService";
import { useDispatch, useSelector } from "react-redux";
import { selectCurrentToken, selectCurrentUser } from "../../auth/authSlice";
import { useProfileQuery, useUploadBackgroundProfileMutation, useUploadImageProfileMutation } from "../../features/userApiSlice";
import userSlice, { refresh } from "../../features/userSlice";

function Profile (){
    const appUser = useSelector(selectCurrentUser);
    const token = useSelector(selectCurrentToken);
    const { username } = useParams();
    const dispatch = useDispatch();
    const reset = useSelector((state)=>state.user.reset);
    const {data: user, isLoading, isSuccess} = useProfileQuery({id: appUser.id,username: username,reset:reset});
    const [tab, setTab] = useState('posts');
    const handleClose1 = () => setShow1(false);
    const [show1, setShow1] = useState(false);
    const handleShow1 = () => setShow1(true);
    const [show2, setShow2]= useState(false);
    const [fileImage,setFileImage] = useState();
    const [fileBackground, setFileBackground] = useState();
    const [saveImg,{isLoadingImage, isFetchingImage, isErrorImage, isSuccessImage}] = useUploadImageProfileMutation();
    const [saveBg,{isLoadingBg, isFetchingBg,isErrorBg, isSuccessBg}] = useUploadBackgroundProfileMutation();
    const handelSelectTab = (selectKey)=>{
        setTab(selectKey);
    }
    const hideFriendCheck = ()=>{
        let check = false;
        console.log(user);
        if(isSuccess && (user.id != appUser.id)){
            user.user_settings.forEach((e)=>{
                console.log(e["setting_item"] == 'list_friend' && e["setting_type"] == "HIDDEN" );
                console.log((user.relationship_with_user != "FRIEND"||user.relationship_with_user == null) && e["setting_type"] == "FOR_FRIEND");
                if((e["setting_item"] == 'list_friend' && e["setting_type"] == "HIDDEN" )||((user.relationship_with_user != "FRIEND"||user.relationship_with_user == null) && e["setting_type"] == "FOR_FRIEND")){
                    check = true;
                }
            })
        }
        return check;
    }
    const tabSession = ()=>{
        switch(tab){
            case "posts": 
                return <ProfilePost appUser={appUser} user={user}/>;
            case "friends":
                let listsfriend =  user.relationships.filter((e)=> e.typeRelationship != "BLOCKED");
                return <ProfileFriends appUser={appUser} friends={listsfriend} user_id={user.id} />;
            case "about":
                return <ProfileAbout user={user} appUser={appUser} />;
            case "photos":
                return <ProfilePhotos galleries={user.galleries}/>;
            case "setting":
                return <ProfileSetting user={user} />;
            default:
                return  <ProfilePost  user={user}/>;
        }
    }
    const handleClick= async (typeClick)=>{
        let resp = await APIService.createRequirement(appUser.id, {sender_id: appUser.id, receiver_id: user.id, type: typeClick },token);
        dispatch(refresh())
    }
    const getButton = ()=>{
        if(user!=null && user.id!=appUser.id){
            switch(user.relationship_with_user){
                case "BLOCKED":
                   return <Button variant="danger" onClick={()=>{ handleClick("UN_BLOCK")}}>Unblock</Button>
                case "FRIEND": 
                    return <Button variant="outline-danger" onClick={()=>{  handleClick("UN_FRIEND")}}>Unfriend</Button>
                case "SENT_REQUEST":
                    return <Button variant="outline-warning" onClick={()=>{ handleClick("CANCEL_REQUEST")}}>Cancel Request</Button>
                case "NOT_ACCEPT":
                    return <Button variant="outline-success"  onClick={()=>{ handleClick("ACCEPT")}}>Accept</Button>
                default:
                    return <Button variant="primary"  onClick={()=>{ handleClick("ADD_FRIEND")}}>Add Friend</Button>
            }
        }
    }
    const readURLImage = (input)=> {
        if (input.files && input.files[0]) {
            var reader = new FileReader();
            
            reader.onload = function (e) {
                document.getElementById("img-upload").setAttribute("src",e.target.result);
            }
            
            reader.readAsDataURL(input.files[0]);
            setFileImage(input.files[0]);
            document.getElementById("submit-image").disabled= false;
        }
    }
    const readURLBackground = (input)=>{
        if (input.files && input.files[0]) {
            var reader = new FileReader();
            
            reader.onload = function (e) {
                document.getElementById("bg-upload").setAttribute("src",e.target.result);
            }
            
            reader.readAsDataURL(input.files[0]);
            setFileBackground(input.files[0]);
            document.getElementById("submit-bg").disabled= false;
        }
    }
    const handleSubmitBackground = async (e)=>{
        try {
            await saveBg({id:appUser.id,background:fileBackground });
            setShow2(false);
        } catch (error) {
            console.log(error);
        }
    }
    const handleSubmitImage = async (e)=>{
        try {
            await saveImg({id: appUser.id,image: fileImage})
            handleClose1();
        } catch (error) {
            console.log(error);
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
            <Container style={{marginTop: "50px"}} fluid>
                <Row className="p-0" style={{position: "relative"}}>
                    <div className="d-flex justify-content-center align-items-center bg-secondary" style={{height: "350px",width: "100%", overflow:"hidden"}}>
                    {
                        user.background!=null?
                        <Image src={user.background} className="object-fit-cover" style={{objectPosition: "center"}} fluid/>
                        :
                        <></>        
                    }
                    
                    </div>
                    <Modal show={show2}
                        onHide={()=>setShow2(false)}
                        backdrop="static"
                        keyboard={false}
                        fullscreen={false}>
                        <Modal.Header closeButton>
                            <Modal.Title>Upload Avatar</Modal.Title>
                        </Modal.Header>
                        <form onSubmit={handleSubmitBackground} encType="multipart/form-data">
                        <Modal.Body className="d-flex flex-column align-items-center justify-content-center">
                            <div className="border rounded-2" style={{height: "150px",width: "450px"}}>
                                {user.background !=null? 
                                    <Image src={user.background} id="bg-upload"  style={{height: "inherit",width:"inherit",objectFit:"fill"}}/>
                                    : <div style={{height: "inherit",objectPosition: "center",width: "100%",backgroundColor: "rgb(57,59,70,0.2)",}}>
                                        <img id="bg-upload"  style={{height: "inherit",width:"inherit",objectFit:"fill"}}/>
                                    </div>
                                }
                            </div>
                            <div className="d-flex align-items-center justify-content-center">
                                <input type="file" name="bg" id="bg" className="form-control my-3 mx-auto" onChange={(e)=>readURLBackground(e.target)}  />

                            </div>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="primary" id="submit-bg" type="submit" disabled>Save</Button>
                        </Modal.Footer>
                        </form>
                    </Modal>
                    <div className="position-absolute " id="profile-menu">
                        <div className="d-flex flex-column ps-lg-5 ps-md-1 bg-white rounded-3 shadow p-2">
                            <Row>
                                <Col xl={2} lg={2} md={2} sm={2} className="position-relative mb-3" style={{height: "120px"}} >
                                    {
                                        user.image!=null?
                                        <Image src={user.image}  className="object-fit-cover border-0 rounded position-absolute" style={{width: "220px", height: "220px",top:"-100px"}}  />
                                        :
                                        (user.gender=='female'?
                                        <Image src={`${APIService.URL_REST_API}/files/user_female.png`}  className="object-fit-cover border-0 rounded position-absolute"  style={{width: "220px", height: "220px",top:"-100px"}} />
                                        :
                                        <Image src={`${APIService.URL_REST_API}/files/user_male.png`}  className="object-fit-cover border-0 rounded position-absolute"  style={{width: "220px", height: "220px",top:"-100px"}}/>
                                        )
                                    }
                                    {
                                        appUser.id == user.id? 
                                        <>
                                            <Button variant="outline-light"  className="position-absolute rounded-circle bottom-0 edit-avatar"  onClick={handleShow1}>
                                                <PencilFill />
                                            </Button>
                                            <Modal show={show1}
                                                onHide={handleClose1}
                                                backdrop="static"
                                                keyboard={false}
                                                size="sm"
                                                fullscreen={false}>
                                                <Modal.Header closeButton>
                                                    <Modal.Title>Upload Avatar</Modal.Title>
                                                </Modal.Header>
                                                <form onSubmit={handleSubmitImage} encType="multipart/form-data">
                                                <Modal.Body className="d-flex flex-column align-items-center justify-content-center">
                                                    <div className="border rounded-2" style={{height: "150px",width: "150px"}}>
                                                        {user.image !=null? 
                                                            <Image src={user.image} id="img-upload"  style={{height: "inherit",width:"inherit",objectFit:"fill"}}/>
                                                            : <div style={{height: "inherit",objectPosition: "center",width: "100%",backgroundColor: "rgb(57,59,70,0.2)",}}>
                                                                <img id="img-upload"  style={{height: "inherit",width:"inherit",objectFit:"fill"}}/>
                                                            </div>
                                                        }
                                                    </div>
                                                    <div className="d-flex align-items-center justify-content-center">
                                                        <input type="file" name="image" id="image" className="form-control my-3 mx-auto" onChange={(e)=>readURLImage(e.target)}  />
            
                                                    </div>
                                                </Modal.Body>
                                                <Modal.Footer>
                                                    <Button variant="primary" id="submit-image" type="submit" disabled>Save</Button>
                                                </Modal.Footer>
                                                </form>
                                            </Modal>
                                        </>
                                        :<></>
                                    }
                                </Col>
                                <Col xl={1} lg={1} md={2} sm={3}></Col>
                                <Col xl={9} lg={9} md={8} sm={5} className="d-flex flex-md-row flex-sm-column justify-content-md-between justify-content-sm-around align-items-md-center pe-5 ps-md-5" >
                                    <div className="mb-sm-3 position-relative" >
                                        <h2>{user.fullname}</h2>
                                        <span className="d-block text-black-50">@{user.username}</span>
                                    </div>
                                    <div>
                                        {getButton()}
                                    </div>
                                    <Button variant="outline-light" className="position-absolute rounded-circle " onClick={()=>setShow2(true)} style={{top: "-50px", right:0}}>
                                        <PencilFill/>
                                    </Button>
                                </Col>
                            </Row>
                            <Container fluid>
                                <Row>
                                    <Col xl={2} lg={3} md={2} sm={12} className="d-flex justify-content-md-center align-items-center ms-md-3">
                                        <ListGroup horizontal>
                                            <ListGroup.Item className="w-50 border-0 px-md-2">
                                                <p className="text-center fs-5"><span className="fw-bold">{user.relationships.filter(e=>e.typeRelationship=='FRIEND').length}</span><span className="d-block text-black-50">Friends</span></p>
                                                
                                            </ListGroup.Item>
                                            <ListGroup.Item className="w-50 border-0 px-md-2">
                                                <p className="text-center fs-5"><span className="fw-bold">{user.group_joined.length}</span><span  className="d-block text-black-50">Groups</span></p>
                                                
                                            </ListGroup.Item>
                                        </ListGroup>
                                    </Col>
                                    <Col xl={8} lg={8} md={9} sm={12} className="mx-lg-auto ms-md-auto " >
                                        <Nav horizontal="md"  variant="tabs" defaultActiveKey="posts" className="my-2 flex-wrap justify-content-start align-items-center" onSelect={handelSelectTab}>
                                            <Nav.Item>
                                                <Nav.Link eventKey="posts"  style={{width: "80px"}} className=" d-flex flex-column align-items-center justify-content-between text-light p-2 text-dark">
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
                                            {hideFriendCheck()?
                                                <></>
                                                :
                                                <Nav.Item>
                                                    <Nav.Link eventKey="friends"  style={{width: "80px"}}  className="d-flex flex-column align-items-center justify-content-between p-2 text-dark">
                                                        <People size={20}/>
                                                        <span>Friends</span>
                                                    </Nav.Link>
                                                </Nav.Item>
                                                
                                            }
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