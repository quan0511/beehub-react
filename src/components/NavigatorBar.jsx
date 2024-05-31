import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Button, Col, Container, Dropdown, DropdownButton, Form, Image, InputGroup, Nav, Navbar, Row } from "react-bootstrap";
import { Bag, Bell,ChatRightHeartFill,EnvelopeOpen, PersonAdd, Search} from "react-bootstrap-icons";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import OffcanvasMessages from "./OffcanvasMessages";
import APIService from "../features/APIService";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../auth/authSlice";
import { useLogoutMutation } from "../auth/authApiSlice";
import { logOut } from "../auth/authSlice";
import BeehubSpinner from "./BeehubSpinner";
import { OffcanvasSectionLeft } from "./OffcanvasSectionLeft";

function NavigatorBar(){
    const user = useSelector(selectCurrentUser);
    const [logout, {isLoading}] = useLogoutMutation()
    const dispatch = useDispatch();
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
    const handleLogout = async (e) => {
        e.preventDefault()
        await logout()
        dispatch(logOut())
        navigate("/login", {replace: true})
    }
    const hero = () => {
        if (isLoading) { return <BeehubSpinner/> }
        else if (user?.image) { return <Image src={user.image} style={{width:"25px",height: "25px",marginRight: "5px"}} roundedCircle /> }
        else if (user?.gender === "female") { return <Image src={`${APIService.URL_REST_API}/files/user_female.png`} style={{width:"25px",height: "25px",marginRight: "5px"}} roundedCircle /> }
        else { return <Image src={`${APIService.URL_REST_API}/files/user_male.png`} style={{width:"25px",height: "25px",marginRight: "5px"}} roundedCircle /> }
    }

    if(!user) return

    return (
         <Navbar expand="xl" style={{boxShadow: "rgba(0, 0, 0, 0.15) 0px 3px 3px 0px",width:"-webkit-fill-available", zIndex:"3"}} className="bg-body-tertiary pb-2 position-fixed">
            <Container fluid >
                <Row style={{ width: "100%", marginTop: "3px"}}>
                    <Col lg={6} md={7} sm={7} xs={4}>
                        <Row>
                            <Col>
                            <Button className="navbar-toggler" onClick={()=>setShowLeft(true)} >
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
                    <Col ></Col>
                    <Col lg={3} md={3} sm={3} xs={2}>
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
                            <DropdownButton 
                                variant="info"
                                drop="down-centered"
                                title={<span className="">{hero()}</span>}
                            >
                                <Dropdown.Item href={`/member/profile/`+user.username}>Profile</Dropdown.Item>
                                <Dropdown.Item onClick={handleLogout}>Logout</Dropdown.Item>
                            </DropdownButton>
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