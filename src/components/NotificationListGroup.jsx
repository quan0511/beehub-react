import React from "react";
import {  Card,ListGroup, Image,Row, Col,Button} from "react-bootstrap";
function NotificationListGroup({requirements,reports}){
    return (
        <Card style={{ width: '20rem',borderColor: "#383a45", padding: 0 }} bg="dark">
            <ListGroup >
                <ListGroup.Item style={{backgroundColor:"#444654",borderColor: "#383a45"}}>
                    <Row>
                        <Col xl={2}>
                            <Image src="assets/images/user/fuxuan1.png" width={50} className="border bg-light p-1" roundedCircle/>
                        </Col>
                        <Col xl={9} className="ms-3">
                            <p className="text-light text-start lh-sm"><b>Fu Xuan </b> 
                            add new post <br/>
                            <span className="text-primary">12 minutes ago</span>
                            </p>
                        </Col>
                    </Row>
                </ListGroup.Item>
                <ListGroup.Item   style={{backgroundColor:"#444654",borderColor: "#383a45"}}>
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
                </ListGroup.Item>
            </ListGroup>
        </Card>
    );
}

export default NotificationListGroup;