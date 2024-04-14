import React, { useState } from "react"
import { Badge, Col, Container, Form, InputGroup, Nav, Row } from "react-bootstrap"
import SessionLeft from "../SessionLeft/SessionLeft"
import NavigatorBar2 from "../navigation_bar/NavigatorBar2"
import PeopleCard from "../PeopleCard/PeopleCard"
import { Search } from "react-bootstrap-icons"
function PeoplePage(){
    const [select, setSelect]=useState('friends');
    const handleSelectTab = (selectedKey) => {
        setSelect(selectedKey);
      };
    let friends = [
        {
            name: "Fu Xuan",
            image: "fuxuan3.png",
            groups: 24,
            friends: 2
        },{
            name: "Jingliu",
            image: "jingliu.png",
            groups: 0,
            friends: 1
        },{
            name: "Mr Tail",
            image: "huohuo-6.png",
            groups : 2,
            friends: 10
        },{
            name: "Black Swan",
            image: "bw-1.png",
            groups : 12,
            friends: 30
        }
    ];
    let following = [
        {
            name: "Acheron",
            image: "Acheron_1.png",
            groups: 0,
            friends: 0
        },{
            name: "Ruan Mei",
            image: "Ruan Mei_2.png",
            groups: 1,
            friends: 0
        },{
            name: "Furina",
            image: "Furina_4.png",
            groups : 23,
            friends: 112
        },{
            name: "Black Swan",
            image: "bw-2.png",
            groups : 12,
            friends: 3
        },{
            name: "Fu Xuan",
            image: "fuxuan1.png",
            groups : 1,
            friends: 33
        },{
            name: "Arlecchino",
            image: "arlecchino_1.png",
            groups : 1,
            friends: 10
        }
    ];
    let follower=[
        {
            name: "Acheron 2",
            image: "Acheron_2.png",
            groups: 0,
            friends: 2
        },{
            name: "FuRina ",
            image: "Furina_5.png",
            groups: 10,
            friends: 23
        },{
            name: "Ruan Mei",
            image: "Ruan Mei_4.png",
            groups: 0,
            friends: 2
        },
    ]
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
            case "friends": 
             return friends.map((val,key)=>{
                    let sr = String.raw`\assets\images\user\\`+val.image;
                    return <Col key={key} className="mx-auto mb-3">
                            <PeopleCard img={sr} size="16rem" name={val.name} groups={val.groups} friends={val.friends}/>
                        </Col>
                });
            
            case "following":
                return following.map((val, key)=>{
                    let sr = String.raw`\assets\images\user\\`+val.image;
                    return <Col key={key} className="mx-auto mb-3">
                            <PeopleCard img={sr} size="16rem" name={val.name} groups={val.groups} friends={val.friends}/>
                        </Col>
                });
            case "follower": 
                return follower.map((val, key)=>{
                    let sr = String.raw`\assets\images\user\\`+val.image;
                    return <Col key={key} className="mx-auto mb-3">
                            <PeopleCard img={sr} size="16rem" name={val.name} groups={val.groups} friends={val.friends}/>
                        </Col>
                })
            default: 
                return <></>;
        }
    }
    return (

        <Row>
            <Col xl={3} className='p-0 ' >
              <SessionLeft />
            </Col>
            <Col xl={9} className='p-0'>
              <div className='d-flex flex-column'>
                <NavigatorBar2 />
                <Container fluid className='ps-4' style={{marginTop: "60px"}}>
                    <Row>
                        <Col xl={12} className="mt-2">
                            <Nav justify  variant="tabs" defaultActiveKey="friends" onSelect={handleSelectTab}>
                                <Nav.Item>
                                    <Nav.Link eventKey="friends" onClick={handelClick}>Friends <Badge bg="primary">{friends.length}</Badge></Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                    <Nav.Link eventKey="following" onClick={handelClick}>Following <Badge bg="secondary">{following.length}</Badge></Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                    <Nav.Link eventKey="follower" onClick={handelClick}>Followers <Badge bg="secondary">{follower.length}</Badge></Nav.Link>
                                </Nav.Item>
                            </Nav>
                            <hr/>
                            <Container fluid>
                                <Row xl={4}>
                                    <Col xl={12} className="mb-3">
                                    <Form inline>
                                        <InputGroup >
                                            <InputGroup.Text id="basic-addon2" style={{borderRight: 0,backgroundColor: "#ffffff"}}>
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
                        <Col>
                        </Col>
                    </Row>
                </Container>
              </div>
            </Col>
        </Row>
    );
}
export default PeoplePage;