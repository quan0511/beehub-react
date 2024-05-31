import React, { useEffect, useState } from "react"
import { Badge, Col, Container, Form, InputGroup, Nav, Row, Spinner } from "react-bootstrap"
import SessionLeft from "../components/SessionLeft"
import NavigatorBar from "../components/NavigatorBar"
import PeopleCard from "../components/PeopleCard"
import { Search } from "react-bootstrap-icons"
import APIService from "../features/APIService"
import axios from "axios"
import { useDispatch, useSelector } from "react-redux"
import { selectCurrentUser } from "../auth/authSlice"
import { usePeoplepageQuery } from "../user/userApiSlice"
function PeoplePage(){
    const appUser = useSelector(selectCurrentUser);
    const reset = useSelector((state)=>state.user.reset);
    const {data : people, isLoading, isSuccess } = usePeoplepageQuery({id:appUser.id,reset:reset});
    const [select, setSelect]=useState('suggestions');
    const handleSelectTab = (selectedKey) => {
        setSelect(selectedKey);
    };
    console.log(people);
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
            case "suggestions": 
             return people["people"].map((val,key)=>{
                    let sr = val.image!=null?val.image: (val.gender == "female"? APIService.URL_REST_API+"/files/user_female.png": APIService.URL_REST_API+"/files/user_male.png");
                    return <Col key={key} className="mx-auto mb-3">
                            <PeopleCard img={sr} size="16rem" people={val} />
                        </Col>
                });
            
            case "friends":
                return people["friends"].map((val, key)=>{
                    let sr = val.image!=null?val.image: (val.gender == "female"? APIService.URL_REST_API+"/files/user_female.png": APIService.URL_REST_API+"/files/user_male.png");
                    return <Col key={key} className="mx-auto mb-3">
                            <PeopleCard img={sr} size="16rem" people={val}/>
                        </Col>
                });
            case "send_request": 
                return people["addfriend"].map((val, key)=>{
                    let sr = val.image!=null?val.image: (val.gender == "female"? APIService.URL_REST_API+"/files/user_female.png": APIService.URL_REST_API+"/files/user_male.png");
                    return <Col key={key} className="mx-auto mb-3">
                            <PeopleCard img={sr} size="16rem" people={val} />
                        </Col>
                })
            default: 
                return <></>;
        }
    }
    return (<Container fluid className='ps-4' style={{marginTop: "60px"}}>
                    <Row>
                        {isLoading || !isSuccess ?
                        <Col>
                        <Spinner animation="border">
                        </Spinner>
                        </Col>
                        :
                        <Col xl={12} className="mt-2">
                            <Nav justify  variant="tabs" defaultActiveKey="suggestions" onSelect={handleSelectTab}>
                                <Nav.Item>
                                    <Nav.Link eventKey="suggestions" onClick={handelClick}>Suggestions <Badge bg="primary">{people["people"].length}</Badge></Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                    <Nav.Link eventKey="friends" onClick={handelClick}>Friends <Badge bg="secondary">{people["friends"].length}</Badge></Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                    <Nav.Link eventKey="send_request" onClick={handelClick}>Sent Request <Badge bg="secondary">{people["addfriend"].length}</Badge></Nav.Link>
                                </Nav.Item>
                            </Nav>
                            <hr/>
                            <Container fluid>
                                <Row xl={4}>
                                    <Col xl={12} className="mb-3">
                                    <Form >
                                        <InputGroup >
                                            <InputGroup.Text  style={{borderRight: 0,backgroundColor: "#ffffff"}}>
                                                <Search />
                                            </InputGroup.Text>
                                            <Form.Control style={{borderLeft: 0}} 
                                                placeholder="Search"
                                                aria-describedby="basic-addon2"
                                            />
                                        </InputGroup>
                                    </Form>
                                    </Col>
                                    {handleSelect()}
                                    
                                </Row>
                            </Container>
                        </Col>
                        }
                    </Row>
                </Container>
    );
}
export default PeoplePage;