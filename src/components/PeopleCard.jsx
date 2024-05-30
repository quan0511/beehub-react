import React from "react";
import { Button, Card, Image, ListGroup } from "react-bootstrap";
import { Link } from "react-router-dom";
import APIService from "../features/APIService";
import { useSelector } from "react-redux";
import { selectCurrentToken, selectCurrentUser } from "../auth/authSlice";
function PeopleCard({img,name, user_id,username, groups,friends,size, relationship}){
    const appUser = useSelector(selectCurrentUser);
    const token = useSelector(selectCurrentToken);
    const handleClick= async (typeClick)=>{
        let resp = await APIService.createRequirement(appUser.id, {sender_id: appUser.id, receiver_id:user_id, type: typeClick },token);
        window.location.reload();
    }
    const setButton = () => {
        switch(relationship){
            case "BLOCKED":
                return <Button variant="danger" className="w-100 rounded-pill" onClick={()=>{handleClick("UN_BLOCK");}}>Unblock</Button>
            case "FRIEND": 
                return <Link role="button" className="btn btn-outline-secondary w-100 rounded-pill" to={"/member/profile/"+username}>View</Link>
            case "SENT_REQUEST":
                return <Button variant="outline-warning"className="w-100 rounded-pill" onClick={()=>{ handleClick("CANCEL_REQUEST")}}>Cancel Request</Button>
            case "NOT_ACCEPT":
                return <Button variant="outline-success" className="w-100 rounded-pill" onClick={()=>{ handleClick("ACCEPT")}}>Accept</Button>
            default:
                return <Button variant="primary" className="w-100 rounded-pill" onClick={()=>{ handleClick("ADD_FRIEND")}}>Add Friend</Button>
        }
    }
    return (
        <Card className="people-card" style={{ width: size,padding: "10px 15px" ,transition: "box-shadow .3s"}}>
            <Card.Body className="m-0 py-3 px-0">
                <Link to={"/member/profile/"+username}>
                    <Image src={img} width={200} height={200} roundedCircle  />
                </Link>
                <Card.Title className="mt-3"><Link className="text-decoration-none text-black" to={"/member/profile/"+username}>{name}</Link></Card.Title>
                    <ListGroup horizontal>
                        <ListGroup.Item className="w-50 border-0">
                            <p className="text-center">{friends}<span className="d-block text-black-50">Friends</span></p>
                        </ListGroup.Item>
                        <ListGroup.Item className="w-50 border-0">
                            <p className="text-center">{groups}<span  className="d-block text-black-50">Groups</span></p>
                        </ListGroup.Item>
                    </ListGroup>
                {
                    setButton()
                }
            </Card.Body>
        </Card>
    );
}
export default PeopleCard;