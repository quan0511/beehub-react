import React from "react";
import {Col, Row,Card, Form, InputGroup, Button, Image, Spinner, Dropdown } from "react-bootstrap";
import { Search, ThreeDots, } from "react-bootstrap-icons";
import APIService from "../../auth/APIService";
function ProfileFriends({friends}){
    return (
        <Row className="mb-5">
            <Col xl={10} className="mx-auto" style={{marginTop: "160px", minHeight: "450px"}}>
                <div class=" w-100 ps-4 pe-2">
                    <Row >
                        <Col xl={6}>
                            <h3>Friends</h3>
                        </Col>
                        <Col xl={4}>
                            <Form  >
                                <InputGroup >
                                    <InputGroup.Text id="basic-addon2" style={{borderRight: 0, borderTopLeftRadius: "50rem", borderBottomLeftRadius: "50rem",backgroundColor: "#ffffff"}}>
                                        <Search />
                                    </InputGroup.Text>
                                    <Form.Control style={{borderLeft: 0 , borderTopRightRadius: "50rem", borderBottomRightRadius: "50rem"}} 
                                        placeholder="Search Friends"
                                        aria-describedby="basic-addon2"
                                    />
                                </InputGroup>
                            </Form>
                        </Col>
                        <Col >
                            <Button variant="secondary">
                                <ThreeDots/>
                            </Button>
                        </Col>
                    </Row>
                    <hr/>
                    <Row xl={2}>
                        {friends?
                            friends.map((friend,index)=>{
                                let urlImage = friend.image!=null?friend.image: (friend.gender =='female'? APIService.URL_REST_API+"/files/user_female.png": APIService.URL_REST_API+"/files/user_male.png");
                                return (<Col>
                                            <Card className="p-1 mb-2 text-start">
                                                <Row className="g-0" >
                                                    <Col xl={3} md={3}>
                                                        <Image src={urlImage} fluid rounded />
                                                    </Col>
                                                    <Col xl={5} md={5} className="d-flex flex-column justify-content-center align-items-start ps-4">
                                                        <h4>{friend.fullname}</h4>
                                                        <p>Friends: {friend.friend_counter}</p>
                                                    </Col>
                                                    <Col xl={4} md={4} className="d-flex flex-row justify-content-start align-items-start pt-2 pe-2">
                                                        <Dropdown>
                                                            <Dropdown.Toggle variant="outline-secondary" id="dropdown-basic">
                                                                Options
                                                            </Dropdown.Toggle>

                                                            <Dropdown.Menu>
                                                                <Dropdown.Item as="button">Unfriend</Dropdown.Item>
                                                                <Dropdown.Item as="button">Block</Dropdown.Item>
                                                            </Dropdown.Menu>
                                                        </Dropdown>
                                                    </Col>
                                                </Row>
                                            </Card>
                                        </Col>);
                            })
                        :
                        <Col>
                            <Spinner animation="border"></Spinner>
                        </Col>
                        
                        }
                        
                    </Row>
                </div>
            </Col>
        </Row>
    );
}
export default ProfileFriends;