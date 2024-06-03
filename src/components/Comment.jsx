import { useSelector } from 'react-redux';
import '../css/showcomment.css';
import { useState,useRef, ChangeEvent,useEffect } from 'react';
import { RiDeleteBin6Line } from "react-icons/ri";
import { selectCurrentUser } from '../auth/authSlice';
import { useCommentByIdQuery, useCommentQuery, useCountReactionQuery, useDeletePostCommentMutation, useDeletePostReCommentMutation, usePostReCommentMutation, useRecommentPostQuery, useRecommentQuery, useUpdateCommentMutation, useUpdateReCommentMutation } from '../post/postApiSlice';
import { MdGroups2,MdModeEdit,MdReport } from "react-icons/md";
import { BsThreeDots } from "react-icons/bs";
import ReComment from './ReComment';
function Comment({comment,postIdco,refetchGetComment,refetchCountComment}){
    const user = useSelector(selectCurrentUser);
    const [toggleComment, setToggleComment] = useState({});
    const {data:countReComment} = useCountReactionQuery({id:comment.id})
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
          const inputElement = document.getElementById(`editMyInput-${formEditComment.id}`) ;
          const userInput = inputElement.textContent?.trim() || "";
          const updateComment = {
            ...formEditComment,
            comment:userInput
          };
          console.log("edit",updateComment)
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
          const isConfirmed = window.confirm("Bạn chắc chắn muốn xóa comment này?");
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
        const commentTagLink = (comments) => {
          return /tag=.*&link=/.test(comments);
        };
        const renderCommentWithLink = (comments) => {
          let result = [];
          let startIndex = 0;
          const regex = /tag=(.*?)&link=(.*?)(?=\s+tag=|$)/g;
          let match;
          while((match = regex.exec(comments)) != null){
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
        const userInput = inputElement.textContent?.trim() || "";
             
        // Tạo một bản sao của formReComment và cập nhật reaction và các trường khác
        const updatedFormReComment = {
          ...formReComment,
          reaction: userInput,
          post: post.id, // Truyền ID của bài đăng
          postComment: comment.id, // Truyền ID của bình luận
        };
        try {
          await createReComment(updatedFormReComment);
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
    useEffect(() => {
        const inputElement = document.getElementById("myInput") ;
        if (inputElement) {
          const initialContent = inputElement.textContent?.trim() || "";
          setContent(initialContent.length > 0);
        }
      }, []);
      function handleInput(inputId, divId, formType) {
        const inputElement = document.getElementById(divId);
        const ulElement = document.getElementById(`${divId}-ul`) ;
        let userInput = inputElement.textContent?.trim() || "";
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
      
        const commentInputElement = document.getElementById(inputId) ;
        const allContent = Array.from(inputElement.childNodes).map(node => {
          if (node.nodeType === Node.TEXT_NODE) {
            return node.textContent?.trim() || "";
          } else if (node.nodeType === Node.ELEMENT_NODE && node.nodeName === "SPAN") {
            const span = node ;
            if (span.classList.contains("selected")) {
              const spanText = span.textContent?.trim() || "";
              const link = span.getAttribute("data-link") || "";
              return `tag=${spanText}&link=${link}`;
            } else {
              return span.textContent?.trim() || "";
            }
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
      }
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
    
      const commentInputElement = document.getElementById(inputId) ;
      if (commentInputElement) { // Kiểm tra phần tử trước khi đặt giá trị
        commentInputElement.value = newValue;
      } else {
        console.error(`Element with id ${inputId} not found`);
      }
    
      currentInput.innerHTML = "";
      newValue.split(" ").forEach((word, index, array) => {
        const span = document.createElement("span");
        const wordWithSpaces = index === 0 ? ` ${word} ` : word === "" ? "" : ` ${word} `;
        span.textContent = wordWithSpaces;
    
        if (isInList(word, divId)) {
          span.contentEditable = "false";
          span.classList.add("selected");
          const link = `http://${word}`;
          span.setAttribute("data-link", link);
        } else {
          span.contentEditable = "true";
        }
        currentInput.appendChild(span);
        if (index < array.length - 1) {
          const space = document.createTextNode(" ");
          currentInput.appendChild(space);
        }
      });
    
      const event = new Event('input', {
        bubbles: true,
        cancelable: true,
      });
      currentInput.dispatchEvent(event);
      (document.getElementById(`${divId}-ul`) ).style.display = "none";
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
          <div className="model-showbinhluananhdaidien"></div>
          <div className="modalbinhluanthreedottraloi" style={{display:editCommentId !== comment.id ? 'block':'none'}}>
            <div className="modalanhbinhluanithreedot">
              <div className="modal-showbinhluantencomment" >
                  <div className="modal-showbinhluanname">{comment.username}</div>
                  <div className="modal-showbinhluancomment">
                    {commentTagLink(comment.comment) ? renderCommentWithLink(comment.comment) : comment.comment}
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
              }}>Trả lời
              </div>
            </div>
          </div>
          {editCommentId === comment.id && (
            <div className="div-EditComment">
              <form onSubmit={handleSubmitEditComment}>
                <input type="hidden" name="id" value={formEditComment.id} onChange={(e) => handleChangeEditComment(e)} />
                <input type="hidden" name="reaction" value={formEditComment.comment} onChange={(e) => handleChangeEditComment(e)}  id={`editCommentInput-${comment.id}`} />
                <div>
                <div className="divEditcomment" id={`editMyInput-${comment.id}`} contentEditable="true"  onInput={() => handleInput(`editCommentInput-${comment.id}`, `editMyInput-${comment.id}`,`comment-${comment.id}`)}>{formEditComment.comment}</div>
                <ul id={`editMyInput-${comment.id}-ul`} className="myul" >
                  {/* {users.map((user) => (
                    <li onClick={() => selectName(user.name, `editCommentInput-${comment.id}`, `editMyInput-${comment.id}`)}  data-link="http://abakiller"><a href="#">{user.name}</a></li>
                  ))} */}
                </ul>
                </div>
                <input type="submit" className="commentRecommentmodal" value="Save"/>
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
            <div className="showReComment" onClick={() => handleHideReComments(comment.id)}>Ẩn trả lời</div>
          ):(
            <div className="showReComment" onClick={() => handleViewReComments(comment.id)}>xem {countReComment} trả lời</div>
          )}
        </div>
      ):(
        <div></div>
      )}
      
      {viewReplies[comment.id] && getReComment && getReComment.map((recomment)=>(
      <ReComment postIdco={postIdco} recomment={recomment} comment={comment} refetchGetReComment={refetchGetReComment} />
      ))}
      {replyStates[comment.id] &&  (
      <div className="div-ReComment">
        <form >
          <input type="hidden" name="reaction" value={formReComment.reaction} onChange={(e) => handleChangeReComment(e)} id="RecommentInput" />
          <div>
          <div className="divRecomment" id="RemyInput" contentEditable="true" onInput={() => handleInput('RecommentInput', 'RemyInput', 'reComment')}></div>
          {/* <ul id="RemyInput-ul" className="myul" >
            {users.map((user) => (
              <li onClick={() => selectName(user.name, 'RecommentInput', 'RemyInput')} data-link="http://abakiller"><a href="#">{user.name}</a></li>
            ))}
          </ul> */}
          </div>
          <input type="hidden" name="createdAt" value={formReComment.createdAt} onChange={(e) => handleChangeReComment(e)} />
          <input type="button" className="commentRecomment" value="Reply" onClick={(e) => handleSubmitReComment(e, postIdco, comment)} />
        </form>
      </div>
      )}                                
    </div>
  )
}
export default Comment;