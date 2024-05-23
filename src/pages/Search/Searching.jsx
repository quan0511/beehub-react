import React, { useEffect, useState } from "react"
import { Badge, Col, Container, Nav, Row, Spinner} from "react-bootstrap"

import SearchGroups from "./SearchGroups"
import SearchPeople from "./SearchPeople"
import SearchPosts from "./SearchPost"
import axios from "axios"
import { ThreeDots} from "react-bootstrap-icons"
import APIService from "../../auth/APIService"

function Searching({search, loading, setLoading}){
    const [tab,setTab]=useState('post');
    const handleSelectTab = (selectedKey) => {
      setTab(selectedKey);
    };
    const [resultOfSearch, setResultOfSearch]= useState({
        posts: [],
        people: [],
        groups: []
    });
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
    useEffect(()=>{
        axios.get(`${APIService.URL_REST_API}/user/1/search_all?search=${search}`).then((res)=>{
            setResultOfSearch(res.data);
        })
    },[search])
    const section = ()=>{
        let res = <></>;
        switch (tab){
            case "post":
                res = <SearchPosts posts={resultOfSearch.posts}/>
                break;
            case "friend":
                res = <SearchPeople people={resultOfSearch.people} />
                break;
            case "group":
                 res = <SearchGroups groups={resultOfSearch.groups}/>;
                break;
            default:
                res = <SearchPosts posts={resultOfSearch.posts}/>
                break;
        }
        
        return res;
    }
    
    return (
        <Row>
            <Col xl={10} md={12} className="mt-2">
                <Nav justify  variant="tabs" defaultActiveKey="post" onSelect={handleSelectTab}>
                <Nav.Item>
                        <Nav.Link eventKey="post" onClick={handelClick}>Posts <Badge bg="primary">{loading? <ThreeDots />:resultOfSearch.posts.length}</Badge></Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link eventKey="friend" onClick={handelClick}>Friends <Badge bg="primary">{loading? <ThreeDots />:resultOfSearch.people.length}</Badge></Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link eventKey="group" onClick={handelClick}>Groups <Badge bg="secondary">{loading? <ThreeDots />:resultOfSearch.groups.length}</Badge></Nav.Link>
                    </Nav.Item>
                </Nav>
                <hr/>
                <Container fluid>
                    {loading? 
                        <div className='d-flex flex-column justify-content-center align-items-center'>
                        <Spinner animation="border"  role="status">
                            <span className="visually-hidden">Loading...</span>
                        </Spinner></div>
                    :section()}
                </Container>
            </Col>
            <Col>
            </Col>
        </Row>
    );
}

export default Searching;