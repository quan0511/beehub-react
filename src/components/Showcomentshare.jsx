import '../css/showcomment.css';
import { useState,useEffect } from 'react';
import APIService from '../features/APIService';
import {Link} from "react-router-dom";
import {Image} from "react-bootstrap";
function Showcommentshare({postIdco,calculateTimeDifference}){
    const commentTagLink = (comments) => {
        return /tag=.*&link=/.test(comments);
      };
      const renderCommentWithLink = (comment) => {
        if (typeof comment === 'string') {
          const regex = /tag=(.*?)&link=(.*?)(?=\s+tag=|$)/g;
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
          return result;
        } else {
          return comment;
        }
      };
    return(
        <div className="showcommentsharekhung">
            <div className="modalshowcomment-anhtentime">
                <div className="modalanhdaidien">
                {postIdco.user_gender=='female'?(
                <Link to={"/member/profile/"+postIdco.user_username}>
                <Image src={APIService.URL_REST_API+"/files/user_female.png"} style={{width:"40px",height: "40px"}} roundedCircle /></Link>
                ):(
                <Link to={"/member/profile/"+postIdco.user_username}><Image src={APIService.URL_REST_API+"/files/user_male.png"} style={{width:"40px",height: "40px"}} roundedCircle /></Link>
                )}
                </div>
                <div className="modalnametime">
                    <div className="modalname">{postIdco.user_username}</div>
                    <div className="modaltime">{calculateTimeDifference(postIdco.create_at)}</div>
                </div>
            </div>
            {postIdco.medias?(  
            <div className="modalpostimgshare">
                <img alt="" src={postIdco.medias} style={{width: '100%', height: '100%'}}/>
            </div>
            ):(
            <div>
                {(postIdco.color && postIdco.color !== "inherit" && postIdco.background && postIdco.background !== "inherit") ?(
                <div
                className={
                    postIdco.color !== null
                    ? 'modal-showcommentBackgroundcolor'
                    : ''
                }
                style={{
                    '--showpostcolor': postIdco.color || 'black' ,
                    '--showpostbackground': postIdco.background || 'white'
                } } // Sử dụng kiểu dữ liệu CustomCSSProperties
                >
                {commentTagLink(postIdco.text) ? renderCommentWithLink(postIdco?.text) : postIdco?.text}
                </div>
                ):(
                <div className="modal-showcomment">
                {commentTagLink(postIdco.text) ? renderCommentWithLink(postIdco?.text) : postIdco?.text}
                </div>
                )}
            </div>
            )}
        </div>
    )
}
export default Showcommentshare;