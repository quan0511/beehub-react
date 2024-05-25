import React from 'react';
import SessionRight from '../components/SessionRight';
import Post from '../components/Post';
import { Button, Col, Form, Image, Row, Spinner } from 'react-bootstrap';
import axios from 'axios';
import APIService from '../auth/APIService';
const AcitivityPage = ({user,posts,friends, loading, setPosts, setLoading})=>{
    const handleScrollToTop=()=>{
        axios.get(`${APIService.URL_REST_API}/homepage/1`).then((res)=>{
            setPosts(res.data);
            setLoading(true);
        }).finally(()=>{
        setTimeout(() => {
            setLoading(false)
        }, 1200);
        window.scrollTo({top:0,behavior: "smooth"});})
    }
    return (
    <Row>
        <Col lg={8} >
            <div className="border-2 rounded-2 border-dark mt-2 " style={{paddingTop:"20px", paddingLeft: "15px", boxShadow: "rgba(0, 0, 0, 0.07) 0px 1px 2px, rgba(0, 0, 0, 0.07) 0px 2px 4px, rgba(0, 0, 0, 0.07) 0px 4px 8px, rgba(0, 0, 0, 0.07) 0px 8px 16px"}}>
                <Form method="post" className="row pe-4">
                    <label className="col-1 mx-auto mb-3 col-form-label">
                        {
                            user.image?
                                <Image src={user.image} style={{width:"50px",height: "50px"}}roundedCircle />
                            :(
                                user.gender=='female'?
                                <Image src={`${APIService.URL_REST_API}/files/user_female.png`} style={{width:"50px",height: "50px"}}roundedCircle />
                                :<Image src={`${APIService.URL_REST_API}/files/user_male.png`} style={{width:"50px",height: "50px"}}roundedCircle />
                            )
                        }
                    </label>
                    <div className='col-9 d-flex flex-row justify-content-center align-items-center'>
                        <input type="text" className="col-11 mb-3 mx-auto form-control " style={{borderRadius: "30px", padding: "5px 20px "}} placeholder="What do you think?"/>
                    </div>
                    <div className='col-1'></div>
                
                </Form>
            </div>
            {loading? <div className='mt-5'>
                <Spinner animation="border"  role="status">
                    <span className="visually-hidden">Loading...</span>
                </Spinner></div>
                :
                posts.map((post, index)=>{
                    return <Post key={index} post={post} />;
                })    
            }
            {
            !loading?
            <div className='mt-4 mb-3'>
                <Button variant='secondary' onClick={handleScrollToTop}>Reload</Button>
            </div>:
            <div></div>
            }
        </Col>
        <Col lg={4}>
            <SessionRight friends={friends}/>
        </Col>
    </Row>
    );
}
export default AcitivityPage;