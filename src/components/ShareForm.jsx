import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { useSharePostMutation } from "../post/postApiSlice";
import '../css/post.css';
import { SlArrowLeft } from "react-icons/sl";
import { LuLink } from "react-icons/lu";
import { FaXmark  } from "react-icons/fa6";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../auth/authSlice";
function ShareForm({setFromSharePost,formSharePost,post,handleShareClose }){
    const [share] = useSharePostMutation();
    const user = useSelector(selectCurrentUser);
    const [selectedFiles, setSelectedFiles] = useState([]);
    const [viewFoundBackground, setViewFoundBackground] = useState(false);
    const [content, setContent] = useState(false);
    const [divClass, setDivClass] = useState({color: 'inherit', background: 'inherit'});
    const [selectedStyle, setSelectedStyle] = useState({ color: '', background: '' });
    const commentTagLink = (comment) => {
        return /tag=.*&link=/.test(comment);
      };
      const renderCommentWithLink = (comment) => {
        let result = [];
        let startIndex = 0;
        const regex = /tag=(.*?)&link=(.*?)(?=\s+tag=|$)/g;
        let match;
        while((match = regex.exec(comment)) != null){
          const tagName = match[1].trim();
          const link = match[2].trim();
          result.push(comment.substring(startIndex, match.index));
          result.push(
            <span key={startIndex}>
              <Link to={link}>{tagName}</Link>
            </span>
          );
          startIndex = match.index + match[0].length;
        }
        result.push(comment.substring(startIndex));
        return <>{result}</>;
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
                <div className="model-showbinhluananhdaidien"></div>
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
                    <ul id="myInput-ul" className="myul" >
                        {/* {users.map((user) => (
                        <li onClick={() => selectName(user.name, 'editPostInput', 'myInput')} data-link="http://abakiller"><a href="#">{user.name}</a></li>
                        ))} */}
                    </ul>
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
                    <ul id="myInput-ul" className="myul" >
                        {/* {users.map((user) => (
                        <li onClick={() => selectName(user.name, 'editPostInput', 'myInput')}data-link="http://abakiller"><a href="#">{user.name}</a></li>
                        ))} */}
                    </ul>
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