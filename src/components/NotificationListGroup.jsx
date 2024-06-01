import React from "react";
import {  Card,ListGroup, Image,Row, Col,Button} from "react-bootstrap";
import APIService from "../features/APIService";
function NotificationListGroup({requirements,handleButton}){
    const getTimeOfRequirement = (requi)=>{
        let datePost = new Date(requi);

        let diffDay = Math.round(Math.abs(new Date() - datePost)/ 86400000);
        if(diffDay<1){
            let diffHour =Math.round(Math.abs(new Date() - datePost)/ 3600000);
            return <span  style={{fontSize: "12px"}}>{diffHour} hours ago</span>
        }else{
            return <span  style={{fontSize: "12px"}}>{datePost.toLocaleString("en-GB")}</span>
        }
        
    }
    return (
        <Card className="p-0">
            <ListGroup >
                {requirements.map((req,index)=>{
                    let urlImage= req.sender.image!=null?req.sender.image: (req.sender.gender=='female'?APIService.URL_REST_API+"/files/user_female.png":APIService.URL_REST_API+"/files/user_male.png");
                    return (
                        <ListGroup.Item key={index} >
                            <Row className="py-1">
                                <Col xl={2} lg={1} md={1} sm={1}>
                                    <Image src={urlImage} width={50} className="border bg-light p-1" roundedCircle/>
                                </Col>
                                <Col xl={9} lg={7} md={6} sm={5} className="ms-3">
                                    <p className="text-black text-start lh-sm"><b>{req.sender.fullname}</b> &nbsp;
                                    want to joined group <br/>
                                    <span className="text-black-50">{getTimeOfRequirement(req.create_at)}</span>
                                    </p>
                                    
                                </Col>
                                <Col xl={12} lg={3} md={4} sm={5} >
                                <div >
                                    <Button variant="outline-primary" onClick={()=>{handleButton("ACCEPT_MEMBER",req.sender.id)}}>Accept</Button>
                                    <Button variant="outline-danger ms-3" onClick={()=>{handleButton("REJECT",req.sender.id)}}>Reject</Button>
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