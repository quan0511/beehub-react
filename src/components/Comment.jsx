
import {Link} from "react-router-dom";
import {Image } from "react-bootstrap";
import APIService from '../features/APIService';
import { useSelector } from 'react-redux';
import '../css/showcomment.css';
import { useState,useEffect } from 'react';
import { RiDeleteBin6Line } from "react-icons/ri";
import { uniqueTerms } from '../utils/words';
import { selectCurrentUser } from '../auth/authSlice';
import { useCommentByIdQuery,  useCountReactionQuery, useDeletePostCommentMutation, useGetUserFriendQuery, usePostReCommentMutation, useRecommentQuery, useUpdateCommentMutation } from '../post/postApiSlice';
import { MdModeEdit } from "react-icons/md";
import { BsThreeDots } from "react-icons/bs";
import ReComment from './ReComment';
function Comment({comment,postIdco,refetchGetComment,refetchCountComment}){
    const user = useSelector(selectCurrentUser);
    const [toggleComment, setToggleComment] = useState({});
    const {data:getUserFriend} = useGetUserFriendQuery({id:user?.id})
    const {data:countReComment,refetch:refetchCountReComment} = useCountReactionQuery({id:comment.id})
    const {data:getReComment,refetch:refetchGetReComment} = useRecommentQuery({id:comment.id})
    const {data:getCommentById,refetch:refetchGetCommentById} = useCommentByIdQuery({id:comment.id})
    const [editComment] = useUpdateCommentMutation();
    const [deleteComment] = useDeletePostCommentMutation();
    const [createReComment] = usePostReCommentMutation();
    const [replyStates, setReplyStates] = useState({});
    const [content, setContent] = useState(false);
    const handleToggleComment = (commentId) =>{
      setToggleComment((prevState) =>({
        ...prevState,
        [commentId]:!prevState[commentId],
      }));
    }
    const calculateTimeDifference = (createdAt) => {
      const createdDate = new Date(createdAt);
      const currentDate = new Date();
      const timeDifference = currentDate - createdDate; // Lấy thời gian chênh lệch tính bằng milliseconds
      const secondsDifference = Math.floor(timeDifference / 1000);
      const minutesDifference = Math.floor(secondsDifference / 60);
      const hoursDifference = Math.floor(minutesDifference / 60);
      const daysDifference = Math.floor(hoursDifference / 24);
      if (daysDifference > 0) {
        return `${daysDifference} days ago`;
      } else if (hoursDifference > 0) {
        return `${hoursDifference} hours ago`;
      } else if (minutesDifference > 0) {
        return `${minutesDifference} minutes ago`;
      } else {
        return `${secondsDifference} seconds ago`;
      }
    };
    const toggleReply = (commentId) => {
        setReplyStates(prevState => {
          const updatedReplyStates = {};
          // Đặt tất cả các trạng thái về false
          Object.keys(prevState).forEach(key => {
            updatedReplyStates[key] = false;
          });
          // Đặt trạng thái của comment được nhấp vào thành true
          updatedReplyStates[commentId] = !prevState[commentId];
          return updatedReplyStates;
        });
      };     
        const [editCommentId, setEditCommentId] = useState(null);
        const handleShowEditComment = (commentId) =>{
          setEditCommentId((prevEditComment) =>(
            prevEditComment === commentId ? null:commentId
          ));
            setFormEditComment({
              id:getCommentById.id,
              comment:getCommentById.comment,
              createdAt:getCommentById.createdAt,
              post:getCommentById.post,
              user:getCommentById.user
            })
        }
        const [formEditComment,setFormEditComment] = useState({
          id:"",
          comment: "",
          createdAt:"",
          post:postIdco.id,
          user:user?.id
        })
        const handleChangeEditComment = (e) => {
          const value = e.target.value;
          setFormEditComment({
            ...formEditComment,[e.target.name]:value
          })
        }
        const handleSubmitEditComment = async(e) =>{
          e.preventDefault();
          const inputElement = document.getElementById(`editCommentInput-${comment.id}`);
          const userInput = inputElement.value;
          const lowerforbiddenWords = uniqueTerms.map(term=>term.toLowerCase());
          const forbiddenWords = lowerforbiddenWords.some(term => {
            const regex = new RegExp(`\\b${term}\\b`, 'i');
            return regex.test(userInput);
          });
          if(forbiddenWords){
            alert("Your comment contains vulgar and inappropriate language");
            return;
          }
          const updateComment = {
            ...formEditComment,
            comment: userInput
          };
          try{
            await editComment(updateComment)
            handleCancelEditComment();
            setToggleComment((prevState) => ({
              ...prevState,
              [formEditComment.id]: false // Close the toggleComment
            }));
            refetchGetCommentById(); 
            refetchGetComment();
          }catch(error){
            console.error(error)
          }
        }
        const handleDeleteComment = async (id) => {
          const isConfirmed = window.confirm("Are you sure you want to delete comment ?");
          if (isConfirmed) {
            try {
              await deleteComment({id});
              refetchGetComment();
              refetchCountComment();
              //toast.success("Bài đăng đã được xóa thành công!");
            } catch (error) {
              console.log(error);
            }
          }
        };
        const handleCancelEditComment = () => {
          setEditCommentId(null);
        };
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
    
    const [viewReplies, setViewReplies] = useState({});
      const handleViewReComments = (commentId) => {
        setViewReplies(prevState =>({
          ...prevState,
          [commentId]:true,
        }));

      };
      const handleHideReComments = (commentId) => {
        setViewReplies(prevState =>({
          ...prevState,
          [commentId]:false,
        }));
      };
      const [formReComment, setFormReComment] = useState({
        reaction:"",
        createdAt:"",
        post: postIdco,
        postComment:"",
        user: user?.id,
      });
      const handleChangeReComment = (e) =>{
        const value = e.target.value;
        setFormReComment({...formReComment,[e.target.name]: value})
      }
      const handleSubmitReComment = async (e, post, comment) => {
        e.preventDefault();
        const inputElement = document.getElementById("RemyInput");
        const userInput = formReComment.reaction;
        const lowerforbiddenWords = uniqueTerms.map(term=>term.toLowerCase());
        const forbiddenWords = lowerforbiddenWords.some(term => {
          const regex = new RegExp(`\\b${term}\\b`, 'i');
          return regex.test(userInput);
        });
        if(forbiddenWords){
          alert("Your comment contains vulgar and inappropriate language");
          return;
        }
        const updatedFormReComment = {
          ...formReComment,
          reaction: userInput,
          post: post.id, // Truyền ID của bài đăng
          postComment: comment.id, // Truyền ID của bình luận
        };
        try {
          await createReComment(updatedFormReComment);
          refetchCountReComment();
          refetchGetComment();
          refetchGetReComment();
          setFormReComment((prevState) => ({
            ...prevState,
            reaction: "",
        }));
        inputElement.textContent = "";
        } catch (error) {
          console.error(error)
        }
      };

      const handleInput = (inputId, divId, formType) => {
        const inputElement = document.getElementById(divId);
        const ulElement = document.getElementById(`${divId}-ul`);
        let userInput = inputElement.innerHTML.trim() || "";
        userInput = userInput.replace(/\s+/g, ' ');
        setContent(userInput.length > 0);
        const caretPosition = getCaretPosition(inputElement);
        const filteredText = getFilterText(userInput);
        Array.from(ulElement.getElementsByTagName("li")).forEach(li => {
            const a = li.getElementsByTagName("a")[0];
            const txtValue = a.textContent || a.innerText;
            if (txtValue.toUpperCase().includes(filteredText.toUpperCase())) {
                li.style.display = "";
            } else {
                li.style.display = "none";
            }
        });
        ulElement.style.display = userInput.includes("@") ? "block" : "none";
        const commentInputElement = document.getElementById(inputId);
        const allContent = Array.from(inputElement.childNodes).map(node => {
            if (node.nodeType === Node.TEXT_NODE) {
                return node.textContent?.trim() || "";
            } else if (node.nodeType === Node.ELEMENT_NODE && node.nodeName === "SPAN") {
                const span = node;
                if (span.classList.contains("selected")) {
                    const spanText = span.textContent?.trim() || "";
                    const link = span.getAttribute("data-link") || "";
                    return `tag=${spanText}&link=${link}`;
                } else {
                    return span.textContent?.trim() || "";
                }
            } else if (node.nodeType === Node.ELEMENT_NODE && node.nodeName === "A") {
                const linkText = node.textContent?.trim() || "";
                const href = node.getAttribute("href") || "";
                const link = href.split("/").pop(); // Extract the link part from href
                return `tag=${linkText}&link=${link}`;
            }
            return "";
        }).join(" ");
        if (formType === "comment") {
            setFormComment({ ...formComment, comment: allContent.trim() });
        } else if (formType === "reComment") {
            setFormReComment({ ...formReComment, reaction: allContent.trim() });
        }
        commentInputElement.value = allContent.trim();
        setCaretPosition(inputElement, caretPosition);
      };
      function getFilterText(inputValue) {
        // Sử dụng biểu thức chính quy để trích xuất phần mong muốn
        const regex = /^@(.+)|\s@(.+)/;
        const match = inputValue.match(regex);
      
        // Nếu có kết quả, trả về phần mong muốn, ngược lại trả về toàn bộ chuỗi
        return match ? match[1] || match[2] || "" : inputValue;
      }
      
      function getCaretPosition(element) {
        const selection = window.getSelection();
        const range = selection?.getRangeAt(0);
        return range?.startOffset || 0;
      }
      function setCaretPosition(element, position) {
        const selection = window.getSelection();
        const range = document.createRange();
        if (element.childNodes.length === 0) {
            // Tạo một nút văn bản mới nếu không có nút con nào tồn tại
            const textNode = document.createTextNode("");
            element.appendChild(textNode);
        }
        const lastChild = element.childNodes[element.childNodes.length - 1];
    
        // Kiểm tra xem lastChild có phải là nút văn bản không
        if (lastChild.nodeType === Node.TEXT_NODE) {
            // Đặt vị trí caret
            const length = lastChild.length;
            if (position > length) {
                range.setStart(lastChild, length);
            } else {
                range.setStart(lastChild, position);
            }
            range.collapse(true);
    
            selection.removeAllRanges();
            selection.addRange(range);
        }
    }   
    function selectName(selectedName, inputId, divId) {
      const currentInput = document.getElementById(divId);
      let currentValue = currentInput.textContent?.trim() || "";
      currentValue = currentValue.replace(/&nbsp;/g, '');
      currentValue = currentValue.replace(/\s+/g, ' ');
      const newValue = getOverwrittenText(currentValue, selectedName);
      const commentInputElement = document.getElementById(inputId);
      if (!commentInputElement) {
          console.error(`Element with id ${inputId} not found`);
          return;
      }
      commentInputElement.value = newValue;
      currentInput.innerHTML = ""; // Xóa nội dung hiện tại
      newValue.split(" ").forEach((word, index, array) => {
          if (word.trim() !== "") {
              const span = document.createElement("span");
              const wordWithSpaces = index === 0 ? `${word}` : word === "" ? "" : ` ${word}`;
              span.textContent = wordWithSpaces;
              // Kiểm tra nếu từ đang xét có phải là một mục được chọn hay không
              if (word.trim() === selectedName.trim() || word.trim().startsWith('user')) {
                  span.contentEditable = "false";
                  span.classList.add("selected");
                  const link = `${word.trim()}`;
                  span.setAttribute("data-link", link);
              } else {
                  span.contentEditable = "true";
              }
              currentInput.appendChild(span);
              if (index < array.length - 1) {
                  const space = document.createTextNode(" ");
                  currentInput.appendChild(space);
              }
          }
      });
      const event = new Event('input', {
          bubbles: true,
          cancelable: true,
      });
      currentInput.dispatchEvent(event);
      (document.getElementById(`${divId}-ul`)).style.display = "none";
    }
    function isInList(word, divId) {
      const ulElement = document.getElementById(`${divId}-ul`) ;
      const listItems = ulElement.getElementsByTagName("li");
      for (let i = 0; i < listItems.length; i++) {
        const listItemText = listItems[i].textContent?.trim();
        if (listItemText === word) {
          return true;
        }
      }
      return false;
    }
    function getOverwrittenText(currentInput, selectedName) {
      const regex = /^@(.+)|\s@(.+)/;
      const match = currentInput.match(regex);
      if (match) {
        const prefix = match[1] || match[2] || "";
        return currentInput.replace("@" + prefix, selectedName);
      } else {
        return selectedName;
      }
    }
    return(
    <div  className="modal-showbinhluankhung">
      <div className="modalthreedotcomment">
        <div className="modal-showbinhluankhungcon">
          <div className="model-showbinhluananhdaidien">
          {
            postIdco.group_id!=null && page!='group'?(
              postIdco.group_image!=null?
                <Link to={"/group/"+postIdco.group_id}><Image src={postIdcot.group_image} style={{width:"40px",height: "40px"}} roundedCircle /></Link>
                    :  <Link to={"/group/"+postIdco.group_id}><Image src={APIService.URL_REST_API+"/files/group_image.png"} style={{width:"40px",height: "40px"}} roundedCircle /></Link>
            )
            :(
              postIdco.user_image!=null?
              <Link to={"/member/profile/"+postIdco.user_username}>
                  <Image src={postIdco.user_image} style={{width:"40px",height: "40px"}} roundedCircle />
              </Link> 
              : (
                postIdco.user_gender=='female'?
                  <Link to={"/member/profile/"+postIdco.user_username}>
                  <Image src={APIService.URL_REST_API+"/files/user_female.png"} style={{width:"40px",height: "40px"}} roundedCircle /></Link>
                  :<Link to={"/member/profile/"+postIdco.user_username}><Image src={APIService.URL_REST_API+"/files/user_male.png"} style={{width:"40px",height: "40px"}} roundedCircle /></Link>
              )
            ) 
          }
          </div>
          <div className="modalbinhluanthreedottraloi" style={{display:editCommentId !== comment.id ? 'block':'none'}}>
            <div className="modalanhbinhluanithreedot">
              <div className="modal-showbinhluantencomment" >
                  <div className="modal-showbinhluanname">{comment.username}</div>
                  <div className="modal-showbinhluancomment">
                    {renderCommentWithLink(comment.comment)}
                  </div>
              </div>
              {comment.user === user?.id &&(
                <div className="buttonthreedotcomment" onClick={() =>{
                  handleToggleComment(comment.id)
                }}><BsThreeDots className="" />
                </div>
              )}
              
            </div>
            <div className="model-showbinhluantimetraloi">
              <div className="modal-showbinhluantime">{calculateTimeDifference(comment.createdAt)}</div>
              <div className="modal-showbinhluantraloi" onClick={() => {
                toggleReply(comment.id);
              }}>Reply
              </div>
            </div>
          </div>
          {editCommentId === comment.id && (
            <div className="div-EditComment">
              <form onSubmit={handleSubmitEditComment}>
                <input type="hidden" name="id" value={formEditComment.id} onChange={(e) => handleChangeEditComment(e)} />
                <input type="hidden" name="comment" value={formEditComment.comment} onChange={(e) => handleChangeEditComment(e)}  id={`editCommentInput-${comment.id}`} />
                <div>
                <div className="divEditcomment" id={`editMyInput-${comment.id}`} contentEditable="true"  onInput={() => handleInput(`editCommentInput-${comment.id}`, `editMyInput-${comment.id}`,`comment-${comment.id}`)}>
                  {renderCommentWithLink(formEditComment.comment)}
                </div>
                <ul id={`editMyInput-${comment.id}-ul`} className="myul" >
                  {getUserFriend?.map((user) => (
                    <li onClick={() => selectName(user.username, `editCommentInput-${comment.id}`, `editMyInput-${comment.id}`)}>
                      <a>
                        <div className="showuserlicomment">
                          <div className="showuserlianh">
                          {user.image!=null?
                            <Link className="showuserlianhrecomment" to={"/member/profile/"+user.username}>
                                <Image src={user.image} style={{width:"30px",height: "30px"}} roundedCircle />
                            </Link> 
                            : (
                              user.gender=='female'?
                                <Link className="showuserlianhrecomment" to={"/member/profile/"+user.username}>
                                <Image src={APIService.URL_REST_API+"/files/user_female.png"} style={{width:"30px",height: "30px"}} roundedCircle /></Link>
                                :<Link className="showuserlianhrecomment" to={"/member/profile/"+user.username}><Image src={APIService.URL_REST_API+"/files/user_male.png"} style={{width:"30px",height: "30px"}} roundedCircle /></Link>
                          )}
                          </div>
                          <div className="showuserliname">
                            {user.fullname}
                          </div>
                        </div>
                      </a>
                    </li>
                  ))}
                </ul>
                </div>
                <input type="submit" className={`commentRecommentmodal${!content ? 'disable' : ''}`} disabled={!content} value="Save"/>
                <button className="cancelEditCommentmodal" onClick={handleCancelEditComment}>Cancel</button>
              </form>
            </div>
          )}
        </div>
      </div>
      {toggleComment[comment.id] && editCommentId !== comment.id &&(
        <div className="toggleComment">
          <div className="selectedfunction" onClick={() =>handleShowEditComment(comment.id)}>
            <div><MdModeEdit className="iconefunctionpost" /></div>
            <div className="fonttextfunctionpost">Edit Comment</div>
          </div>
          <div className="selectedfunction"onClick={() =>handleDeleteComment(comment.id)} >
            <div><RiDeleteBin6Line className="iconefunctionpost"/></div>
            <div className="fonttextfunctionpost">Delete Comment</div>
          </div>
        </div>
      )}
      {countReComment ? (
        <div className="modalshowhiderecomment">
          {viewReplies[comment.id] ? (
            <div className="showReComment" onClick={() => handleHideReComments(comment.id)}>Hide Reply</div>
          ):(
            <div className="showReComment" onClick={() => handleViewReComments(comment.id)}>Show {countReComment} Reply</div>
          )}
        </div>
      ):(
        <div></div>
      )}
      
      {viewReplies[comment.id] && getReComment && getReComment.map((recomment)=>(
      <ReComment refetchCountReComment={refetchCountReComment} getUserFriend={getUserFriend} postIdco={postIdco} recomment={recomment} comment={comment} refetchGetReComment={refetchGetReComment} />
      ))}
      {replyStates[comment.id] &&  (
      <div className="div-ReComment">
        <form >
          <input type="hidden" name="reaction" value={formReComment.reaction} onChange={(e) => handleChangeReComment(e)} id="RecommentInput" />
          <div>
          <div className="divRecomment" id="RemyInput" contentEditable="true" onInput={() => handleInput('RecommentInput', 'RemyInput', 'reComment')}></div>
          <ul id="RemyInput-ul" className="myul ulrecoment" >
            {getUserFriend?.map((user) => (
              <li onClick={() => selectName(user.username, 'RecommentInput', 'RemyInput')}>
                <a>
                  <div className="showuserlicomment">
                    <div className="showuserlianh"> 
                    {user.image!=null?
                      <Link className="showuserlianhrecomment" to={"/member/profile/"+user.username}>
                          <Image src={user.image} style={{width:"30px",height: "30px"}} roundedCircle />
                      </Link> 
                      : (
                        user.gender=='female'?
                          <Link className="showuserlianhrecomment" to={"/member/profile/"+user.username}>
                          <Image src={APIService.URL_REST_API+"/files/user_female.png"} style={{width:"30px",height: "30px"}} roundedCircle /></Link>
                          :<Link className="showuserlianhrecomment" to={"/member/profile/"+user.username}><Image src={APIService.URL_REST_API+"/files/user_male.png"} style={{width:"30px",height: "30px"}} roundedCircle /></Link>
                    )}
                    </div>
                    <div className="showuserliname">
                      {user.fullname}
                    </div>
                  </div>
                </a>
              </li>
            ))}
          </ul>
          </div>
          <input type="hidden" name="createdAt" value={formReComment.createdAt} onChange={(e) => handleChangeReComment(e)} />
          <input type="button" className={`commentRecomment${!content ? 'disable' : ''}`} disabled={!content} value="Reply" onClick={(e) => handleSubmitReComment(e, postIdco, comment)} />
        </form>
      </div>
      )}                                
    </div>
  )
}
export default Comment;