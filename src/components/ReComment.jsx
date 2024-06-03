import { useSelector } from 'react-redux';
import '../css/showcomment.css';
import { useState,useRef, ChangeEvent,useEffect } from 'react';
import { RiDeleteBin6Line } from "react-icons/ri";
import { selectCurrentUser } from '../auth/authSlice';
import { useCommentByIdQuery, useCountReactionQuery, useDeletePostCommentMutation, useDeletePostReCommentMutation, usePostReCommentMutation, useRecommentPostQuery, useRecommentQuery, useUpdateCommentMutation, useUpdateReCommentMutation } from '../post/postApiSlice';
import { MdGroups2,MdModeEdit,MdReport } from "react-icons/md";
import { BsThreeDots } from "react-icons/bs";
function ReComment({postIdco,recomment,comment,refetchGetReComment}){
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
      const inputElement = document.getElementById(`editReMyInput-${formEditReComment.id}`);
      const userInput = inputElement.textContent?.trim() || "";
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
    <div className="model-showrecomment">
        <div className="modalthreedotrecomment">
            <div className="modal-showrecommentkhungcon">
            <div className="model-showrecommentanhdaidien"></div>
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
                {/* <div className="modal-showrecommenttraloi">Trả lời</div> */}
                </div>
            </div>
            {editReCommentId === recomment.id && (
            <div className="div-EditReComment">
                <form >
                <input type="hidden" name="id" value={formEditReComment.id} onChange={(e) => handleChangeEditReComment(e)} />
                <input type="hidden" name="reaction" value={formEditReComment.reaction} onChange={(e) => handleChangeEditReComment(e)}  id={`editReCommentInput-${recomment.id}`} />
                <div>
                <div className="divEditRecomment" id={`editReMyInput-${recomment.id}`} contentEditable="true"  onInput={() => handleInput(`editReCommentInput-${recomment.id}`, `editReMyInput-${recomment.id}`,`reComment-${recomment.id}`)}>{formEditReComment.reaction}</div>
                <ul id={`editReMyInput-${recomment.id}-ul`} className="myul" >
                    {/* {users.map((user) => (
                    <li onClick={() => selectName(user.name, `editReCommentInput-${recomment.id}`, `editReMyInput-${recomment.id}`)}  data-link="http://abakiller"><a href="#">{user.name}</a></li>
                    ))} */}
                </ul>
                </div>
                <input type="button" className="commentEditRecomment" value="Save" onClick={(e) => handleSubmitEditReComment(e)}/>
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