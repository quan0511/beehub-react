import React, { useState } from "react";
import { Button, Col, Container, Form, Image, InputGroup, ListGroup, Nav, Navbar, OverlayTrigger, Row, Tooltip } from "react-bootstrap";
import { Bag, Ban, Bell, ChatRightHeartFill, EnvelopeOpen, PersonAdd, Search, Trash2 } from "react-bootstrap-icons";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { FaExclamationCircle } from "react-icons/fa";
import OffcanvasMessages from "./OffcanvasMessages";
import APIService from "../features/APIService";
import { useDispatch, useSelector } from "react-redux";
import { selectCurrentToken, selectCurrentUser } from "../auth/authSlice";
import Hero from "./Hero";
import { OffcanvasSectionLeft } from "./OffcanvasSectionLeft";
import { useGetNotitficationQuery } from "../features/userApiSlice";
import { useEffect } from "react";
import BeehubSpinner from "./BeehubSpinner";
import { refresh } from "../features/userSlice";
import '../css/navigatorBar.css';
import dateFormat from "dateformat";
import { BiMinus } from "react-icons/bi";
import { useChangeSeenNoteMutation, useCheckNoteSeenQuery, useGetNoteByUserQuery } from "../post/postApiSlice";

function NavigatorBar() {
    const user = useSelector(selectCurrentUser);
    const token = useSelector(selectCurrentToken);
    const reset = useSelector((state) => state.user.reset);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [changeSeen] = useChangeSeenNoteMutation();
    const {data:getNoteByUser,refetch:refectGetNoteByUser} = useGetNoteByUserQuery({id:user?.id});
    const { data: checkSeenNote, refetch: refetchCheckSeenNote } = useCheckNoteSeenQuery({ userId: user?.id });
    const [show, setShow] = useState(false);
    const [searchParams, setSearchParams] = useSearchParams();
    const [searchQuery, setSearchQuery] = useState(searchParams.get("search") || "");
    const [showLeft, setShowLeft] = useState(false);
    const { data: notifications, isLoading, isSuccess } = useGetNotitficationQuery({ id: user.id, reset: reset },{skip:user==null });
    const [addFriendNotification, setAddFriendNotification] = useState([]);
    const [newFriendNotification, setNewFriendNotification] = useState([]);
    const [joinedGroupNotification, setJoinedGroupNotification] = useState([]);
    const [toggleNote,setToggleNote] = useState(false);
    const handleToggleNote = () =>{
        setToggleNote(!toggleNote);
    }
    const handleClose = () => setShow(false);
    const handleSubmit = (event) => {
        event.preventDefault();
        setSearchParams({ search: searchQuery });
        navigate(`/search?search=${encodeURIComponent(searchQuery)}`);
    };
    const handleChangeSeenNote = async (id)=>{
        try{
            await changeSeen({id});
            refectGetNoteByUser();
            refetchCheckSeenNote();
        }catch(error){
            console.error('Đã xảy ra lỗi khi thay đổi trạng thái seen', error);
        }
    }
    const heroImage = () => {
        if (user?.image) return user.image
        else if (user?.gender === "female") return `${APIService.URL_REST_API}/files/user_female.png`
        else return `${APIService.URL_REST_API}/files/user_male.png`
    }
    const getTimeOfRequirement = (requi) => {
        let datePost = new Date(requi);

        let diffDay = Math.round(Math.abs(new Date() - datePost) / 86400000);
        if (diffDay < 1) {
            let diffHour = Math.round(Math.abs(new Date() - datePost) / 3600000);
            return <span style={{ fontSize: "12px" }}>{diffHour} hours ago</span>
        } else {
            return <span style={{ fontSize: "12px" }}>{datePost.toLocaleString("en-GB")}</span>
        }
    }
    const handleClick = async (typeClick, sender) => {
        let resp = await APIService.createRequirement(user.id, { sender_id: sender, receiver_id: user.id, type: typeClick }, token);
        if (resp.result != 'unsuccess' || resp.result != "error") {
            dispatch(refresh());
        }
    }
    const handleClickRemove = async(typeClick,id_rep)=>{
        let resp = await APIService.createRequirement(user.id, { id:id_rep, sender_id: user.id, type: typeClick }, token);
        if (resp.result != 'unsuccess' || resp.result != "error") {
            dispatch(refresh());
        }
    }
    const calculateTimeDifference = (createdAt) => {
        const createdDate = new Date(createdAt);
        const currentDate = new Date();
        const timeDifference = currentDate - createdDate; // Lấy thời gian chênh lệch tính bằng milliseconds
        const secondsDifference = Math.floor(timeDifference / 1000);
        const minutesDifference = Math.floor(secondsDifference / 60);
        const hoursDifference = Math.floor(minutesDifference / 60);
        const daysDifference = Math.floor(hoursDifference / 24);
      
        if (daysDifference > 0) {
          return `${daysDifference} days ago`;
        } else if (hoursDifference > 0) {
          return `${hoursDifference} hours ago`;
        } else if (minutesDifference > 0) {
          return `${minutesDifference} minutes ago`;
        } else {
          return `${secondsDifference} seconds ago`;
        }
      };
      console.log('check seen: ',checkSeenNote)
    const tooltipAddFriend = isLoading ?
        (
            <Tooltip id="tooltip-loading" >
                <BeehubSpinner/>
            </Tooltip>
        ) : (<Tooltip id="tooltip-add-friend" >
            <ListGroup>
                {addFriendNotification.map((req, index) => {
                    return (
                        <ListGroup.Item key={index}>
                            <Row>
                                <Col xl={2} lg={3} md={4} sm={3}>
                                    {req.sender.image != null ?
                                        <Link to={"/member/profile/" + req.sender.username}>
                                            <Image src={req.sender.image} style={{ width: "50px", height: "50px" }} roundedCircle />
                                        </Link>
                                        : (
                                            req.sender.gender == 'female' ?
                                                <Link to={"/member/profile/" + req.sender.username}>
                                                    <Image src={APIService.URL_REST_API + "/files/user_female.png"} style={{ width: "50px", height: "50px" }} roundedCircle /></Link>
                                                : <Link to={"/member/profile/" + req.sender.username}><Image src={APIService.URL_REST_API + "/files/user_male.png"} style={{ width: "50px", height: "50px" }} roundedCircle /></Link>
                                        )}
                                </Col>
                                <Col xl={6} lg={5} md={4} sm={5} className="ps-3">
                                    <p className="text-black text-start lh-sm "><Link to={"/member/profile/" + req.sender.username} className="text-decoration-none text-dark fw-bold">{req.sender.fullname}</Link> &nbsp; send add friend request <br />
                                        <span className="text-black-50">{getTimeOfRequirement(req.create_at)}</span>
                                    </p>
                                </Col>
                                <Col xl={4} lg={4} md={4} sm={4} className="d-lg-inline-flex d-flex flex-wrap justify-content-center align-items-center" >
                                    <Button variant="outline-primary btn-sm mb-2" onClick={() => { handleClick("ACCEPT", req.sender.id) }}>Accept</Button>
                                    <Button variant="outline-danger btn-sm" onClick={() => { handleClick("CANCEL_ADDFRIEND", req.sender.id) }}>Cancel</Button>
                                </Col>
                            </Row>
                        </ListGroup.Item>
                    );
                })}
                {newFriendNotification.map((req, index) => {
                    return (
                        <ListGroup.Item key={index}>
                            <Row>
                                <Col xl={2} lg={3} md={4} sm={3}>
                                    {req.receiver.image != null ?
                                        <Link to={"/member/profile/" + req.receiver.username}>
                                            <Image src={req.receiver.image} style={{ width: "50px", height: "50px" }} roundedCircle />
                                        </Link>
                                        : (
                                            req.receiver.gender == 'female' ?
                                                <Link to={"/member/profile/" + req.receiver.username}>
                                                    <Image src={APIService.URL_REST_API + "/files/user_female.png"} style={{ width: "50px", height: "50px" }} roundedCircle /></Link>
                                                : <Link to={"/member/profile/" + req.receiver.username}><Image src={APIService.URL_REST_API + "/files/user_male.png"} style={{ width: "50px", height: "50px" }} roundedCircle /></Link>
                                        )}
                                </Col>
                                <Col xl={6} lg={5} md={4} sm={5} className="ps-3">
                                    <p className="text-black text-start lh-sm ">You have a new friend &nbsp;<Link to={"/member/profile/" + req.sender.username} className="text-decoration-none text-dark fw-bold">{req.receiver.fullname}</Link><br />
                                        <span className="text-black-50">{getTimeOfRequirement(req.create_at)}</span>
                                    </p>
                                </Col>
                                <Col xl={4} lg={4} md={4} sm={4} className="d-lg-inline-flex d-flex flex-wrap justify-content-center align-items-center" >
                                    <Button variant="btn-sm" onClick={() => { handleClickRemove("REMOVE_NOTIFICATION", req.id) }}><BiMinus size={20}/></Button>
                                </Col>
                            </Row>
                        </ListGroup.Item>
                    );
                })}
                {joinedGroupNotification.map((req, index) => {
                    return (
                        <ListGroup.Item key={index}>
                            <Row>
                                <Col xl={2} lg={3} md={4} sm={3}>
                                    {req.group.image_group != null ?
                                        <Link to={"/group/" + req.group.id}>
                                            <Image src={req.group.image_group} style={{ width: "50px", height: "50px" }} roundedCircle />
                                        </Link>
                                        :  <Link to={"/group/" + req.group.id}>
                                        <Image src={APIService.URL_REST_API+"/files/group_image.png"} style={{ width: "50px", height: "50px" }} roundedCircle />
                                    </Link>}
                                </Col>
                                <Col xl={6} lg={5} md={4} sm={5} className="ps-3">
                                    <p className="text-black text-start lh-sm ">Now you are a member of &nbsp;<Link to={"/group/" + req.group.id} className="text-decoration-none text-dark fw-bold">{req.group.groupname}</Link><br />
                                        <span className="text-black-50">{getTimeOfRequirement(req.create_at)}</span>
                                    </p>
                                </Col>
                                <Col xl={4} lg={4} md={4} sm={4} className="d-lg-inline-flex d-flex flex-wrap justify-content-center align-items-center" >
                                     <Button variant="btn-sm" onClick={() => { handleClickRemove("REMOVE_NOTIFICATION", req.id) }}><BiMinus size={20}/></Button>
                                </Col>
                            </Row>
                        </ListGroup.Item>
                    );
                })}
            </ListGroup>
        </Tooltip>);

    useEffect(() => {
        if (notifications != null) {
            setAddFriendNotification(notifications.filter(e => e.group_id == null && !e["_accept"]));
            setNewFriendNotification(notifications.filter(e => e.receiver != null && e["_accept"]));
            setJoinedGroupNotification(notifications.filter(e => e.group != null && e["_accept"]));
        }
    }, [notifications]);

    if (!user) return

    return (
        <Navbar expand="xl" style={{ boxShadow: "rgba(0, 0, 0, 0.15) 0px 3px 3px 0px", width: "-webkit-fill-available", zIndex: "3" }} className="bg-body-tertiary pb-2 position-fixed">
            <Container fluid >
                <Row style={{ width: "-webkit-fill-available", marginTop: "3px" }}>
                    <Col lg={6} md={7} sm={7} xs={6}>
                        <Row>
                            <Col xl={0} lg={1} md={1} sm={1} xs={1}>
                                <Button className="navbar-toggler" onClick={() => setShowLeft(true)}  >
                                    <span className="navbar-toggler-icon"></span>
                                </Button>
                                <OffcanvasSectionLeft show={showLeft} handleClose={() => setShowLeft(false)} />
                            </Col>
                            <Col lg={8} md={8} sm={8} xs={6} className="mx-auto">

                                <Form onSubmit={handleSubmit} >
                                    <InputGroup >
                                        <InputGroup.Text id="basic-addon2" style={{ borderRight: 0, backgroundColor: "#ffffff" }}>
                                            <Search />
                                        </InputGroup.Text>
                                        <Form.Control style={{ borderLeft: 0 }}
                                            placeholder="Search"
                                            aria-describedby="basic-addon2"
                                            name="search"
                                            onChange={(event) => setSearchQuery(event.target.value)} />
                                    </InputGroup>
                                </Form>
                            </Col>

                        </Row>
                    </Col>
                    {/* <Col  ></Col> */}
                    <Col xl={4} lg={4} md={3} sm={5} xs={6} className="ms-auto">
                        <Nav className="justify-content-end d-flex flex-row" variant="none" defaultActiveKey="/home">
                            {checkSeenNote === true &&(
                                <div className="iconnotecheckseen"><FaExclamationCircle /></div>
                            )}
                            <Nav.Item className="me-2" style={{marginTop: "1.5px"}} onClick={handleToggleNote}>
                                <Nav.Link >
                                    <Bell size={20}/>
                                </Nav.Link>
                            </Nav.Item>
                            <Nav.Item className="me-2">
                                <Nav.Link >
                                    <OverlayTrigger
                                        trigger="click"
                                        placement="bottom"
                                        rootClose
                                        overlay={tooltipAddFriend}
                                    >
                                        <div className="position-relative">
                                        <EnvelopeOpen size={20}/> 
                                            {!isLoading&& notifications.length>0?
                                                <span className="position-absolute top-0 start-100 translate-middle badge border border-light rounded-circle bg-danger p-1"><span className="visually-hidden">add friend notification</span></span>
                                                : <></>
                                            }
                                        </div>
                                    </OverlayTrigger>
                                </Nav.Link>
                            </Nav.Item>
                            <Nav.Item  className="me-2">
                                <Nav.Link  href="/friend">
                                    <Bag size={20}/>
                                </Nav.Link>
                            </Nav.Item>
                            <Nav.Item >
                                <Hero
                                    img={heroImage()}
                                    background={user?.background}
                                    title={user?.username}
                                    timestamp={dateFormat(user?.createdAt, "dddd, mmmm dS, yyyy")}
                                    linkTitle={'Profile'} linkUrl={`/member/profile/` + user?.username}
                                />
                            </Nav.Item>
                            <Nav.Item>
                                <Button onClick={() => setShow(!show)} className="me-2" variant="link" >
                                    <ChatRightHeartFill fill="#8224e3" size={24} />
                                </Button>
                                <OffcanvasMessages show={show} handleClose={handleClose} />
                            </Nav.Item>
                        </Nav>
                        {toggleNote && (
                            <div className="toggleNotification">           
                                <div>
                                <div className="toggleNotification-header">Notification</div>
                                {getNoteByUser?.map((note) =>(
                                <div key={note.id}>
                                {note.length === 0 ? (
                                <div className="toggleNotification-noNote">
                                    No Notification
                                </div>
                                ):(
                                    <div>
                                        <div className="toggleNotificationkhung">
                                            <div className="link-as-div" onClick={async () => {
                                                await handleChangeSeenNote(note.id);
                                                navigate(`/postnote/${note.post}`);
  
                                            }}>
                                                <div className="toggleNotification-avatarAndnoteTrue">
                                                    <div>
                                                        <div className="toggleNotification-note">{note.content}</div>
                                                        <div className="toggleNotification-time">{calculateTimeDifference(note.createdAt)}</div>
                                                    </div>
                                                    {note.seen === false ? (
                                                        <div className="toggleNotificationstatusfalse"></div>
                                                    ):(
                                                        <div className="toggleNotificationstatustrue"></div>
                                                    )}
                                                    
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    )}
                                </div>
                            ))}
                            </div>                              
                        </div> 
                        )}
                    </Col>
                </Row>
            </Container>
        </Navbar>
    );
}
export default NavigatorBar;