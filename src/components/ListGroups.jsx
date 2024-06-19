import React from "react";
import { Dropdown, Image, ListGroup } from "react-bootstrap";
import APIService from "../features/APIService";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { openChat, setChat } from "../messages/chatboxSlice";
import { ThreeDots } from "react-bootstrap-icons";

const CustomToggle = React.forwardRef(({ onClick }, ref) => (
    <ThreeDots style={{ cursor: 'pointer' }} ref={ref} onClick={(e) => {
        e.stopPropagation();
        onClick(e);
    }} />
));

function ListGroups({ groups, onClose }) {

    const navigate = useNavigate();
    const dispatch = useDispatch()

    const handleClick = (event, groupId) => {
        event.preventDefault()
        navigate("/group/" + groupId)
        onClose()
    }

    const openChatbox = (event, id, name, avatar) => {
        event.preventDefault()
        dispatch(setChat({
            id,
            isGroup: true,
            name,
            avatar
        }))
        dispatch(openChat())
        onClose()
    }

    return (
        <ListGroup className=" w-100" >
            {groups.map((group, index) => {
                let groupImage = group.image_group ?? APIService.URL_REST_API + "/files/group_image.png"
                return (
                    <ListGroup.Item onClick={(event) => openChatbox(event, group.id, group.groupname, groupImage)} key={index} className='text-start p-2 border-bottom-1 border-start-0 border-end-0 border-top-0'  style={{cursor: 'pointer'}}>
                        <Image src={groupImage} style={{ marginRight: "15px", width: "37px", height: "37px" }} roundedCircle />
                        <span>{group.groupname}</span>

                        <Dropdown drop="start" className="float-end">
                            <Dropdown.Toggle as={CustomToggle}></Dropdown.Toggle>
                            <Dropdown.Menu>
                                <Dropdown.Item href={"/group/" + group.id} onClick={event => handleClick(event, group.id)}>
                                    Group Page
                                </Dropdown.Item>
                                <Dropdown.Item href={`message/group/${group.id}`} onClick={(event) => openChatbox(event, group.id, group.groupname, groupImage)}>Send Message</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    </ListGroup.Item>
                );
            })}
        </ListGroup>
    );
}
export default ListGroups;