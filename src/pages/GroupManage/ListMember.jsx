import React from "react";
import { Button, Col, Form, Image, InputGroup, Row } from "react-bootstrap";
import { Search } from "react-bootstrap-icons";
import APIService from "../../features/APIService";
import { Link } from "react-router-dom";

export const ListMember = ({handleButton,members})=>{

    return (
        <div className="d-flex flex-column">
            <h3>List members in groups</h3>
            <hr/>
            <InputGroup>
                <InputGroup.Text id="basic-addon2" style={{borderRight: 0, borderTopLeftRadius: "50rem", borderBottomLeftRadius: "50rem",backgroundColor: "#ffffff"}}>
                    <Search />
                </InputGroup.Text>
                <Form.Control style={{borderLeft: 0 , borderTopRightRadius: "50rem", borderBottomRightRadius: "50rem"}} 
                    placeholder="Search"
                    aria-describedby="basic-addon2"
                />
            </InputGroup>
            <div className="my-3" style={{borderTop: "2px solid grey"}}>
                {members.map((mem,index)=> {
                        let urlImg = mem.user_image!=null ?mem.user_image :( mem.user_gender=='female'? `${APIService.URL_REST_API}/files/user_female.png`:`${APIService.URL_REST_API}/files/user_male.png`);
                        return <Row key={index} className="my-3 pb-3 " style={{borderBottom: "1px solid grey"}}>
                            <Col xl={6} lg={6} md={6}>
                                <Image src={urlImg} style={{width:"60px",height: "60px",marginRight: "20px"}}roundedCircle />
                                <Link to={"/member/profile/"+mem.username} className="fw-bold text-decoration-none text-dark">{mem.user_fullname}</Link>
                            </Col>
                            <Col xl={6} lg={6} md={6} className="d-flex flex-row justify-content-end align-items-center">
                                <Button variant="outline-danger" onClick={()=> handleButton("KICK",mem.user_id)} >Kick out</Button>
                                <Button variant="outline-success ms-3" onClick={()=> handleButton("SET_MANAGER",mem.user_id)} >Set to Group Manager</Button>
                            </Col>
                        </Row>
                    })}
            </div>
        </div>
    );
}