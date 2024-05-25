import React from "react";
import { Button, Card, Col, Image,  Row } from "react-bootstrap";
import { Dot } from "react-bootstrap-icons";
import { Link } from "react-router-dom";
const GroupCard =({id,image, groupname, description, is_public, joined, member_count, role})=>{
    const setButton = ()=>{
        if(!joined){
            return (<Col xl="4" className="d-flex flex-row justify-content-start align-items-center">
                <Button variant="primary" style={{width: "85px"}} >Join</Button>
                </Col>);
        }else{
            switch(role){
                case "MEMBER":
                    return (<Col xl="4" className="d-flex flex-row justify-content-start align-items-center"><Button variant="outline-primary" className="w-50" >Visit</Button></Col>);
                case "GROUP_CREATOR":
                    return (<Col xl="4" className="d-flex flex-row justify-content-start align-items-center">
                        <Button variant="danger"  className="w-50">Manage Group</Button>
                        </Col>);
                case "GROUP_MANAGER":
                    return (<Col xl="4" className="d-flex flex-row justify-content-start align-items-center">
                        <Button variant="danger" className="w-50" >Manage Group</Button>
                        </Col>);
                default:
                    return (<Col xl="4" className="d-flex flex-row justify-content-start align-items-center">
                        <Button variant="outline-secondary" className="me-2" style={{width: "85px"}}>Joined</Button>
                        <Button variant="outline-primary" style={{width: "85px"}}>Visit</Button>
                        </Col>);
            }
        } 
        
    }
    return (
        <Card className="mb-2 p-1">
            <Card.Body >
                <Row style={{height: "80px"}}>
                    <Col xl={2} className="row">
                        <Image src={image} className="mx-auto" style={{height: "80px",width: "80px", objectFit: "contain"}} roundedCircle />
                    </Col>
                    <Col xl={6}>
                        <Card.Title style={{fontSize: "16px"}}><Link to={"/"+id} style={{textDecoration: "none", color:"black"}}>{groupname}</Link></Card.Title>
                        <Card.Text className="lh-sm" style={{overflow:"hidden",height: "50px",fontSize: "14px"}} >
                            {is_public? "Public":"Private"} <Dot className="mx-1"/> {member_count} members 
                            <br/>
                            {description}                           
                        </Card.Text>
                    </Col>
                    {setButton()}
                </Row>
            </Card.Body>
        </Card>
    );
}
export default GroupCard;