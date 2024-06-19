import { useSelector } from 'react-redux';
import '../css/showcomment.css';
import { useState,useRef, ChangeEvent,useEffect } from 'react';
import { RiDeleteBin6Line } from "react-icons/ri";
import { selectCurrentUser } from '../auth/authSlice';
import { useDeletePostReCommentMutation,  useRecommentPostQuery, useUpdateReCommentMutation } from '../post/postApiSlice';
import { MdModeEdit } from "react-icons/md";
import { BsThreeDots } from "react-icons/bs";
import {Link} from "react-router-dom";
import {Image } from "react-bootstrap";
import APIService from '../features/APIService';
function ReComment({postIdco,recomment,comment,refetchGetReComment,getUserFriend,refetchCountReComment}){
    const user = useSelector(selectCurrentUser);
    const [editReComment] = useUpdateReCommentMutation();
    const [deleteReComment] = useDeletePostReCommentMutation();
    const {data:getReCommentById,refetch:refetchGetReCommentById} = useRecommentPostQuery({id:recomment.id})
    const [editReCommentId,setEditReCommentId] = useState(null);
    const [toggleReComment,setToggleReComment] = useState({});
    const [content, setContent] = useState(false);
    const handleToggleReComment = (reCommentId) =>{
      setToggleReComment((prevState) => ({
        ...prevState,
        [reCommentId]:!prevState[reCommentId],
      }));
    }
    const commentTagLink = (comments) => {
        return /tag=.*&link=/.test(comments);
      };
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
      const handleShowEditReComment = (reCommentId) => {
        setEditReCommentId((prevEditReComment) => (
          prevEditReComment === reCommentId ? null : reCommentId
        ));
          setFormEditReComment({
            id: recomment.id,
            reaction: recomment.reaction,
            createdAt: recomment.createdAt,
            post: recomment.post,
            user:recomment.user
          });
         // Gọi API để lấy chi tiết recomment nếu cần
    };
    const [formEditReComment,setFormEditReComment] = useState({
      id:"",
      reaction:"",
      createdAt:"",
      post:postIdco.id,
      user:user?.id,
      postComment:"",
    })
    const handleChangeEditReComment = (e) =>{
      const value = e.target.value;
      setFormEditReComment({
        ...formEditReComment,[e.target.name]:value
      })
    }
    const handleCancelEditReComment = () =>{
      setEditReCommentId(null);
    }
    const handleSubmitEditReComment = async(e) =>{
      e.preventDefault();
      const inputElement = document.getElementById(`editReCommentInput-${recomment.id}`);
      const userInput = inputElement.value;
      const updateReComment = {
        ...formEditReComment,
        reaction:userInput
      };
      console.log("edit",updateReComment)
          try{
            await editReComment(updateReComment)
            handleCancelEditReComment();
            setToggleReComment((prevState) => ({
              ...prevState,
              [formEditReComment.id]: false 
            }));
            refetchGetReCommentById();
            refetchGetReComment();
          }catch(error){
            console.error(error)
          }
    }
    const handleDeleteReComment = async (id) => {
        const isConfirmed = window.confirm("Bạn chắc chắn muốn xóa comment này?");
        if (isConfirmed) {
          try {
            await deleteReComment({id});
            refetchCountReComment();
            refetchGetReComment();
            //toast.success("Bài đăng đã được xóa thành công!");
          } catch (error) {
            console.log(error);
          }
        }
      };
    useEffect(() => {
        const inputElement = document.getElementById("myInput") ;
        if (inputElement) {
          const initialContent = inputElement.textContent?.trim() || "";
          setContent(initialContent.length > 0);
        }
      }, []);
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
        // Kiểm tra xem element có nút con hay không
        if (element.childNodes.length === 0) {
            // Tạo một nút văn bản mới nếu không có nút con nào tồn tại
            const textNode = document.createTextNode("");
            element.appendChild(textNode);
        }
        // Lấy nút con cuối cùng của element
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
    <div className="model-showrecomment">
        <div className="modalthreedotrecomment">
            <div className="modal-showrecommentkhungcon">
            <div className="model-showrecommentanhdaidien">
            {postIdco.user_gender=='female'?(
            <Link to={"/member/profile/"+postIdco.user_username}>
              <Image src={APIService.URL_REST_API+"/files/user_female.png"} style={{width:"40px",height: "40px"}} roundedCircle /></Link>
            ):(
              <Link to={"/member/profile/"+postIdco.user_username}><Image src={APIService.URL_REST_API+"/files/user_male.png"} style={{width:"40px",height: "40px"}} roundedCircle /></Link>
            )}
            </div>
            <div className="modarecommetthreedottraloi" style={{display:editReCommentId !== recomment.id ? 'block':'none'}}>
                <div className="modalanhrecommentthreedot">
                <div className="modal-showrecommenttencomment">
                    <div className="modal-showrecommentname">{recomment.username}</div>
                    <div className="modal-showrecommentcomment">
                    {commentTagLink(recomment.reaction) ? renderCommentWithLink(recomment.reaction) : recomment.reaction}
                    </div>
                </div>
                {recomment.user === user?.id &&(
                <div className="buttonthreedotrecomment" onClick={() =>{
                    handleToggleReComment(recomment.id)
                }}><BsThreeDots className="" />
                </div>
                )}
                </div>
                <div className="model-showrecommentTimetraloi">
                <div className="modal-showrecommentTime">{calculateTimeDifference(recomment.createdAt)}</div>
                </div>
            </div>
            {editReCommentId === recomment.id && (
            <div className="div-EditReComment">
                <form >
                <input type="hidden" name="id" value={formEditReComment.id} onChange={(e) => handleChangeEditReComment(e)} />
                <input type="hidden" name="reaction" value={formEditReComment.reaction} onChange={(e) => handleChangeEditReComment(e)}  id={`editReCommentInput-${recomment.id}`} />
                <div>
                <div className="divEditRecomment" id={`editReMyInput-${recomment.id}`} contentEditable="true"  onInput={() => handleInput(`editReCommentInput-${recomment.id}`, `editReMyInput-${recomment.id}`,`reComment-${recomment.id}`)}>
                  {renderCommentWithLink(formEditReComment.reaction)}
                  </div>
                <ul id={`editReMyInput-${recomment.id}-ul`} className="myul" >
                    {getUserFriend?.map((user) => (
                      <li  onClick={() => selectName(user.username, `editReCommentInput-${recomment.id}`, `editReMyInput-${recomment.id}`)}>
                        <a>
                          <div className="showuserlicomment">
                            <div className="showuserlianh"> {user.gender=='female'?(
                            <Link className="showuserlianhrecomment"  to={"/member/profile/"+user.username}>
                            <Image src={APIService.URL_REST_API+"/files/user_female.png"} style={{width:"30px",height: "30px"}} roundedCircle /></Link>
                            ):(
                              <Link className="showuserlianhrecomment" to={"/member/profile/"+user.username}><Image src={APIService.URL_REST_API+"/files/user_male.png"} style={{width:"30px",height: "30px"}} roundedCircle /></Link>
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
                <input type="button" className={`commentEditRecomment${!content ? 'disable' : ''}`} disabled={!content} value="Save" onClick={(e) => handleSubmitEditReComment(e)}/>
                <button className="cancelEditReComment" onClick={handleCancelEditReComment}>Cancel</button>
                </form>
            </div>
            )}          
            </div>  
        </div>
        {toggleReComment[recomment.id] && editReCommentId !== recomment.id &&(
        <div className="toggleComment">
            <div className="selectedfunction" onClick={() => handleShowEditReComment(recomment.id, comment.id)}>
            <div><MdModeEdit className="iconefunctionpost" /></div>
            <div className="fonttextfunctionpost">Edit Reply Comment</div>
            </div>
            <div className="selectedfunction" onClick={() => handleDeleteReComment(recomment.id)}>
            <div><RiDeleteBin6Line className="iconefunctionpost"/></div>
            <div className="fonttextfunctionpost">Delete Reply Comment</div>
            </div>
        </div>
        )}
    </div>
    )
}
export default ReComment;