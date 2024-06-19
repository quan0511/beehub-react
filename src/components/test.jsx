import React, { useState } from "react";
import { Button, Col, Container, Form, Image, InputGroup, ListGroup, Nav, Navbar, OverlayTrigger, Row, Tooltip } from "react-bootstrap";
import { Bag, Ban, Bell, ChatRightHeartFill, EnvelopeOpen, PersonAdd, Search, Trash2 } from "react-bootstrap-icons";
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
import '../css/navigatorBar.css';
import dateFormat from "dateformat";
import { useChangeSeenNoteMutation, useGetNoteByUserQuery } from "../post/postApiSlice";

function NavigatorBar() {
    const user = useSelector(selectCurrentUser);
    const token = useSelector(selectCurrentToken);
    const reset = useSelector((state) => state.user.reset);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [changeSeen] = useChangeSeenNoteMutation();
    const {data:getNoteByUser} = useGetNoteByUserQuery({id:user?.id})
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
            await changeSeen({id})
        }catch(error){
            console.error('Đã xảy ra lỗi khi thay đổi trạng thái seen', error);
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
                        </Nav>
                        {toggleNote && (
                           
                            <div className="toggleNotification">           
                                <div>
                                <div className="toggleNotification-header">Notification</div>
                                {getNoteByUser?.map((note) =>(
                                <div>
                                {note.length === 0 ? (
                                <div className="toggleNotification-noNote">
                                    No Notification
                                </div>
                                ):(
                                <div>
                                    <div className="toggleNotificationkhung">
                                        <div className="link-as-div" onClick={async () => {
                                            await handleChangeSeenNote(note.id);
                                            navigate(`/postnote/${note.post}`, { state: { post: note.post } });
                                        }}>
                                            <div className="toggleNotification-avatarAndnoteTrue">
                                                <div>
                                                    <div className="toggleNotification-note">{note.content}</div>
                                                    <div className="toggleNotification-time">{calculateTimeDifference(note.createdAt)}</div>
                                                </div>
                                                <div className="toggleNotificationstatus"></div>
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