import React, { useRef, useState } from "react";
import { Button, Col, Image, ListGroup, Overlay, Row } from "react-bootstrap";
import { ChatLeft, Dot, GlobeAsiaAustralia, HandThumbsUp, HandThumbsUpFill, HeartFill, LockFill, People, PeopleFill, Reply, Shuffle, ThreeDots } from 'react-bootstrap-icons';
import APIService from "../features/APIService";
import { Link } from "react-router-dom";

function Post ({post, page}){
    const [show, setShow] = useState(false);
    const target = useRef(null);
    const getSettingType=()=>{
        switch(post.setting_type){
            case 'FOR_FRIEND':
                return <span >
                    <PeopleFill size={15} /> For Friend
                </span>
            case 'HIDDEN':
                return <span>
                    <LockFill size={15} /> Hidden
                 </span>
            case 'PUBLIC':
                return <span>
                    <GlobeAsiaAustralia size={15} /> Public
                </span>
            default:
                return <span>
                    <GlobeAsiaAustralia size={15} /> Public
                </span>
        }
    }
    const getTimeOfPost = ()=>{
        let datePost = new Date(post.create_at);
        let diffDay = Math.round(Math.abs(new Date() - datePost)/ 86400000);
        if(diffDay<1){
            let diffHour =Math.round(Math.abs(new Date() - datePost)/ 3600000);
            return <span  style={{fontSize: "12px"}}>{diffHour} hours ago</span>
        }else{
            return <span  style={{fontSize: "12px"}}>{datePost.toLocaleString("en-GB")}</span>
        }
        
    }
    return (
        <div className="border-2 rounded-2 border-dark mt-4" style={{paddingTop:"20px", paddingLeft: "15px",paddingRight: "15px", boxShadow: "rgba(0, 0, 0, 0.07) 0px 1px 2px, rgba(0, 0, 0, 0.07) 0px 2px 4px, rgba(0, 0, 0, 0.07) 0px 4px 8px, rgba(0, 0, 0, 0.07) 0px 8px 16px"}}>
            <Row>
                <Col xl={1} lg={1} md={1} sm={1} xs={1} className="mx-3">
                    {
                        post.group_id!=null && page!='group'?(
                            post.group_image!=null?
                                <Image src={post.group_image} style={{width:"50px",height: "50px"}} roundedCircle />
                                : <Image src={APIService.URL_REST_API+"/files/group_image.png"} style={{width:"50px",height: "50px"}} roundedCircle />
                        )
                        :(
                            post.user_image!=null?
                                <Link to={"/member/profile/"+post.user_username}>
                                    <Image src={post.user_image} style={{width:"50px",height: "50px"}} roundedCircle />
                                </Link> 
                                : (
                                    post.user_gender=='female'?
                                    <Link to={"/member/profile/"+post.user_username}>
                                    <Image src={APIService.URL_REST_API+"/files/user_female.png"} style={{width:"50px",height: "50px"}} roundedCircle /></Link>
                                    :<Link to={"/member/profile/"+post.user_username}><Image src={APIService.URL_REST_API+"/files/user_male.png"} style={{width:"50px",height: "50px"}} roundedCircle /></Link>
                                )
                        ) 
                    }
                </Col>
                {
                    post.group_id!=null && page!="group"?
                    <Col xl={9} lg={9} md={9} sm={9} xs={8} className="d-flex flex-column ms-2">
                        <Link to={"/group/"+post.group_id} className="h5 text-black text-capitalize  text-decoration-none text-start mb-1">{post.group_name}</Link>
                        <div className="text-start "><Link to={"/member/profile/"+post.user_username} className="text-dark text-decoration-none">{post.user_fullname}</Link> &emsp;<Dot/> {getTimeOfPost()}</div>
                    </Col>
                    :
                    <Col xl={9} lg={9} md={9} sm={9} xs={8} className="d-flex flex-column ms-2">
                        <Link to={"/member/profile/"+post.user_username} className="h5 text-black text-capitalize text-start mb-1 " style={{textDecoration:"none"}}>{post.user_fullname}</Link>
                        <p className="text-start" style={{fontSize: "12px"}}>
                            {getSettingType()} &emsp;<Dot/> {getTimeOfPost()}</p>
                    </Col>
                }
                <Col xl={1} lg={1} md={1} sm={1} xs={1} className="text-end mt-2">
                    <ThreeDots size={30} fill='#e1e1e1' />
                </Col>
                <Col xl={12} className="text-start">
                    <p className="h6 mx-5 mb-3 text-dark">{post.text}</p>
                    <div className="mb-2">
                        { post.media!=null?
                            <Image src={APIService.URL_REST_API+"/files/"+post.media.media}  fluid />
                            : (post.group_media !=null ?
                                <Image src={APIService.URL_REST_API+"/files/"+post.group_media.media} fluid />
                                :<></>)
                        }
                    </div>
                </Col>
                <Col md={3} lg={4} xl={4} sm={4} xs={6} className="d-flex justify-content-center  mt-2">
                    <HandThumbsUpFill size={20} fill='#006CDE' className='mx-1' />
                    <HeartFill size={20} fill='#E8254A' className='mx-1' />
                    <p className="fw-bold mx-2 mt-1 text-black-50" style={{fontSize:"13px"}}>123 people</p>
                </Col>
                <Col md={8} lg={8} xl={8} sm={8} xs={6} className="d-flex flex-row justify-content-end align-items-center">
                    <p style={{marginRight: "20px",fontSize: "13px"}} className="h6 text-black-50" >123 <span className="d-none d-md-block ">comments</span><span className="d-md-none"><ChatLeft/></span></p>
                    <p style={{marginRight: "20px",fontSize: "13px"}} className="h6 text-black-50">23 <span className="d-none d-md-block ">shares</span><span className="d-md-none"><Shuffle/></span></p>                
                </Col>
                <hr className="mx-auto"style={{ width:"90%"}} />
                <Col xl={12} className="row pb-2">
                    <div className="col-4 d-flex justify-content-center">
                        <HandThumbsUp size={22} fill='#8224E3'/>
                        
                        <p className="h6 mx-2 text-black-50">Like</p>
                    </div>
                    <div className="col-4 d-flex justify-content-center">
                        <ChatLeft size={22} fill='#8224E3'/>
                        <p className="h6 mx-2 text-black-50" >Comment</p>
                    </div>
                    <div className="col-4 d-flex justify-content-center">
                        <Reply size={22} fill='#8224E3'/>
                        
                        <p className="h6 mx-2 text-black-50">Share</p>
                    </div>
                </Col>
            </Row>
        </div>
    );
}
export default Post;