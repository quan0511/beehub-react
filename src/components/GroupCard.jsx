import React from "react";
import { Button, Card, Col, Form, Image,  Row } from "react-bootstrap";
import { Dot } from "react-bootstrap-icons";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { selectCurrentToken, selectCurrentUser } from "../auth/authSlice";
import APIService from "../features/APIService";
import { refresh } from "../features/userSlice";
const GroupCard =({group,image})=>{
    const appUser = useSelector(selectCurrentUser);
    const token = useSelector(selectCurrentToken);
    const dispatch = useDispatch();
    const reset = useSelector((state)=>state.user.reset);
    
    const handleButton= async(typeClick)=>{
        let resp = await APIService.createRequirement(appUser.id, {sender_id: appUser.id, group_id: group.id, type: typeClick },token);
        if(resp.result != 'unsuccess'|| resp.result !="error"){
            dispatch(refresh())
        }
    }
    const setButton = ()=>{
        if(group.joined==null){
            return (<Col xl="4"lg={4} md={4} sm={4} xs={5} className="d-flex flex-row justify-content-start align-items-center">
                <Button variant="primary" onClick={()=>{handleButton("JOIN")}} >Join</Button>
                </Col>);
        }else if(group.joined =='send request'){
            return (<Col xl="4" lg={4} md={4} sm={4} xs={5} className="d-flex flex-row justify-content-start align-items-center">
                    <Button variant="warning"  onClick={()=>{handleButton("CANCEL_JOIN")}} >Cancel Request</Button>
                    </Col>);
        }else{
            switch(group.member_role){
                case "MEMBER":
                    return (<Col xl="4" lg={4} md={4}sm={4}xs={5} className="d-flex flex-row justify-content-start align-items-center">
                        <Link role="button" className="btn btn-outline-primary w-50" to={"/group/"+group.id} >Visit</Link></Col>);
                case "GROUP_CREATOR":
                    if(!group.active){
                        return (
                            <Col xl="4" lg={4} md={4} sm={4} xs={5}className="d-flex flex-row justify-content-start align-items-center">
                                <Form.Select aria-label="Setting Phone number"  onChange={()=>{handleButton("TOGGLE_ACTIVE_GROUP",appUser.id)}} >
                                    <option value="true">Active</option>
                                    <option value="false">Deactive</option>
                                </Form.Select>
                            </Col>
                        );
                    }
                    return (<Col xl="4" lg={4} md={4} sm={4}xs={5}className="d-flex flex-row justify-content-start align-items-center">
                        <Link role="button" to={"/group/manage/"+group.id}  className="btn btn-danger">Manage Group</Link>
                        </Col>);
                case "GROUP_MANAGER":
                    return (<Col xl="4" lg={4} md={4} sm={4}xs={5}className="d-flex flex-row justify-content-start align-items-center">
                            <Link role="button" to={"/group/manage/"+group.id}  className="btn btn-danger" >Manage Group</Link>
                        </Col>);
                default:
                    return (<Col xl="4" lg={4} md={4} sm={4}xs={5}className="d-flex flex-row justify-content-start align-items-center">
                            <Button variant="outline-secondary" className="me-2" style={{width: "85px"}} onClick={()=>{handleButton("OUT_GROUP")}}>Joined</Button>
                            <Link role="button" className="btn btn-outline-primary" to={"/group/"+group.id} style={{width: "85px"}}>Visit</Link>
                        </Col>);
            }
        } 
        
    }
    return (
        <Card className="mb-2 p-1 group-card">
            <Card.Body >
                <Row >
                    <Col xl={2} lg={2} md={2} sm={2} xs={2} className="row">
                        <Image src={image} className="mx-auto" style={{height: "80px",width: "80px", objectFit: "contain"}} roundedCircle />
                    </Col>
                    <Col xl={6} lg={6} md={6} sm={6} xs={5}>
                        <div style={{fontSize: "16px", fontWeight: "bold"}}><Link to={"/group/"+group.id} style={{textDecoration: "none", color:"black"}}>{group.groupname}</Link></div>
                        <div className="lh-sm" style={{overflow:"hidden",height: "50px",fontSize: "14px"}} >
                            {group.is_public? "Public":"Private"} <Dot className="mx-1"/> {group.member_count} members 
                            <br/>
                            {group.description}                           
                        </div>
                    </Col>
                    {setButton()}
                </Row>
            </Card.Body>
        </Card>
    );
}
export default GroupCard;