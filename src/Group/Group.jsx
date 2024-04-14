import React from "react";
import SessionLeftGroup from "../SessionLeft/SessionLeftGroup";
import {Col, Container, Image, Button, Row, Nav,Form,Table} from "react-bootstrap";
import { Dot, GlobeAmericas, ThreeDots,Images, Eye } from "react-bootstrap-icons";
import NavigatorBar2 from "../navigation_bar/NavigatorBar2";
import Post from "../Post/Post";
function Group (){
    return (
        <Row style={{minHeight: "800px",overflowX: "hidden",margin:0}}>
            <NavigatorBar2/>
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
                                    <Nav justify  variant="tabs" defaultActiveKey="discussion" className="fs-5 w-50">
                                        <Nav.Item >
                                            <Nav.Link eventKey="discussion" >Discussion</Nav.Link>
                                        </Nav.Item>
                                        <Nav.Item>
                                            <Nav.Link eventKey="people" >People</Nav.Link>
                                        </Nav.Item>
                                        <Nav.Item>
                                            <Nav.Link eventKey="Media" >Media</Nav.Link>
                                        </Nav.Item>
                                    </Nav>
                                </div>
                            </div>
                            <Container>
                                <Row>
                                    <Col xl={7} className="mx-auto" >
                                        <div className="border-1 rounded-2 border pe-2 text-start" style={{paddingTop:"10px", paddingLeft: "1px",marginTop: "200px", boxShadow: "rgba(0, 0, 0, 0.03) 0px 1px 2px, rgba(0, 0, 0, 0.03) 0px 2px 4px, rgba(0, 0, 0, 0.03) 0px 4px 8px, rgba(0, 0, 0, 0.03) 0px 8px 16px, rgba(0, 0, 0, 0.03) 0px 16px 32px, rgba(0, 0, 0, 0.03) 0px 32px 64px"}}>
                                            <Form method="post" className="row">
                                                <label className="col-1 ms-2 me-1 col-form-label">
                                                    <Image src="\assets\images\user\meme-6.jpg" style={{width:"50px",height: "50px"}}roundedCircle />
                                                </label>
                                                <div className='col-9 d-flex flex-row justify-content-center align-items-center'>
                                                    <input type="text" className="col-11 mx-auto form-control " style={{borderRadius: "30px", padding: "5px 20px "}} placeholder="Write something..."/>
                                                </div>
                                                <div className='col-1'></div>
                                            </Form>
                                            <hr className="my-1"/>
                                            <Button variant="outline-light ms-5 mb-1">
                                                <Images color="green" size="2rem"/> <span className="text-black-50 fw-bold ms-2">Photos/Video</span>
                                            </Button>
                                        </div>
                                        <Post/>
                                    </Col>
                                    <Col xl={5}>
                                        <div className="border rounded-2 text-start px-4 mb-3" style={{paddingTop:"10px", paddingLeft: "15px",marginTop: "200px", boxShadow: "rgba(0, 0, 0, 0.03) 0px 1px 2px, rgba(0, 0, 0, 0.03) 0px 2px 4px, rgba(0, 0, 0, 0.03) 0px 4px 8px, rgba(0, 0, 0, 0.03) 0px 8px 16px, rgba(0, 0, 0, 0.03) 0px 16px 32px, rgba(0, 0, 0, 0.03) 0px 32px 64px"}}>
                                            <p>
                                                <span className="fw-bold">About</span><br/>
                                                <span style={{fontSize: "13px"}}>
                                                    We are Fan Made group to connect all Global player in this group to keep helping Each other
                                                </span>
                                            </p>
                                            <Table borderless>
                                                <tbody>
                                                    <tr>
                                                        <td width="10%">
                                                            <GlobeAmericas />
                                                        </td>
                                                        <td className="lh-sm"><span className="fw-bold">Public</span><br/>
                                                            <span style={{fontSize:"13px"}}>
                                                            Anyone can see who's in the group and what they post.
                                                            </span>
                                                        </td>
                                                        
                                                    </tr>
                                                    <tr>
                                                        <td><Eye /></td>
                                                        <td className="lh-sm"><span className="fw-bold">Visible</span><br/>
                                                            <span style={{fontSize:"13px"}}>
                                                            Anyone can find this group.
                                                            </span>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </Table>
                                            <Button variant="secondary" className="w-100 mb-3">Learn More</Button>
                                        </div>
                                        <div className="border rounded-2 text-start px-4" style={{paddingTop:"10px", paddingLeft: "15px",boxShadow: "rgba(0, 0, 0, 0.03) 0px 1px 2px, rgba(0, 0, 0, 0.03) 0px 2px 4px, rgba(0, 0, 0, 0.03) 0px 4px 8px, rgba(0, 0, 0, 0.03) 0px 8px 16px, rgba(0, 0, 0, 0.03) 0px 16px 32px, rgba(0, 0, 0, 0.03) 0px 32px 64px"}}>
                                            <p>
                                                <span className="fw-bold">Recent media</span><br/>
                                            </p>
                                            <Row className=" mb-3">
                                                <Col xl={6}>
                                                    <Image src="\assets\images\groups\meme_9.png" fluid/>
                                                </Col>
                                                <Col xl={6}>
                                                    <Image src="\assets\images\groups\react.png" fluid/>
                                                </Col>
                                                <Col xl={6}>
                                                    <Image src="\assets\images\library\fuxuan-10.jpg" fluid/>
                                                </Col>
                                                <Col xl={6}>
                                                    <Image src="\assets\images\groups\Bootstrap_logo.png" fluid/>
                                                </Col>
                                            </Row>
                                            <Button variant="secondary" className="w-100 mb-3">See all</Button>
                                        </div>
                                    </Col>
                                </Row>
                            </Container>
                        </Col>
                    </Row>
                </Container>
            </Col>
        </Row>
       
    );
}
export default Group;