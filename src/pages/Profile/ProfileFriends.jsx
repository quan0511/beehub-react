import React from "react";
import {Col, Row,Card, Form, InputGroup, Button } from "react-bootstrap";
import { Search, ThreeDots, } from "react-bootstrap-icons";
function ProfileFriends(){
    return (
        <Row className="mb-5">
            <Col xl={9} className="mx-auto" style={{marginTop: "150px"}}>
                <div class=" w-100 ps-4 pe-2">
                    <Row >
                        <Col xl={6}>
                            <h3>Friends</h3>
                        </Col>
                        <Col xl={4}>
                            <Form inline >
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
                        <Col>Items 1</Col>
                        <Col>Items 2</Col>
                        <Col>Items 3</Col>
                        <Col>Items 4</Col>
                        <Col>Items 5</Col>
                        <Col>Items 6</Col>
                    </Row>
                </div>
            </Col>
        </Row>
    );
}
export default ProfileFriends;