import React from "react";
import { Button, Card, Image, ListGroup } from "react-bootstrap";
import { Link } from "react-router-dom";
function PeopleCard({img,name, username, groups,friends,size, relationship}){
    return (
        <Card className="people-card" style={{ width: size,padding: "10px 15px" ,transition: "box-shadow .3s"}}>
            <Card.Body className="m-0 py-3 px-0">
                <Link to={"/profile/member/"+username}>
                    <Image src={img} width={200} height={200} roundedCircle  />
                </Link>
                <Card.Title className="mt-3">{name}</Card.Title>
                    <ListGroup horizontal>
                        <ListGroup.Item className="w-50 border-0">
                            <p className="text-center">{friends}<span className="d-block text-black-50">Friends</span></p>
                        </ListGroup.Item>
                        <ListGroup.Item className="w-50 border-0">
                            <p className="text-center">{groups}<span  className="d-block text-black-50">Groups</span></p>
                        </ListGroup.Item>
                    </ListGroup>
                {
                    relationship ==null?
                    <Button variant="primary" className="w-100 rounded-pill" >Add Friend</Button>
                    :("BLOCKED" === relationship? 
                    <Button variant="danger" className="w-100 rounded-pill" >Unblock</Button>  
                     :<Button variant="outline-primary" className="w-100 rounded-pill" >View Friend Profile</Button>
                    )
                }
            </Card.Body>
        </Card>
    );
}
export default PeopleCard;