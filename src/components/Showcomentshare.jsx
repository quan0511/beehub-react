import '../css/showcomment.css';
import { useState,useEffect } from 'react';
function Showcommentshare({postIdco,calculateTimeDifference}){
    return(
        <div className="showcommentsharekhung">
            <div className="modalshowcomment-anhtentime">
                <div className="modalanhdaidien">
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