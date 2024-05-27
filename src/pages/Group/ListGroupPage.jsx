import React, { useState, useEffect } from "react";
import APIService from "../../auth/APIService";
import axios from "axios";
import { Badge, Col, Container, Form, InputGroup, Nav, Row, Spinner } from "react-bootstrap";
import GroupCard from "../../components/GroupCard";
import SessionLeft from "../../components/SessionLeft";
import NavigatorBar from "../../components/NavigatorBar";
import { Search } from "react-bootstrap-icons";
const ListGroupPage =({appUser})=>{
    const [select, setSelect]=useState('joined_groups');
    const [loading, setLoading]= useState(true);
    const [ joinedGroups, setJoinedGroups] = useState([]);
    const [ ownGroups, setOwnGroups ] =useState([]);
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
                    {joinedGroups.map((group, index)=>{
                        let urlImage =  group.image_group!=null ? group.image: APIService.URL_REST_API+"/files/group_image.png";
                        return <GroupCard key={index} group={group} image={urlImage}/>
                    })}
                </Col>
             );
            
            case "own_groups":
                return (
                <Col xl={10} className="mx-auto d-flex flex-column text-start">
                    {ownGroups.map((group, index)=>{
                        let urlImage = group.image_group!=null ? group.image: APIService.URL_REST_API+"/files/group_image.png";
                        return  <GroupCard key={index} group={group} image={urlImage}/>
                    })}
                </Col>);
            
            default: 
                return <></>;
        }
    }
    useEffect(()=>{
        axios.get(`${APIService.URL_REST_API}/listgroup_page/1`).then((res)=> {
            setJoinedGroups(res.data["joined_groups"]);
            setOwnGroups(res.data["own_group"]);
        }).finally(()=>{
            setTimeout(()=>{
                setLoading(false);
            },600);
        });
    },[])
    return (
                <Container fluid className='ps-4' style={{marginTop: "60px"}}>
                    <Row>
                        {loading ?
                        <Col>
                            <Spinner animation="border">
                            </Spinner>
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
                                    {/* <Col xl={12} className="mb-3">
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
                                    </Col> */}
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