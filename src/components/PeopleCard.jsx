import React from "react";
import { Button, Card, Image, ListGroup } from "react-bootstrap";
import { Link } from "react-router-dom";
import APIService from "../features/APIService";
import { useDispatch, useSelector } from "react-redux";
import { selectCurrentToken, selectCurrentUser } from "../auth/authSlice";
import { refresh } from "../features/userSlice";
import { Ban} from "react-bootstrap-icons"
function PeopleCard({img,people, size}){
    const appUser = useSelector(selectCurrentUser);
    const token = useSelector(selectCurrentToken);
    const dispatch = useDispatch();
    const handleClick= async (typeClick)=>{
        let resp = await APIService.createRequirement(appUser.id, {sender_id: appUser.id, receiver_id:people.id, type: typeClick },token);
        if(resp.result != 'unsuccess'|| resp.result !="error"){
            dispatch(refresh());
        }
    }
    const setButton = () => {
        if(people._banned){
            return <></>;
        }
        switch(people.typeRelationship){
            case "BLOCKED":
                return <Button variant="danger" className="w-100 rounded-pill" onClick={()=>{handleClick("UN_BLOCK");}}>Unblock</Button>
            case "FRIEND": 
                return <Link role="button" className="btn btn-outline-secondary w-100 rounded-pill" to={"/member/profile/"+people.username}>View</Link>
            case "SENT_REQUEST":
                return <Button variant="outline-warning"className="w-100 rounded-pill" onClick={()=>{ handleClick("CANCEL_REQUEST")}}>Cancel Request</Button>
            case "NOT_ACCEPT":
                return <Button variant="outline-success" className="w-100 rounded-pill" onClick={()=>{ handleClick("ACCEPT")}}>Accept</Button>
            default:
                return <Button variant="primary" className="w-100 rounded-pill" onClick={()=>{ handleClick("ADD_FRIEND")}}>Add Friend</Button>
        }
    }
    return (
        <Card className="people-card h-100" style={{ padding: "10px 15px" ,transition: "box-shadow .3s"}}>
            <Card.Body className="m-0 py-3 px-0 text-center d-flex flex-column">
                <Link to={"/member/profile/"+people.username} 
                style={{height:'200px'}}
                >
                    <Image src={img}  roundedCircle fluid style={{objectFit:"cover", height:'200px',width:"200px"}}  />
                </Link>
                <div className="my-2" style={{height:"30px"}}>
                    <Link className="text-decoration-none text-black d-flex flex-row justify-content-center align-items-center" to={"/member/profile/"+people.username}>
                        <span className="h4">{people.fullname}</span> 
                    {people._banned?
                    <Ban color="red" className="ms-3 my-auto" scale={0.8}/>
                    :<></>
                    }
                    </Link>
                </div>
                <ListGroup horizontal>
                    <ListGroup.Item className="w-50 border-0 people-count">
                        <p className="text-center">{people.friend_counter}<span className="d-block text-black-50">Friends</span></p>
                    </ListGroup.Item>
                    <ListGroup.Item className="w-50 border-0 people-count">
                        <p className="text-center">{people.group_counter}<span  className="d-block text-black-50">Groups</span></p>
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