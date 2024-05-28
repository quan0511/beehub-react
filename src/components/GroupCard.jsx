import React from "react";
import { Button, Card, Col, Image,  Row } from "react-bootstrap";
import { Dot } from "react-bootstrap-icons";
import { Link } from "react-router-dom";
const GroupCard =({group,image})=>{
    const setButton = ()=>{

        if(!group.joined){
            return (<Col xl="4" className="d-flex flex-row justify-content-start align-items-center">
                <Button variant="primary" className="w-50" >Join</Button>
                </Col>);
        }else{
            switch(group.member_role){
                case "MEMBER":
                    return (<Col xl="4" className="d-flex flex-row justify-content-start align-items-center">
                        <Link role="button" className="btn btn-outline-primary w-50" to={"/group/"+group.id} >Visit</Link></Col>);
                case "GROUP_CREATOR":
                    return (<Col xl="4" className="d-flex flex-row justify-content-start align-items-center">
                        <Link role="button" className="btn btn-danger w-50">Manage Group</Link>
                        </Col>);
                case "GROUP_MANAGER":
                    return (<Col xl="4" className="d-flex flex-row justify-content-start align-items-center">
                            <Link role="button"  className="btn btn-danger w-50" >Manage Group</Link>
                        </Col>);
                default:
                    return (<Col xl="4" className="d-flex flex-row justify-content-start align-items-center">
                        <Button variant="outline-secondary" className="me-2" style={{width: "85px"}}>Joined</Button>
                        <Link role="button" className="btn btn-outline-primary"  style={{width: "85px"}}>Visit</Link>
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
                        <Card.Title style={{fontSize: "16px"}}><Link to={"/group/"+group.id} style={{textDecoration: "none", color:"black"}}>{group.groupname}</Link></Card.Title>
                        <Card.Text className="lh-sm" style={{overflow:"hidden",height: "50px",fontSize: "14px"}} >
                            {group.is_public? "Public":"Private"} <Dot className="mx-1"/> {group.member_count} members 
                            <br/>
                            {group.description}                           
                        </Card.Text>
                    </Col>
                    {setButton()}
                </Row>
            </Card.Body>
        </Card>
    );
}
export default GroupCard;