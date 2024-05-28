import React, { useState } from "react";
import { Badge, Button, Col, Container, Form, Image, InputGroup, Row } from "react-bootstrap";
import { Ban, EyeFill, Messenger, Plus, Search, ThreeDots } from "react-bootstrap-icons";
import APIService from "../../auth/APIService";
import { Link } from "react-router-dom";
function GroupPeople({appUser, members}){
    console.log(members);
    const getButton = (mem)=>{
        if(mem.username == appUser.username){
            return <></>
        }
        switch(mem.relationship){
            case "FRIEND":
                return <Link to={"/member/profile/"+mem.username} role="button" className="btn btn-outline-primary" >
                    <EyeFill/> View Profile
                </Link>
            case "BLOCKED": 
                return <Button variant="secondary" disabled ><Ban/> Blocked</Button>
            default:
                return <Button variant="primary" ><Plus/> Add Friend</Button>
        }
    }
    return <Container>
        <Row style={{paddingBottom: "80px"}}>
            <Col xl={6} className="mx-auto">
                <div className="border-1 rounded-2 border p-3 text-start" style={{marginTop: "200px", boxShadow: "rgba(0, 0, 0, 0.03) 0px 1px 2px, rgba(0, 0, 0, 0.03) 0px 2px 4px, rgba(0, 0, 0, 0.03) 0px 4px 8px, rgba(0, 0, 0, 0.03) 0px 8px 16px, rgba(0, 0, 0, 0.03) 0px 16px 32px, rgba(0, 0, 0, 0.03) 0px 32px 64px"}}>
                    <p>
                        <b>Members  </b>· {members.length}
                    </p>
                    <Form  >
                        <InputGroup >
                            <InputGroup.Text id="basic-addon2" style={{borderRight: 0, borderTopLeftRadius: "50rem", borderBottomLeftRadius: "50rem",backgroundColor: "#ffffff"}}>
                                <Search />
                            </InputGroup.Text>
                            <Form.Control style={{borderLeft: 0 , borderTopRightRadius: "50rem", borderBottomRightRadius: "50rem"}} 
                                placeholder="Search"
                                aria-describedby="basic-addon2"
                            />
                        </InputGroup>
                    </Form>
                    <div className="p-2 my-3 d-flex flex-row justify-content-between align-items-center"  style={{borderTop: "2px solid grey",borderBottom: "2px solid grey"}}>
                        <div>
                            {appUser.image!=null?
                             <Image src={appUser.image} style={{width:"60px",height: "60px",marginRight: "20px"}} roundedCircle />
                            :(appUser.gender=='female'? <Image src={APIService.URL_REST_API+"/files/user_female.png"} style={{width:"60px",height: "60px",marginRight: "20px"}} roundedCircle />:
                            <Image src={APIService.URL_REST_API+"/files/user_male.png"} style={{width:"60px",height: "60px",marginRight: "20px"}} roundedCircle />)
                            }
                            <b>{appUser.fullname}</b>
                        </div>
                        <Button variant="secondary">
                            <ThreeDots/>
                        </Button>
                    </div>
                    <div className="mb-3">
                        <p><b>Group managers · {members.filter((manager)=>manager.role=='GROUP_CREATOR' || manager.role=="GROUP_MANAGER").length} </b></p>
                        {members.filter((manager)=>manager.role=='GROUP_CREATOR' || manager.role=="GROUP_MANAGER").map((user,index)=>{
                            let urlImg = user.user_image!=null ?user.user_image :( user.user_gender=='female'? `${APIService.URL_REST_API}/files/user_female.png`:`${APIService.URL_REST_API}/files/user_male.png`);
                            return <Row key={index} className="mb-3">
                                <Col xl={2}>
                                    <Image src={urlImg} style={{width:"60px",height: "60px",marginRight: "20px"}}roundedCircle />
                                </Col>
                                <Col xl={6} style={{lineHeight: "0.1"}}>
                                    <p className="fw-bold">{user.user_fullname}</p>
                                    {user.role == 'GROUP_CREATOR'?
                                    <Badge bg="danger">Group Creator</Badge>
                                    :<Badge bg="primary">Group Manager</Badge>
                                    }
                                </Col>
                                <Col className="ms-auto text-end">
                                    {getButton(user)}
                                </Col>
                            </Row>
                        })}
                    </div>
                    <div className="mb-3" style={{borderTop: "2px solid grey"}}>
                        <p><b>Members </b>· {members.filter((user)=>user.role=="MEMBER").length} </p>
                        {
                            members.filter((user)=>user.role=='MEMBER').map((user,index)=>{
                                let urlImg = user.user_image!=null ?user.user_image :( user.user_gender=='female'? `${APIService.URL_REST_API}/files/user_female.png`:`${APIService.URL_REST_API}/files/user_male.png`);
                                return <div className="mb-3 d-flex flex-row  justify-content-between align-items-center">
                                <div>
                                    <Image src={urlImg} style={{width:"60px",height: "60px",marginRight: "20px"}}roundedCircle />
                                    <b>{user.user_fullname}</b>
                                </div>
                                {getButton(user)}
                            </div>
                            })
                        }
                        
                    </div>
                </div>
            </Col>
        </Row>
    </Container>;
}
export default GroupPeople;