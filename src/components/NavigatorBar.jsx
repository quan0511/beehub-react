import React, { useState } from "react";
import { Button, Col, Container, Form, InputGroup, Nav, Navbar, Row } from "react-bootstrap";
import { Bag, Bell,ChatRightHeartFill,EnvelopeOpen, PersonAdd, Search} from "react-bootstrap-icons";
import { useNavigate, useSearchParams } from "react-router-dom";
import OffcanvasMessages from "./OffcanvasMessages";
import APIService from "../features/APIService";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../auth/authSlice";
import Hero from "./Hero";
import { OffcanvasSectionLeft } from "./OffcanvasSectionLeft";

function NavigatorBar({hideButton}){
    const user = useSelector(selectCurrentUser);
    const navigate = useNavigate();
    const [show,setShow] = useState(false);
    const handleClose = () => setShow(false);
    const [searchParams, setSearchParams] = useSearchParams();
    const [searchQuery, setSearchQuery] = useState(searchParams.get("search") || "");
    const [showLeft, setShowLeft] = useState(false);
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

    if(!user) return

    return (
         <Navbar expand="xl" style={{boxShadow: "rgba(0, 0, 0, 0.15) 0px 3px 3px 0px",width:"-webkit-fill-available", zIndex:"3"}} className="bg-body-tertiary pb-2 position-fixed">
            <Container fluid >
                <Row style={{  width: "-webkit-fill-available",marginTop: "3px"}}>
                    <Col lg={6} md={7} sm={7} xs={6}>
                        <Row>
                            <Col xl={0} lg={1} md={1} sm={1} xs={1}>
                                <Button className="navbar-toggler" onClick={()=>setShowLeft(true)}  >
                                    <span className="navbar-toggler-icon"></span>
                                </Button>
                                <OffcanvasSectionLeft show={showLeft} handleClose={()=>setShowLeft(false)} />
                            </Col>
                            <Col lg={8} md={8} sm={8} xs={6} className="mx-auto">
                            
                                <Form onSubmit={handleSubmit} >
                                    <InputGroup >
                                        <InputGroup.Text id="basic-addon2" style={{borderRight: 0,backgroundColor: "#ffffff"}}>
                                            <Search />
                                        </InputGroup.Text>
                                        <Form.Control style={{borderLeft: 0}} 
                                            placeholder="Search"
                                            aria-describedby="basic-addon2"
                                            name="search"
                                            onChange={(event) => setSearchQuery(event.target.value)}/>
                                    </InputGroup>
                                </Form>
                            </Col>
                        
                        </Row>
                    </Col>
                    {/* <Col  ></Col> */}
                    <Col lg={3} md={3} sm={5} xs={6} className="ms-auto">
                        <Nav className="justify-content-end d-flex flex-row" variant="none" defaultActiveKey="/home">
                            <Nav.Item className="me-2">
                                <Nav.Link >
                                    <PersonAdd size={20}/>
                                </Nav.Link>
                            </Nav.Item>
                            <Nav.Item className="me-2">
                                <Nav.Link >
                                    <Bell size={20}/>
                                </Nav.Link>
                            </Nav.Item>
                            <Nav.Item  className="me-2">
                                <Nav.Link  href="/friend">
                                    <EnvelopeOpen size={20}/>
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
                                    title={user?.username}
                                    timestamp={'May, 2024'}
                                    linkTitle={'Profile'} linkUrl={`/member/profile/`+user.username}
                                />
                            </Nav.Item>

                            <Nav.Item>
                                <Button onClick={() => setShow(!show)} className="me-2" variant="link" >
                                    <ChatRightHeartFill fill="#8224e3" size={24}/>
                                </Button>
                                <OffcanvasMessages show={show} handleClose={handleClose}/>
                            </Nav.Item>
                        </Nav>
                    </Col>
                </Row>
            </Container>

         </Navbar>
    );
}
export default NavigatorBar;