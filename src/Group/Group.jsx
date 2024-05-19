import React, { useState } from "react";
import SessionLeftGroup from "../SessionLeft/SessionLeftGroup";
import {Col, Container, Image, Button, Row, Nav,Form,Table} from "react-bootstrap";
import { Dot, GlobeAmericas, ThreeDots,Images, Eye } from "react-bootstrap-icons";
import NavigatorBar from "../navigation_bar/NavigatorBar";

import GroupMedia from "./GroupMedia/GroupMedia";
import GroupPeople from "./GroupPeople/GroupPeople";
import GroupDiscussion from "./GroupDiscussion/GroupDiscussion";
function Group (){
    const [tab, setTab] = useState('discussion');
    const handelSelectTab = (selectKey)=>{
        setTab(selectKey);
    }
    const tabSession = ()=>{
        switch(tab){
            case "discussion":
                return <GroupDiscussion/>;
            case "people":
                return <GroupPeople/>;
            case "media":
                return <GroupMedia/>; 
            default:
                return <GroupDiscussion/>;
        }
    }
    return (
        <Row style={{minHeight: "800px",overflowX: "hidden",margin:0}}>
            <NavigatorBar/>
            <Col xl={3} className="p-0 position-relative" >
             <SessionLeftGroup/>
            </Col>
            <Col xl={9} className="mx-auto">
                <Container fluid>
                    <Row>
                        <Col xl={12} className="p-0" style={{height: "350px",width: "100vw",position: "relative"}}>
                            <Image src="\assets\images\groups\bg\arknights-bg18.png" className="object-fit-cover" style={{height: "inherit",objectPosition: "center",width: "100%",borderRadius: "0 0 0 5px"}}/>
                            <div className="position-absolute"style={{top: "250px",left: "1rem",width: "90%"}} >
                                <div className="d-flex flex-column ps-5 bg-white rounded-3 shadow px-2 pt-3">
                                    <Image src="\assets\images\groups\meme_9.png"  className="object-fit-cover border-0 rounded position-absolute" style={{width: "220px", height: "220px",top:"-100px"}} />
                                    <div style={{marginLeft: "240px", textAlign: "start",marginBottom: "50px"}}>
                                        <h2 style={{fontWeight: "900"}}>Arknights Global</h2>
                                        <p>
                                            <GlobeAmericas /> Public group 
                                            <Dot/> 122K memmbers
                                        </p>
                                        <div className="d-flex flex-row mb-2 flex-nowrap align-items-end" style={{overflowX: "hidden"}}>
                                            <Image  src="assets/images/user/fuxuan1.png" width={40} roundedCircle/>
                                            <Image  src="assets/images/user/Furina_5.png" width={40} roundedCircle/>
                                            <Image  src="assets/images/user/huohuo-6.png" width={40} roundedCircle/>
                                            <Image  src="assets/images/user/jingliu.png" width={40} roundedCircle/>
                                            <Image  src="assets/images/user/furina-meme.jpg" width={40} roundedCircle/>
                                            <Image  src="assets/images/user/fuxuan3.png" width={40} roundedCircle/>
                                            <Image  src="assets/images/user/Ruan Mei_1.png" width={40} roundedCircle/>
                                            <Image  src="assets/images/user/sp-1.png" width={40} roundedCircle/>
                                            <Image  src="assets/images/user/bw-2.png" width={40} roundedCircle/>
                                            <Image  src="assets/images/user/Acheron_2.png" width={40} roundedCircle/>
                                            <Image  src="assets/images/user/arlecchino_1.png" width={40} roundedCircle/>
                                            <ThreeDots width={40}/>
                                        </div>
                                        <Button variant="primary" style={{width: "100px",fontWeight: "bold"}}>Join</Button>
                                    </div>
                                    <Nav justify  variant="tabs" defaultActiveKey="discussion" className="fs-5 w-50" onSelect={handelSelectTab}>
                                        <Nav.Item >
                                            <Nav.Link eventKey="discussion" >Discussion</Nav.Link>
                                        </Nav.Item>
                                        <Nav.Item>
                                            <Nav.Link eventKey="people" >People</Nav.Link>
                                        </Nav.Item>
                                        <Nav.Item>
                                            <Nav.Link eventKey="media" >Media</Nav.Link>
                                        </Nav.Item>
                                    </Nav>
                                </div>
                            </div>
                            {tabSession()}
                        </Col>
                    </Row>
                </Container>
            </Col>
        </Row>
       
    );
}
export default Group;