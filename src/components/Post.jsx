import React from "react";
import { Image } from "react-bootstrap";
import { ChatLeft, HandThumbsUp, HandThumbsUpFill, HeartFill, Reply, ThreeDots } from 'react-bootstrap-icons';

function Post (){
    return (
        <div className="border-2 rounded-2 border-dark mt-4" style={{paddingTop:"20px", paddingLeft: "15px", boxShadow: "rgba(0, 0, 0, 0.07) 0px 1px 2px, rgba(0, 0, 0, 0.07) 0px 2px 4px, rgba(0, 0, 0, 0.07) 0px 4px 8px, rgba(0, 0, 0, 0.07) 0px 8px 16px, rgba(0, 0, 0, 0.07) 0px 16px 32px, rgba(0, 0, 0, 0.07) 0px 32px 64px"}}>
            <div className="row">
                <div className="col-1 mt-4 mx-3">
                    <Image src="\assets\images\user\meme-6.jpg" style={{width:"50px",height: "50px"}} roundedCircle />
                </div>
                <div className="col-9 mt-4 d-flex flex-column">
                    <p className="h5 text-black text-capitalize text-start">Group name</p>
                    <p className="text-black-50  text-start">Cat Tuong <sup className="mx-2">3 giờ</sup></p>
                </div>
                <div className="col-1 text-end mt-4">

                    <ThreeDots size={30} fill='#e1e1e1' />
                    
                </div>
                <div className="col-12 text-start">
                    <p className="h6 mx-5 mb-3 text-dark">Arknight new Event</p>
                    <Image src="\assets\images\user\36_g3_redleafforest.png" fluid style={{maxHeight: "200px", marginLeft: "60px"}} />
                </div>
                <div className="col-md-3 col-lg-4 justify-content-center d-flex mt-3">
                    <HandThumbsUpFill size={23} fill='#006CDE' className='mx-1' />
                    <HeartFill size={23} fill='#E8254A' className='mx-1' />
                    
                    <p className="fw-bold mx-2 mt-1 text-black-50" style={{fontSize:"13px"}}>123 people</p>
                </div>
                <div className="col-md-9 col-lg-8 d-flex flex-row justify-content-end align-items-center">
                    <p style={{marginRight: "20px",fontSize: "13px"}} className="h6 text-black-50" >123 Comments</p>
                    <p style={{marginRight: "20px",fontSize: "13px"}} className="h6 text-black-50">23 Shares</p>                
                </div>
                <hr className="mx-auto"style={{ width:"90%"}} />
                <div className="col-12 row pb-3">
                    <div className="col-4 d-flex justify-content-center">
                        <HandThumbsUp size={30} fill='#8224E3'/>
                        
                        <p className="h6 mt-2 mx-2 text-black-50">Like</p>
                    </div>
                    <div className="col-4 d-flex justify-content-center">
                        <ChatLeft size={30} fill='#8224E3'/>
                        <p className="h6 mt-2 mx-2 text-black-50" >Comment</p>
                    </div>
                    <div className="col-4 d-flex justify-content-center">
                        <Reply size={30} fill='#8224E3'/>
                        
                        <p className="h6 mt-2 mx-2 text-black-50">Share</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default Post;