import React from 'react';
import { Col, Container, Image, Row } from 'react-bootstrap';
import { CameraReelsFill, EmojiLaughing,Images} from 'react-bootstrap-icons';
import SessionRight from '../SessionRight/SessionRight';
import SessionLeft from '../SessionLeft/SessionLeft';
import NavigatorBar2 from '../navigation_bar/NavigatorBar2';
import Post from '../Post/Post';

function Homepage(){
    return (
        <Row>
            <Col xl={3} className='p-0 ' >
              <SessionLeft />
            </Col>
            <Col xl={9} className='p-0'>
              <div className='d-flex flex-column'>
                <NavigatorBar2 />
                <Container fluid className='ps-4' style={{marginTop: "60px"}}>
                    <Row>
                        <Col lg={8}>
                            <div className="border-2 rounded-2 border-dark mt-2 " style={{paddingTop:"20px", paddingLeft: "15px", boxShadow: "rgba(0, 0, 0, 0.07) 0px 1px 2px, rgba(0, 0, 0, 0.07) 0px 2px 4px, rgba(0, 0, 0, 0.07) 0px 4px 8px, rgba(0, 0, 0, 0.07) 0px 8px 16px, rgba(0, 0, 0, 0.07) 0px 16px 32px, rgba(0, 0, 0, 0.07) 0px 32px 64px"}}>
                                <form method="post" className="row pe-4">
                                    <label className="col-1 mx-auto mb-3 col-form-label">
                                        <Image src="\assets\images\user\meme-6.jpg" style={{width:"50px",height: "50px"}}roundedCircle />
                                    </label>
                                    <div className='col-9 d-flex flex-row justify-content-center align-items-center'>
                                        <input type="text" className="col-11 mb-3 mx-auto form-control " style={{borderRadius: "30px", padding: "5px 20px "}} placeholder="What do you think?"/>
                                    </div>
                                    <div className='col-1'></div>
                                    <hr style={{ width: "90%"}} className="text-center col-12 mx-auto" />
                                    <div className="col-4 mb-3 d-inline-flex justify-content-center align-items-center">
                                        <CameraReelsFill size={24} fill='#8224E3' />
                                        
                                        <p style={{fontSize:"15px",marginLeft:"10px", marginTop: "10px", fontFamily: "sans-serif", fontWeight: "bold"}}>Live video</p>
                                    </div>
                                    <div className="col-4 mb-3 d-inline-flex justify-content-center align-items-center">
                                        <Images size={24} fill='#8224E3'/>
                                        <p style={{fontSize:"15px",marginLeft:"10px", marginTop: "10px", fontFamily: "sans-serif", fontWeight: "bold"}}>Photo/Video </p>
                                    </div>
                                    <div className="col-4 mb-3 d-inline-flex justify-content-center align-items-center">
                                        <EmojiLaughing size={24} fill='#8224E3' />
                                        
                                        <p style={{fontSize:"15px",marginLeft:"10px", marginTop: "10px", fontFamily: "sans-serif", fontWeight: "bold"}}>Feeling/Activity</p>
                                    </div>
                                </form>
                            </div>
                            <Post />
                            <Post />
                            <Post />
                            <Post />
                            <Post />

                        </Col>
                        <Col lg={4}>
                            <SessionRight/>
                        </Col>
                    </Row>
                </Container>
              </div>
            </Col>
        </Row>
    );

}
export default Homepage;