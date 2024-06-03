import React, { useState, useEffect } from "react";
import APIService from "../../features/APIService";
import axios from "axios";
import { Badge, Col, Container, Form, InputGroup, Nav, Row, Spinner } from "react-bootstrap";
import GroupCard from "../../components/GroupCard";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../../auth/authSlice";
import { useListgroupQuery } from "../../features/userApiSlice";
import BeehubSpinner from "../../components/BeehubSpinner";
const ListGroupPage =()=>{
    const appUser = useSelector(selectCurrentUser);
    const reset = useSelector((state)=>state.user.reset);
    const {data: data, isLoading, isSuccess} = useListgroupQuery({id: appUser!=null? appUser.id: 1,reset:reset});
    const [select, setSelect]=useState('joined_groups');
    const handleSelectTab = (selectedKey) => {
        setSelect(selectedKey);
    };
    const handelClick=(e)=>{
        const badge= e.target.querySelector(".badge");
        const otherbadge =document.querySelectorAll('.badge');
        if(badge!=null){
            otherbadge.forEach((ba)=>{
                if(ba.classList.contains("bg-primary")){
                    ba.classList.toggle("bg-primary");
                    ba.classList.toggle("bg-secondary");
                };
            });
            badge.classList.toggle('bg-secondary');
            badge.classList.toggle('bg-primary');
        }
    }
    const handleSelect= ()=>{
        switch(select){
            case "joined_groups": 
             return (
                <Col xl={10} className="mx-auto d-flex flex-column text-start">
                    {data["joined_groups"].map((group, index)=>{
                        let urlImage =  group.image_group!=null ? group.image: APIService.URL_REST_API+"/files/group_image.png";
                        return <GroupCard key={index} group={group} image={urlImage}/>
                    })}
                </Col>
             );
            
            case "own_groups":
                return (
                <Col xl={10} className="mx-auto d-flex flex-column text-start">
                    {data["own_group"].map((group, index)=>{
                        let urlImage = group.image_group!=null ? group.image: APIService.URL_REST_API+"/files/group_image.png";
                        return  <GroupCard key={index} group={group} image={urlImage}/>
                    })}
                </Col>);
            
            default: 
                return <></>;
        }
    }
    // return <></>
    return (
        <Container fluid className='ps-4' style={{marginTop: "60px"}}>
            <Row>
                {isLoading ||!isSuccess ?
                <Col xl={4} className="mx-auto" style={{marginTop:"300px"}}>
                    {BeehubSpinner()}
                </Col>
                :
                <Col xl={12} className="mt-2">
                    <Nav justify  variant="tabs" defaultActiveKey="joined_groups" onSelect={handleSelectTab}>
                        <Nav.Item>
                            <Nav.Link eventKey="joined_groups" onClick={handelClick}>All Groups <Badge bg="primary"></Badge></Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link eventKey="own_groups" onClick={handelClick}>Ownership Groups <Badge bg="secondary"></Badge></Nav.Link>
                        </Nav.Item>
                    </Nav>
                    <hr/>
                    <Container fluid>
                        <Row xl={4}>
                            {handleSelect()}
                        </Row>
                    </Container>
                </Col>
                }
            </Row>
        </Container>
    );
}
export default ListGroupPage;