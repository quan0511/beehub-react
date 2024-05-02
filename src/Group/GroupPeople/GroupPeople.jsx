import React, { useState } from "react";
import { Badge, Button, Col, Container, Form, Image, InputGroup, Row } from "react-bootstrap";
import { Messenger, Plus, Search, ThreeDots } from "react-bootstrap-icons";
function GroupPeople(){
    return <Container>
        <Row style={{paddingBottom: "120px"}}>
            <Col xl={6} className="mx-auto">
                <div className="border-1 rounded-2 border p-3 text-start" style={{marginTop: "200px", boxShadow: "rgba(0, 0, 0, 0.03) 0px 1px 2px, rgba(0, 0, 0, 0.03) 0px 2px 4px, rgba(0, 0, 0, 0.03) 0px 4px 8px, rgba(0, 0, 0, 0.03) 0px 8px 16px, rgba(0, 0, 0, 0.03) 0px 16px 32px, rgba(0, 0, 0, 0.03) 0px 32px 64px"}}>
                    <p>
                        <b>Members  </b>· 211,818
                    </p>
                    <Form inline >
                        <InputGroup >
                            <InputGroup.Text id="basic-addon2" style={{borderRight: 0, borderTopLeftRadius: "50rem", borderBottomLeftRadius: "50rem",backgroundColor: "#ffffff"}}>
                                <Search />
                            </InputGroup.Text>
                            <Form.Control style={{borderLeft: 0 , borderTopRightRadius: "50rem", borderBottomRightRadius: "50rem"}} 
                                placeholder="Search"
                                aria-describedby="basic-addon2"
                            />
                        </InputGroup>
                    </Form>
                    <div className="p-2 my-3 d-flex flex-row justify-content-between align-items-center"  style={{borderTop: "2px solid grey",borderBottom: "2px solid grey"}}>
                        <div>
                            <Image src="\assets\images\user\meme-6.jpg" style={{width:"60px",height: "60px",marginRight: "20px"}}roundedCircle />
                            <b>Cat Tuong</b>
                        </div>
                        <Button variant="secondary">
                            <ThreeDots/>
                        </Button>
                    </div>
                    <div className="mb-3">
                        <p><b>Admins & moderators </b>· 12 </p>
                        <Row className="mb-3">
                            <Col xl={2}>
                                <Image src="\assets\images\user\fuxuan1.png" style={{width:"60px",height: "60px",marginRight: "20px"}}roundedCircle />
                            </Col>
                            <Col style={{lineHeight: "0.1"}}>
                                <p className="fw-bold">Fu Xuan</p>
                                <Badge bg="primary">Admin</Badge>
                            </Col>
                           
                        </Row>
                        <Row className="mb-3">
                            <Col xl={2}>
                                <Image src="\assets\images\user\bw-1.png" style={{width:"60px",height: "60px",marginRight: "20px"}}roundedCircle />
                            </Col>
                            <Col style={{lineHeight: "0.1"}}>
                                <p className="fw-bold">Black Swan</p>
                                <Badge bg="primary">Admin</Badge>
                            </Col>
                        </Row>
                        <Row className="mb-3">
                            <Col xl={2}>
                                <Image src="\assets\images\user\Ruan Mei_1.png" style={{width:"60px",height: "60px",marginRight: "20px"}}roundedCircle />
                            </Col>
                            <Col style={{lineHeight: "0.1"}}>
                                <p className="fw-bold">Ruan Mei</p>
                                <Badge bg="primary">Admin</Badge>
                            </Col>
                        </Row>
                        <Button variant="secondary" style={{width: "100%"}} >
                            See All
                        </Button>
                    </div>
                    <div className="mb-3" style={{borderTop: "2px solid grey"}}>
                        <p><b>Members </b>· 211,818 </p>
                        <div className="mb-3 d-flex flex-row  justify-content-between align-items-center">
                            <div>
                                <Image src="\assets\images\user\sp-1.png" style={{width:"60px",height: "60px",marginRight: "20px"}}roundedCircle />
                                <b>Sparkle</b>
                            </div>
                            <Button variant="outline-primary">
                                <Messenger/> Messenger
                            </Button>
                           
                        </div>
                        <div className="mb-3 d-flex flex-row  justify-content-between align-items-center">
                            <div>
                            <Image src="\assets\images\user\arlecchino_1.png" style={{width:"60px",height: "60px",marginRight: "20px"}}roundedCircle />
                            <b className="fw-bold">Alecchino</b>
                            </div>
                            <Button>
                                Add Friend
                            </Button>
                        </div>
                        <div className="mb-3 d-flex flex-row  justify-content-between align-items-center">
                            <div>
                            <Image src="\assets\images\user\bw-4.png" style={{width:"60px",height: "60px",marginRight: "20px"}}roundedCircle />
                            <b className="fw-bold">Swan</b>
                            </div>
                            <Button>
                                Add Friend
                            </Button>
                        </div>
                        <div className="mb-3 d-flex flex-row  justify-content-between align-items-center">
                            <div>
                            <Image src="\assets\images\user\jingliu.png" style={{width:"60px",height: "60px",marginRight: "20px"}}roundedCircle />
                            <b className="fw-bold">Jingliu</b>
                            </div>
                            <Button>
                                Add Friend
                            </Button>
                        </div>
                        <div className="mb-3 d-flex flex-row  justify-content-between align-items-center">
                            <div>
                            <Image src="\assets\images\user\sp-4.png" style={{width:"60px",height: "60px",marginRight: "20px"}}roundedCircle />
                            <b className="fw-bold">Sparkle 2</b>
                            </div>
                            <Button>
                                Add Friend
                            </Button>
                        </div>
                        <Button variant="secondary" style={{width: "100%"}} >
                            See All
                        </Button>
                    </div>
                </div>
            </Col>
        </Row>
    </Container>;
}
export default GroupPeople;