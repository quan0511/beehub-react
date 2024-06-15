import React from "react";
import { Badge, Dropdown, Image, ListGroup } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import APIService from "../features/APIService";
import { ThreeDots } from "react-bootstrap-icons";
import { useDispatch } from "react-redux";
import { openChat, setUserId } from "../messages/chatboxSlice";

const CustomToggle = React.forwardRef(({ onClick }, ref) => (
    <ThreeDots style={{ cursor: 'pointer' }} ref={ref} onClick={(e) => {
        e.stopPropagation();
        onClick(e);
    }} />
));

function ListFriend({ friends, onClose }) {
    const navigate = useNavigate();
    const dispatch = useDispatch()

    const handleClick = (event, username) => {
        event.preventDefault()
        navigate("/member/profile/" + username)
        onClose()
    }

    const openChatbox = (event, id) => {
        event.preventDefault()
        dispatch(openChat())
        dispatch(setUserId({id}))
        onClose()
    }
    return (
        <ListGroup className=" w-100" >
            {friends.map((e, index) => {
                let imageSrc = e.image != null ? e.image : (e.gender == 'female' ? APIService.URL_REST_API + "/files/user_female.png" : APIService.URL_REST_API + "/files/user_male.png");
                let username = e.username
                return <ListGroup.Item onClick={(event) => openChatbox(event, e.id)} key={index} className='text-start p-2 border-bottom-1 border-start-0 border-end-0 border-top-0' style={{cursor: 'pointer'}}>
                    <Image src={imageSrc} style={{ marginRight: "15px", width: "37px", height: "37px" }} roundedCircle />
                    <span>{e.fullname}</span>
                    {
                        e._banned ?
                            <Badge pill bg="danger" className="ms-4">
                                Banned
                            </Badge>
                            : <></>
                    }
                    <Dropdown drop="start" className="float-end">
                        <Dropdown.Toggle as={CustomToggle}></Dropdown.Toggle>
                        <Dropdown.Menu>
                            <Dropdown.Item href={"/member/profile/" + e.username} onClick={event => handleClick(event, username)}>
                                Profile
                            </Dropdown.Item>
                            <Dropdown.Item href={`message/user/${e.id}`} onClick={(event) => openChatbox(event, e.id)}>Send Message</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </ListGroup.Item>
            })}

        </ListGroup>
    );
}
export default ListFriend;