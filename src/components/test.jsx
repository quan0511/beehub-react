import React, { useEffect, useState } from "react";
import { Button, Col, Container, Nav, Navbar, Row } from "react-bootstrap";
import { Bell, Bag, ChatRightHeartFill } from "react-bootstrap-icons";
import { useNavigate, useSearchParams } from "react-router-dom";
import { FaExclamationCircle } from "react-icons/fa";
import OffcanvasMessages from "./OffcanvasMessages";
import { useDispatch, useSelector } from "react-redux";
import { selectCurrentUser } from "../auth/authSlice";
import Hero from "./Hero";
import '../css/navigatorBar.css';
import dateFormat from "dateformat";
import { useChangeSeenNoteMutation, useCheckNoteSeenQuery } from "../post/postApiSlice";
import { selectWs } from "../messages/websocketSlice";
import { selectNotifications, addNotification } from "../notifications/notificationSlice";

function NavigatorBar() {
    const user = useSelector(selectCurrentUser);
    const notification = useSelector(selectNotifications);
    const reset = useSelector((state) => state.user.reset);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [changeSeen] = useChangeSeenNoteMutation();
    const {data:getNoteByUser,refetch:refectGetNoteByUser} = useGetNoteByUserQuery({id:user?.id});
    const { data: checkSeenNote, refetch: refetchCheckSeenNote } = useCheckNoteSeenQuery({ userId: !user?.id });
    const [show, setShow] = useState(false);
    const [searchParams, setSearchParams] = useSearchParams();
    const [searchQuery, setSearchQuery] = useState(searchParams.get("search") || "");
    const [toggleNote, setToggleNote] = useState(false);
    const ws = useSelector(selectWs);

    const handleToggleNote = () => {
        setToggleNote(!toggleNote);
    };
    const handleClose = () => setShow(false);
    const handleChangeSeenNote = async (id) => {
        try {
            await changeSeen({ id });
            refectGetNoteByUser();
            refetchCheckSeenNote();
        } catch (error) {
            console.error('Đã xảy ra lỗi khi thay đổi trạng thái seen', error);
        }
    };
    if (!user) return null;

    return (
        <Navbar expand="xl" style={{ boxShadow: "rgba(0, 0, 0, 0.15) 0px 3px 3px 0px", width: "-webkit-fill-available", zIndex: "3" }} className="bg-body-tertiary pb-2 position-fixed">
            <Container fluid >
                <Row style={{ width: "-webkit-fill-available", marginTop: "3px" }}>
                    <Col xl={4} lg={4} md={3} sm={5} xs={6} className="ms-auto">
                        <Nav className="justify-content-end d-flex flex-row" variant="none" defaultActiveKey="/home">
                            {checkSeenNote === true && (
                                <div className="iconnotecheckseen"><FaExclamationCircle /></div>
                            )}
                            <Nav.Item className="me-2" style={{ marginTop: "1.5px" }} onClick={handleToggleNote}>
                                <Nav.Link >
                                    <Bell size={20} />
                                </Nav.Link>
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
                                    {getNoteByUser?.map((note) => (
                                        <div key={note.id}>
                                            {note.length === 0 ? (
                                                <div className="toggleNotification-noNote">
                                                    No Notification
                                                </div>
                                            ) : (
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
                                                                ) : (
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
