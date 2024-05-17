import { Button, Col, Container, Form, Image, Row } from "react-bootstrap";
import { GearFill, Sliders2 } from "react-bootstrap-icons";
import Post from "../../Post/Post";
function ProfilePost (){
    return<Row>
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

    </Row>;
}
export default ProfilePost;