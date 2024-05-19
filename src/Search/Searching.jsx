import React, { useState } from "react"
import SearchFriends from "./SearchFriends/SearchFriends"
import SessionLeft from "../SessionLeft/SessionLeft"
import { Badge, Col, Container, Nav, Row } from "react-bootstrap"
import NavigatorBar from "../navigation_bar/NavigatorBar"
import SearchGroups from "./SearchGroups/SearchGroups"
import SearchForums from "./SearchForums/SearchForums"
function Searching(){
    const [page,setPage]=useState('friend');
    const handleSelectTab = (selectedKey) => {
      setPage(selectedKey);
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
    const section = ()=>{
        let res = <></>;
        switch (page){
            case "friend":
                res = <SearchFriends/>
                    break;
            case "group":
                 res = <SearchGroups/>;
                break;
            case "forum":
                res= <SearchForums/>;
                break;
            case "blog":
                res= <><h2>Blogs</h2></>;
                break;
        }
        
        return res;
    }
    return (
        <Row>
            <Col xl={3} lg={2} className='p-0 d-md-none d-lg-block' >
              <SessionLeft />
            </Col>
            <Col xl={9} lg={10} className='p-0'>
              <div className='d-flex flex-column'>
                <NavigatorBar />
                <Container fluid className='ps-4' style={{marginTop: "60px"}}>
                    <Row>
                        <Col xl={10} md={12} className="mt-2">
                            <Nav justify  variant="tabs" defaultActiveKey="friend" onSelect={handleSelectTab}>
                                <Nav.Item>
                                    <Nav.Link eventKey="friend" onClick={handelClick}>Friends <Badge bg="primary">3</Badge></Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                    <Nav.Link eventKey="group" onClick={handelClick}>Groups <Badge bg="secondary">10</Badge></Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                    <Nav.Link eventKey="forum" onClick={handelClick}>Forums <Badge bg="secondary">3</Badge></Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                    <Nav.Link eventKey="blog" onClick={handelClick}>Blogs <Badge bg="secondary">33</Badge></Nav.Link>
                                </Nav.Item>
                            </Nav>
                            <hr/>
                            <Container fluid>
                                {section()}
                            </Container>
                        </Col>
                        <Col>
                        </Col>
                    </Row>
                </Container>
              </div>
            </Col>
        </Row>
    );
}

export default Searching;