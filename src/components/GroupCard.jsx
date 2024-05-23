import React from "react";
import { Button, Card, Col, Image,  Row } from "react-bootstrap";
import { Dot } from "react-bootstrap-icons";
import { Link } from "react-router-dom";
const GroupCard =({id,image, groupname, description, is_public, joined, member_count})=>{
    return (
        <Card  className="mb-2">
            <Card.Body >
                <Row style={{height: "80px"}}>
                    <Col xl={2} className="row">
                        <Image src={image} className="mx-auto" style={{height: "80px",width: "80px", objectFit: "contain"}} roundedCircle />
                    </Col>
                    <Col xl={8}>
                        <Card.Title style={{fontSize: "16px"}}><Link to={"/"+id} style={{textDecoration: "none", color:"black"}}>{groupname}</Link></Card.Title>
                        <Card.Text style={{overflow:"hidden",height: "50px"}} >
                            <p className="lh-sm" style={{fontSize: "14px"}}>{is_public? "Public":"Private"} <Dot className="mx-1"/> {member_count} members 
                            <br/>
                            {description}
                            </p>                            
                        </Card.Text>
                    </Col>
                    <Col xl="2" className="d-flex flex-column justify-content-center align-items-center">
                        {
                            joined ? 
                            <Button variant="primary" className="w-100 fw-bold" >Joined</Button>
                            : <Button variant="outline-primary" className="w-100 fw-bold" >Join</Button>
                        }
                        
                    </Col>
                </Row>
            </Card.Body>
        </Card>
    );
}
export default GroupCard;