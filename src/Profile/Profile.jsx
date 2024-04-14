import React from "react";
import { Button, Col, Container, Form, Image, ListGroup, Row } from "react-bootstrap";
import NavigatorBar2 from "../navigation_bar/NavigatorBar2";
import Panel from "../Panel/Panel";
import { CardImage, ChatDots, ColumnsGap, GearFill, People, PersonVcard, Sliders2, ThreeDotsVertical } from "react-bootstrap-icons";
import Post from "../Post/Post";

function Profile (){
    
    return (
        <div className="d-flex flex-row m-0 ">
            <Panel />
            <div className='d-flex flex-column ' style={{width: "-webkit-fill-available"}}>
                <NavigatorBar2/>
                <Container style={{marginTop: "50px",width: "100vw"}}>
                    <Row >
                        <Col xl={12} className="p-0" style={{height: "350px",width: "100vw",position: "relative"}}>
                            <Image src="\assets\images\library\arknights-bg9.png" className="object-fit-cover" style={{height: "inherit",objectPosition: "center",width: "100%"}}/>
                            <div className="position-absolute"style={{top: "250px",left: "1rem",width: "90%"}} >
                                <div className="d-flex flex-column ps-5 bg-white rounded-3 shadow p-2">

                                    <Image src="\assets\images\user\meme-6.jpg"  className="object-fit-cover border-0 rounded position-absolute" style={{width: "220px", height: "220px",top:"-100px"}} />
                                    <div style={{marginLeft: "240px", textAlign: "start",marginBottom: "50px"}}>
                                        <h2>Cat Tuong</h2>
                                        <span className="d-block text-black-50">@Coffee</span>
                                    </div>
                                    <Container >
                                        <Row>
                                            <Col xl={2} >
                                                <ListGroup horizontal>
                                                    <ListGroup.Item className="w-50 border-0">
                                                        <p className="text-center">7<span className="d-block text-black-50">Friends</span></p>
                                                        
                                                    </ListGroup.Item>
                                                    <ListGroup.Item className="w-50 border-0">
                                                        <p className="text-center">22<span  className="d-block text-black-50">Groups</span></p>
                                                        
                                                    </ListGroup.Item>
                                                </ListGroup>
                                            </Col>
                                            <Col xl={8} className="mx-auto" >
                                                <ListGroup horizontal="md" className="my-2 flex-wrap justify-content-start align-items-center">
                                                    <ListGroup.Item style={{width: "72px"}} className="border-0 profile-active">
                                                        <a href="" className="d-flex flex-column align-items-center justify-content-between text-decoration-none">
                                                            <ColumnsGap size={20}/>
                                                            <span>Posts</span>
                                                        </a>
                                                    </ListGroup.Item>
                                                    <ListGroup.Item style={{width: "72px"}}  className="border-0">
                                                        <a href="" className="d-flex flex-column align-items-center justify-content-between text-decoration-none">
                                                            <PersonVcard size={20}/>
                                                            <span>About</span>    
                                                        </a>
                                                    </ListGroup.Item>
                                                    <ListGroup.Item style={{width: "72px"}}  className="border-0">
                                                        <a href="" className="d-flex flex-column align-items-center justify-content-between text-decoration-none">
                                                            <People size={20}/>
                                                            <span>Friends</span>
                                                        </a>
                                                    </ListGroup.Item>
                                                    <ListGroup.Item style={{width: "72px"}}  className="border-0">
                                                        <a href="" className="d-flex flex-column align-items-center justify-content-between text-decoration-none">
                                                            <CardImage size={20}/>
                                                            <span>Photos</span>
                                                        </a>
                                                    </ListGroup.Item>
                                                    <ListGroup.Item style={{width: "72px"}}  className="border-0">
                                                        <a href="" className="d-flex flex-column align-items-center justify-content-between text-decoration-none">
                                                            <ChatDots size={20}/>
                                                            <span>Forums</span>
                                                        </a>
                                                    </ListGroup.Item>
                                                    <ListGroup.Item style={{width: "72px"}}  className="border-0">
                                                        <a href="" className="d-flex flex-column align-items-center justify-content-between text-decoration-none">
                                                            <ThreeDotsVertical size={20}/>
                                                            <span>More</span>
                                                        </a>
                                                    </ListGroup.Item>
                                                </ListGroup>    
                                            </Col>
                                        </Row>
                                    </Container>
                                </div>
                            </div>
                        </Col>
                        <Col xl={4} style={{width: "-webkit-fill-available",marginTop: "150px"}}>
                            <Container fluid>
                                <Row>
                                    <Col xl={3} className="text-start">
                                        <h5>My Photos <a className="ms-4 float-end text-black-50 mt-2" style={{fontSize:"14px", fontWeight: "400"}}>More</a></h5>
                                        <hr/>
                                        <Row className="g-1">
                                            <Col>
                                            <Image src="\assets\images\library\arknights-bg9.png" style={{maxWidth: "120px",margin: "2px"}} className="rounded-2"/>
                                            </Col>
                                            <Col>
                                            <Image src="\assets\images\library\fuxuan-10.jpg" style={{maxWidth: "120px",margin: "2px"}} className="rounded-2"/>
                                            </Col>
                                            <Col>
                                            <Image src="\assets\images\library\meme-1.jpg" style={{maxWidth: "120px",margin: "2px"}} className="rounded-2"/>
                                            </Col>
                                            <Col>
                                            <Image src="\assets\images\groups\lol.png" style={{maxWidth: "120px",margin: "2px"}} className="rounded-2"/>
                                            </Col>
                                        </Row>
                                    </Col>
                                    <Col xl={6} className="me-auto ms-5">
                                        <div className="border-1 rounded-2 border mt-2" style={{paddingTop:"10px", paddingLeft: "1px"}}>
                                            <Form method="post" className="row pe-2">
                                                <label className="col-1 mx-auto mb-3 col-form-label">
                                                    <Image src="\assets\images\user\meme-6.jpg" style={{width:"50px",height: "50px"}}roundedCircle />
                                                </label>
                                                <div className='col-9 d-flex flex-row justify-content-center align-items-center'>
                                                    <input type="text" className="col-11 mb-3 mx-auto form-control " style={{borderRadius: "30px", padding: "5px 20px "}} placeholder="What do you think?"/>
                                                </div>
                                                <div className='col-1'></div>
                                            </Form>
                                        </div>
                                        <hr/>
                                        <div className="d-flex border px-5 py-3 rounded-3">
                                            <div>
                                                <h5>Posts</h5>
                                            </div>
                                            <div className="w-50 ms-auto d-flex flex-row me-2">
                                               <Button variant="secondary" className="me-2 ">
                                                <Sliders2 size={20} />
                                                <span className="ms-2">Filters</span>
                                               </Button>
                                               <Button variant="secondary">
                                                <GearFill size={20}/>
                                                <span className="ms-2">Manager Post</span>
                                               </Button>
                                            </div>
                                        </div>
                                        <Post />
                                    </Col>
                                </Row>
                            </Container>
                        </Col>
                    </Row>
                </Container>
            </div>
            
        </div>
    );
}
export default Profile;