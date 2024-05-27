import React from "react";
import {  Card,ListGroup, Image,Row, Col,Button} from "react-bootstrap";
import APIService from "../auth/APIService";
function NotificationListGroup({requirements}){
    return (
        <Card className="p-0">
            <ListGroup >
                {requirements.map((req,index)=>{
                    let urlImage= req.sender.image!=null?req.sender.image: (req.sender.gender=='female'?APIService.URL_REST_API+"/files/user_female.png":APIService.URL_REST_API+"/files/user_male.png");
                    return (
                        <ListGroup.Item key={index} style={{borderColor: "#383a45"}}>
                            <Row>
                                <Col xl={2}>
                                    <Image src={urlImage} width={50} className="border bg-light p-1" roundedCircle/>
                                </Col>
                                <Col xl={9} className="ms-3">
                                    <p className="text-black text-start lh-sm"><b>{req.sender.fullname}</b> &nbsp;
                                    want to joined group <br/>
                                    <span className="text-black-50">12 minutes ago</span>
                                    </p>
                                    <div >
                                        <Button variant="outline-primary">Accept</Button>
                                        <Button variant="outline-danger ms-3">Reject</Button>
                                    </div>
                                </Col>
                            </Row>
                        </ListGroup.Item>
                    )
                })}
                
                {/* <ListGroup.Item   style={{backgroundColor:"#444654",borderColor: "#383a45"}}>
                    <Row>
                        <Col xl={2}>
                            <Image src="assets/images/user/Acheron_3.png" width={50} className="border bg-light p-1" roundedCircle/>
                        </Col>
                        <Col xl={9} className="ms-3">
                            <p className="text-light text-start lh-sm"><b>Acheron </b> 
                            add new post <br/>
                            <span className="text-primary">40 minutes ago</span>
                            
                            </p>
                            <Button variant="outline-primary" className="me-2">Show</Button>
                            <Button  variant="primary">Accept</Button>
                        </Col>
                    </Row>
                </ListGroup.Item>
                <ListGroup.Item style={{backgroundColor:"#444654",borderColor: "#383a45"}}>
                    <Row>
                        <Col xl={2}>
                            <Image src="assets/images/user/furina-meme.jpg" width={50} className="border bg-light p-1" roundedCircle/>
                        </Col>
                        <Col xl={9} className="ms-3">
                            <p className="text-light text-start lh-sm"><b>Furina </b> 
                            report a post <br/>
                            <span className="text-primary">22 minutes ago</span>
                            </p>
                            <Button variant="outline-danger" className="me-2">More Detail</Button>
                        </Col>
                    </Row>
                </ListGroup.Item> */}
            </ListGroup>
        </Card>
    );
}

export default NotificationListGroup;