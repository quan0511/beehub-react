import React, { useState } from "react";
import { useSharePostMutation } from "../post/postApiSlice";
import '../css/post.css';
import {Link} from "react-router-dom";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../auth/authSlice";
import APIService from '../features/APIService';
import {Image} from "react-bootstrap";
function ShareForm({setFromSharePost,formSharePost,post,handleShareClose }){
    const [share] = useSharePostMutation();
    const user = useSelector(selectCurrentUser);
    const [divClass, setDivClass] = useState({color: 'inherit', background: 'inherit'});
    const [selectedStyle, setSelectedStyle] = useState({ color: '', background: '' });
    const commentTagLink = (comment) => {
        return /tag=.*&link=/.test(comment);
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
      const handleSubmitSharePost = async(e) =>{
        e.preventDefault();
        //setLoadingEditPost(true);
        const inputElement = document.getElementById("myInput") ;
        const userInput = inputElement.textContent?.trim() || "";
        const prevColor = formSharePost.color;
        const prevBackground = formSharePost.background;
        // Lấy giá trị mới của color và background từ selectedStyle, nếu không có thì sử dụng giá trị trước đó
        const updatedColor = selectedStyle.color || prevColor;
        const updatedBackground = selectedStyle.background || prevBackground;
        const sharePost = {
          ...formSharePost,
          text: userInput,
          color: updatedColor,
          background: updatedBackground,
          user:user?.id
      };
      try {
        await share(sharePost);
        handleShareClose(post.id);
      } catch (error) {
        console.error(error)
      }
      };
    return (  
    <div key={post.id} >
        <form onSubmit={handleSubmitSharePost} >
            <div className="modalpost-nameanh">
                <div className="model-showbinhluananhdaidien">
                {post.user_gender=='female'?(
                  <Link to={"/member/profile/"+post.user_username}>
                    <Image src={APIService.URL_REST_API+"/files/user_female.png"} style={{width:"40px",height: "40px"}} roundedCircle /></Link>
                  ):(
                    <Link to={"/member/profile/"+post.user_username}><Image src={APIService.URL_REST_API+"/files/user_male.png"} style={{width:"40px",height: "40px"}} roundedCircle /></Link>
                  )}
                </div>
                <div className="modalpost-name">Name</div>
            </div>
                <div>
                <input type="hidden" name="text" id="editPostInput" value={formSharePost.text}/>
                {formSharePost.medias  ? (                     
                    <div className="post-testandshowimage">
                    <div className={divClass.color!== 'inherit' ? 'modalpost-divcommentcolore' : 'modalpost-divcommentimg'} style={{'--postcolor': divClass.color, '--postbg': divClass.background}}>
                        <div className="inputCreatePost" id="myInput" onInput={() => handleInput('editPostInput', 'myInput','comment')}  >
                        {commentTagLink(formSharePost.text) ? renderCommentWithLink(formSharePost.text) : formSharePost.text}
                        </div>
                    </div>
                    <div className="modalpost-image">
                        <div className="modalpost-imagechil" >
                            <img src={formSharePost.medias} alt="" width="100%" height="100%"/> 
                        </div>
                    </div> 
                    </div>
                ):(
                    <div>
                    <div className={formSharePost.color!== 'inherit' ? 'modalpost-divcommentcolore' : 'modalpost-divcomment'} style={{'--postcolor': formSharePost.color, '--postbg': formSharePost.background}}>
                        <div className="inputCreatePost" id="myInput" contentEditable="true"  onInput={() => handleInput('editPostInput', 'myInput','comment')} data-text="What do you think ?">
                        {commentTagLink(formSharePost.text) ? renderCommentWithLink(formSharePost.text) : formSharePost.text}
                        </div>
                    </div>
                    </div>
                )}                    
                </div>
            <input type="hidden" name="color" value={formSharePost.color} />
            <input type="hidden" name="background" value={formSharePost.background} />
            <div className="modalpost-postst ">
                <div className="modalpost-poststright">
                <input className="modalpost-buttonpost" type="submit" value="Share"/>
                </div>
            </div>
        </form>
    </div>
            
    );
};

export default ShareForm;