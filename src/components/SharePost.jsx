import React, { useRef, useState } from "react";
import {Col, Image} from "react-bootstrap";
import {Dot} from 'react-bootstrap-icons';
import '../css/post.css';
import { Link } from "react-router-dom";
import APIService from "../features/APIService";
function SharePost({post,getSettingType,calculateTimeDifference}){
    const renderCommentWithLink = (comment) => {
        if (typeof comment === 'string') {
          const regex = /tag=(.*?)&link=(.*?)(?=\s+|$)/g;
          let match;
          const result = [];
          let lastIndex = 0;
          while ((match = regex.exec(comment)) !== null) {
            const [fullMatch, tagName, link] = match;
            const beforeTag = comment.substring(lastIndex, match.index);
            result.push(beforeTag, (
              <Link key={match.index} to={"/member/profile/" + link}>
                {tagName}
              </Link>
            ));
            lastIndex = regex.lastIndex;
          }
          const restOfString = comment.substring(lastIndex);
          result.push(restOfString);
          return result.filter(Boolean); // Lọc ra các phần tử không phải null hoặc undefined
        } else {
          return comment;
        }
      };
    const formatcolor = (color) =>{
        if(color && color.length ===8){
          return `#${color.slice(2)}`;
        }
        return color;
    }
    return(
        <Col xl={12} className="text-start sharekhung">
            <div className="useshare row">
            <Col xl={1} lg={1} md={1} sm={1} xs={1} className="mx-3">
                    {
                        post.group_id!=null && page!='group'?(
                            post.group_image!=null?
                                <Image src={post.group_image} style={{width:"40px",height: "40px"}} roundedCircle />
                                : <Image src={APIService.URL_REST_API+"/files/group_image.png"} style={{width:"40px",height: "40px"}} roundedCircle />
                        )
                        :(
                            post.usershareimage!=null?
                                <Link to={"/member/profile/"+post.usershare_username}>
                                    <Image src={post.usershareimage} style={{width:"40px",height: "40px"}} roundedCircle />
                                </Link> 
                                : (
                                    post.usershare_gender=='female'?
                                    <Link to={"/member/profile/"+post.usershare_username}>
                                    <Image src={APIService.URL_REST_API+"/files/user_female.png"} style={{width:"40px",height: "40px"}} roundedCircle /></Link>
                                    :<Link to={"/member/profile/"+post.usershare_username}><Image src={APIService.URL_REST_API+"/files/user_male.png"} style={{width:"40px",height: "40px"}} roundedCircle /></Link>
                                )
                        ) 
                    }
                </Col>
                {
                    post.group_id!=null && page!="group"?
                    <Col xl={9} lg={9} md={9} sm={9} xs={8} className="d-flex flex-column ms-2 sharepublic">
                        <Link to={"/group/"+post.group_id} className="h5 text-black text-capitalize  text-decoration-none text-start mb-1">{post.group_name}</Link>
                        <div className="text-start "><Link to={"/member/profile/"+post.usershare_username} className="text-dark text-decoration-none">{post.usershare_fullname}</Link> &emsp;<Dot/> {getTimeOfPost()}</div>
                    </Col>
                    :
                    <Col xl={9} lg={9} md={9} sm={9} xs={8} className="d-flex flex-column ms-2 sharepublic">
                        <Link to={"/member/profile/"+post.usershare_username} className="h5 text-black text-capitalize text-start mb-1 " style={{textDecoration:"none"}}>{post.usershare_fullname}</Link>
                        <p className="text-start" style={{fontSize: "12px"}}>
                            {getSettingType()} &emsp;<Dot/> {calculateTimeDifference(post.create_at)}</p>
                    </Col>
                }
            </div>
            {(post.color && post.color !== "inherit" && post.background && post.background !== "inherit" && post.background!== 'ffffffff' ) ?(
            <div
                className={
                    formatcolor(post.color) !== null
                    ? 'postuser-showcommentBackgroundcolorshare'
                    : ''
                }
                style={{
                '--showpostcolor': formatcolor(post.color) || 'black' ,
                '--showpostbackground': formatcolor(post.background) || 'white'
                } } // Sử dụng kiểu dữ liệu CustomCSSProperties
                >
                {renderCommentWithLink(post.text)}
                </div>
                ):(
                <p className="h6 mx-5 mb-3 text-dark textshare">{renderCommentWithLink(post.text)}</p>
                )}
                
                <div className="mb-2 img-media">
                    <div>
                        { post.medias!=null?
                        <Image src={post.medias} className="img-styleshare" fluid />
                        : (post.group_media !=null ?
                            <Image src={post.group_media.media} className="img-styleshare" fluid />
                            :<></>)
                        }
                    </div>
                    
            </div>
        </Col>
    )
}
export default SharePost