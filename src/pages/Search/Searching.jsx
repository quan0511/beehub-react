import React, { useEffect, useState } from "react"
import { Badge, Col, Container, Nav, Row, Spinner} from "react-bootstrap"

import SearchGroups from "./SearchGroups"
import SearchPeople from "./SearchPeople"
import SearchPosts from "./SearchPost"
import axios from "axios"
import { ThreeDots} from "react-bootstrap-icons"
import { useSelector } from "react-redux"
import { useSearchParams } from "react-router-dom"
import { selectCurrentUser } from "../../auth/authSlice"
import { useSearchingQuery } from "../../user/userApiSlice"

function Searching(){
    const appUser = useSelector(selectCurrentUser);
    const [searchStr, setSearchStr] = useSearchParams();
    let {data: resultSearch,isLoading,isSuccess} = searchStr.get("search")!=null ? useSearchingQuery({id: appUser.id, search: searchStr.get("search")}): {data: {}, isLoading:true};
    console.log(resultSearch);
    const [tab,setTab]=useState('post');
    const [changeRelationship, setChangeRelationship] = useState(false);
    const handleSelectTab = (selectedKey) => {
      setTab(selectedKey);
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
        switch (tab){
            case "post":
                res = <SearchPosts posts={resultSearch["posts"]}/>
                break;
            case "friend":
                res = <SearchPeople people={resultSearch["people"]} />
                break;
            case "group":
                 res = <SearchGroups groups={resultSearch["groups"]}/>;
                break;
            default:
                res = <SearchPosts posts={resultSearch["posts"]}/>
                break;
        }
        
        return res;
    }
    
    return (
                <Container fluid className='ps-4' style={{marginTop: "60px"}}>
                    <Row>
                        <Col xl={10} md={12} className="mt-2">
                            <Nav justify  variant="tabs" defaultActiveKey="post" onSelect={handleSelectTab}>
                            <Nav.Item>
                                    <Nav.Link eventKey="post" onClick={handelClick}>Posts <Badge bg="primary">{isLoading? <ThreeDots />:resultSearch["posts"].length}</Badge></Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                    <Nav.Link eventKey="friend" onClick={handelClick}>People <Badge bg="primary">{isLoading? <ThreeDots />:resultSearch["people"].length}</Badge></Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                    <Nav.Link eventKey="group" onClick={handelClick}>Groups <Badge bg="secondary">{isLoading? <ThreeDots />:resultSearch['groups'].length}</Badge></Nav.Link>
                                </Nav.Item>
                            </Nav>
                            <hr/>
                            <Container fluid>
                                {isLoading? 
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
                </Container>
    );
}

export default Searching;