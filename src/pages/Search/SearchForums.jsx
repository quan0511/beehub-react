import React from "react";
import { Button, Card, Col, Image, Row } from "react-bootstrap";
import { Dot } from "react-bootstrap-icons";
function SearchForums(){
    return (
        <Row>
        <Col lg={10} md={12} className="mx-auto">
            <p className="text-black-50 my-1 text-start">Found 6 Forums</p>
            <hr/>
            <div className="d-flex flex-column text-start">
                <Card  className="mb-2">
                    <Card.Body >
                        <Row style={{height: "80px"}}>
                            <Col xl={2} className="row">
                                <Image src="\assets\images\groups\Bootstrap_logo.png" className="mx-auto" style={{height: "80px",width: "80px", objectFit: "contain"}} roundedCircle />
                            </Col>
                            <Col xl={8}>
                                <Card.Title style={{fontSize: "16px"}}>Bootstrap</Card.Title>
                                <Card.Text  style={{overflow:"hidden",height: "50px"}}>
                                    <p className="lh-sm" style={{fontSize: "14px"}}>Software <Dot className="mx-1"></Dot> 12K followers 
                                    <br/>
                                    For learning and sharing Bootstrap
                                    </p>
                                    
                                </Card.Text>
                            </Col>
                            <Col xl="2" className="d-flex flex-column justify-content-center align-items-center">
                                <Button variant="outline-primary" className="w-100 fw-bold" >Follow</Button>
                            </Col>
                        </Row>
                    </Card.Body>
                </Card>
                <Card  className="mb-2">
                    <Card.Body >
                        <Row style={{height: "80px"}}>
                            <Col xl={2} className="row">
                                <Image src="\assets\images\groups\react.png" className="mx-auto" style={{height: "80px",width: "80px", objectFit: "contain"}} roundedCircle />
                            </Col>
                            <Col xl={8}>
                                <Card.Title style={{fontSize: "16px"}}>React</Card.Title>
                                <Card.Text  style={{overflow:"hidden",height: "50px"}}>
                                    <p className="lh-sm" style={{fontSize: "14px"}}>Community <Dot className="mx-1"></Dot> 120K followers 
                                    <br/>
                                    For learning and sharing React
                                    </p>
                                    
                                </Card.Text>
                            </Col>
                            <Col xl="2" className="d-flex flex-column justify-content-center align-items-center">
                                <Button variant="outline-primary" className="w-100 fw-bold" >Follow</Button>
                            </Col>
                        </Row>
                    </Card.Body>
                </Card>
                
                <Card  className="mb-2">
                    <Card.Body >
                        <Row style={{height: "80px"}}>
                            <Col xl={2} className="row">
                                <Image src="\assets\images\groups\lol.png" className="mx-auto" style={{height: "80px",width: "80px", objectFit: "contain"}} roundedCircle />
                            </Col>
                            <Col xl={8}>
                                <Card.Title style={{fontSize: "16px"}}>League of Legends</Card.Title>
                                <Card.Text style={{overflow:"hidden",height: "50px"}}>
                                    <p className="lh-sm" style={{fontSize: "14px"}}>Games <Dot className="mx-1"></Dot> 120M followers
                                    <br/>
                                    ESRB Rating: TEEN with Blood, Fantasy Violence, Mild Suggestive Themes, Use of Alcohol and Tobacco | Visit www.esrb.org for rating information ESRB Rating: TEEN with Blood, Fantasy Violence, Mild Suggestive Themes, Use of Alcohol and Tobacco | Visit www.esrb.org for rating information
                                    </p>
                                    
                                </Card.Text>
                            </Col>
                            <Col xl="2" className="d-flex flex-column justify-content-center align-items-center">
                                <Button variant="outline-secondary" className="w-100 fw-bold" >Following</Button>
                            </Col>
                        </Row>
                    </Card.Body>
                </Card>
            </div>
        </Col>
    </Row>
    );
}
export default SearchForums;