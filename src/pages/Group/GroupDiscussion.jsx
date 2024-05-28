import React from "react";
import {Col, Row, Image, Button,Form,Table, Container} from "react-bootstrap";
import { Eye, EyeSlash, GlobeAmericas, LockFill } from "react-bootstrap-icons";
import Post from "../../components/Post";
import APIService from "../../features/APIService";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../../auth/authSlice";
function GroupDiscussion({posts, description, toAbout, toListMedia, list_media, isActive, isPublic , joined}){
    const appUser = useSelector(selectCurrentUser);
    return <Container>
        <Row style={{paddingBottom: "100px",paddingTop: "220px"}}>
            <Col xl={7} className="mx-auto" >
                {
                    joined?
                        <div className="border-1 rounded-2 border pe-2 text-start" style={{paddingTop:"10px", paddingLeft: "1px",boxShadow: "rgba(0, 0, 0, 0.03) 0px 1px 2px, rgba(0, 0, 0, 0.03) 0px 2px 4px, rgba(0, 0, 0, 0.03) 0px 4px 8px, rgba(0, 0, 0, 0.03) 0px 8px 16px, rgba(0, 0, 0, 0.03) 0px 16px 32px, rgba(0, 0, 0, 0.03) 0px 32px 64px"}}>
                            <Form className="row" style={{padding: "10px 20px "}}>
                                <label className="col-1 ms-2 me-1 col-form-label">
                                    {appUser.image!=null?
                                    <Image src={appUser.image} style={{width:"50px",height: "50px"}}roundedCircle />
                                    :(appUser.gender=='female'?
                                    <Image src={APIService.URL_REST_API+"/user/files/user_female.png"} style={{width:"50px",height: "50px"}}roundedCircle />
                                    :<Image src={APIService.URL_REST_API+"/user/files/user_male.png"} style={{width:"50px",height: "50px"}}roundedCircle />
                                    )
                                    }
                                </label>
                                <div className='col-10 d-flex flex-row justify-content-center align-items-center'>
                                    <input type="text" className="mx-auto form-control " style={{borderRadius: "30px", height:"35px"}} placeholder="Write something..."/>
                                </div>
                                <div className='col-1'></div>
                            </Form>
                        </div>:<></>
                }
                {
                    posts!=null && posts.length>0?
                    posts.map((post,index)=>{
                        return <Post post={post} key={index} page="group" />
                    })
                    :
                    <p className="text-black-50">There are no post in group</p>
                }
            </Col>
            <Col xl={5}>
                <div className="border rounded-2 text-start px-4 mb-3" style={{paddingTop:"10px", paddingLeft: "15px",marginTop: "200px", boxShadow: "rgba(0, 0, 0, 0.03) 0px 1px 2px, rgba(0, 0, 0, 0.03) 0px 2px 4px, rgba(0, 0, 0, 0.03) 0px 4px 8px, rgba(0, 0, 0, 0.03) 0px 8px 16px, rgba(0, 0, 0, 0.03) 0px 16px 32px, rgba(0, 0, 0, 0.03) 0px 32px 64px"}}>
                    <p>
                        <span className="fw-bold">About</span><br/>
                        <span style={{fontSize: "13px"}}>
                            {description}
                        </span>
                    </p>
                    <Table borderless>
                        <tbody>
                            {isPublic?
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
                            : 
                                <tr>
                                    <td width="10%">
                                        <LockFill />
                                    </td>
                                    <td className="lh-sm"><span className="fw-bold">Private</span><br/>
                                        <span style={{fontSize:"13px"}}>
                                        Just member can see all posts in the group.
                                        </span>
                                    </td>
                                    
                                </tr>
                            }
                            {isActive? 
                                <tr>
                                    <td><Eye /></td>
                                    <td className="lh-sm"><span className="fw-bold">Visible</span><br/>
                                        <span style={{fontSize:"13px"}}>
                                        Anyone can find this group.
                                        </span>
                                    </td>
                                </tr>
                            :
                                <tr>
                                    <td><EyeSlash /></td>
                                    <td className="lh-sm"><span className="fw-bold">Invisible</span><br/>
                                        <span style={{fontSize:"13px"}}>
                                            Anyone can's find this group.
                                        </span>
                                    </td>
                                </tr>
                            }
                        </tbody>
                    </Table>
                    <Button variant="secondary" className="w-100 mb-3" onClick={toAbout}>Learn More</Button>
                </div>
                <div className="border rounded-2 text-start px-4" style={{paddingTop:"10px", paddingLeft: "15px",boxShadow: "rgba(0, 0, 0, 0.03) 0px 1px 2px, rgba(0, 0, 0, 0.03) 0px 2px 4px, rgba(0, 0, 0, 0.03) 0px 4px 8px, rgba(0, 0, 0, 0.03) 0px 8px 16px, rgba(0, 0, 0, 0.03) 0px 16px 32px, rgba(0, 0, 0, 0.03) 0px 32px 64px"}}>
                    <p>
                        <span className="fw-bold">Recent media</span><br/>
                    </p>
                    <Row className=" mb-3">
                        {list_media!=null&&list_media.length>0? 
                        list_media.map((media,index)=> {
                            let urlImg = APIService.URL_REST_API+"/user/files/"+media.media;
                            return <Col key={index} xl={6} className="mb-2">
                                <Image src={urlImg} fluid/>
                            </Col>
                        })
                        :<></>
                        }
                        
                    </Row>
                    <Button variant="secondary" className="w-100 mb-3" onClick={toListMedia}>See all</Button>
                </div>
            </Col>
        </Row>
    </Container>
    ;
}
export default GroupDiscussion;