import '../css/showcomment.css';
import { useState,useEffect } from 'react';
import APIService from '../features/APIService';
import {Link} from "react-router-dom";
import {Image} from "react-bootstrap";
function Showcommentshare({postIdco,calculateTimeDifference}){
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
                {(formatcolor(postIdco.color) && formatcolor(postIdco.color) !== "inherit" && formatcolor(postIdco.background) && formatcolor(postIdco.background) !== "inherit"&& formatcolor(postIdco.background) !== "#ffffff" ) ?(
                <div
                className={
                  formatcolor(postIdco.color) !== null
                    ? 'modal-showcommentBackgroundcolor'
                    : ''
                }
                style={{
                    '--showpostcolor': formatcolor(postIdco.color) || 'black' ,
                    '--showpostbackground': formatcolor(postIdco.background) || 'white'
                } } // Sử dụng kiểu dữ liệu CustomCSSProperties
                >
                {renderCommentWithLink(postIdco?.text) }
                </div>
                ):(
                <div className="modal-showcomment">
                {renderCommentWithLink(postIdco?.text)}
                </div>
                )}
            </div>
            )}
        </div>
    )
}
export default Showcommentshare;