import React, { useState } from "react";
import { Button, Col, Container, Form, Image, InputGroup, ListGroup, Nav, Navbar, OverlayTrigger, Row, Tooltip } from "react-bootstrap";
import { Bag, Bell, ChatRightHeartFill, EnvelopeOpen, PersonAdd, Search, Trash2 } from "react-bootstrap-icons";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
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
import './navigatorBar.css';
import dateFormat from "dateformat";

function NavigatorBar() {
    const user = useSelector(selectCurrentUser);
    const token = useSelector(selectCurrentToken);
    const reset = useSelector((state) => state.user.reset);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [show, setShow] = useState(false);
    const [searchParams, setSearchParams] = useSearchParams();
    const [searchQuery, setSearchQuery] = useState(searchParams.get("search") || "");
    const [showLeft, setShowLeft] = useState(false);
    const { data: notifications, isLoading, isSuccess } = useGetNotitficationQuery({ id: user.id, reset: reset });
    const [addFriendNotification, setAddFriendNotification] = useState([]);

    const handleClose = () => setShow(false);
    const handleSubmit = (event) => {
        event.preventDefault();
        setSearchParams({ search: searchQuery });
        navigate(`/search?search=${encodeURIComponent(searchQuery)}`);
    };
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
        console.log(resp);
        if (resp.result != 'unsuccess' || resp.result != "error") {
            dispatch(refresh());
        }
    }
    const tooltipAddFriend = isLoading ?
        (
            <Tooltip id="tooltip-loading" >
                {BeehubSpinner()}
            </Tooltip>
        ) : (<Tooltip id="tooltip-add-friend" >
            <ListGroup>
                {notifications != null && addFriendNotification.length > 0 ? addFriendNotification.map((req, index) => {
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
                                    <p className="text-black text-start lh-sm "><b>{req.sender.fullname}</b> &nbsp; send add friend request <br />
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
                }) :
                    <ListGroup.Item>Not Found Requirement</ListGroup.Item>
                }
            </ListGroup>
        </Tooltip>);

    useEffect(() => {
        if (notifications != null) {
            setAddFriendNotification(notifications.filter(e => e.group_id == null && !e["_accept"]));
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
                    <Col lg={4} md={4} sm={5} xs={6} className="ms-auto">
                        <Nav className="justify-content-end d-flex flex-row" variant="none" defaultActiveKey="/home">
                            <Nav.Item className="me-2">
                                <Nav.Link >
                                    <OverlayTrigger
                                        trigger="click"
                                        placement="bottom"
                                        overlay={tooltipAddFriend}
                                    >
                                        <div className="position-relative">
                                            <Bell size={20} />
                                            {!isLoading && notifications.length > 0 ?
                                                <span className="position-absolute top-0 start-100 translate-middle badge border border-light rounded-circle bg-danger p-1"><span class="visually-hidden">add friend notification</span></span>
                                                : <></>
                                            }
                                        </div>
                                    </OverlayTrigger>
                                </Nav.Link>
                            </Nav.Item>
                            <Nav.Item className="me-2">
                                <Nav.Link href="#">
                                    <EnvelopeOpen size={20} />
                                </Nav.Link>
                            </Nav.Item>
                            <Nav.Item className="me-2">
                                <Nav.Link href="#">
                                    <Bag size={20} />
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
                    </Col>
                </Row>
            </Container>
        </Navbar>
    );
}
export default NavigatorBar;