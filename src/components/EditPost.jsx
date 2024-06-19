import { useState, useRef } from 'react';
import {Link} from "react-router-dom";
import '../css/showcomment.css';
import {Image } from "react-bootstrap";
import APIService from '../features/APIService';
import { useGetUserFriendQuery, useUpdatePostMutation } from "../post/postApiSlice";
import { refresh,resetData,showMessageAlert } from "../features/userSlice";
import { FaXmark } from 'react-icons/fa6';
import { LuLink } from 'react-icons/lu';
import { useDispatch,useSelector } from 'react-redux';
import { selectCurrentUser } from '../auth/authSlice';
import { SlArrowLeft } from 'react-icons/sl';
import { Modal } from 'react-bootstrap';
function EditPost({post,formUpdatePost,setFromUpdatePost,refetchHomePage,handleCloseEditPost}){
    const dispatch = useDispatch();
    const [viewFoundBackground, setViewFoundBackground] = useState(false);
    const [editPost] = useUpdatePostMutation();
    const handleToggleBackground= () =>{
      setViewFoundBackground((prevSate) => !prevSate);
    }
    const user = useSelector(selectCurrentUser);
    const {data:getUserFriend} = useGetUserFriendQuery({id:user?.id})
    const [divClass, setDivClass] = useState({color: formUpdatePost.color, background: formUpdatePost.background});
    const [selectedColor, setSelectedColor] = useState(null);
    const [selectedStyle, setSelectedStyle] = useState({ color: '', background: '' });
    const handleClassChange = (index ,{color, background}) => {
      setDivClass({color, background});
      setSelectedColor(index);
      setSelectedStyle({ color, background }); 
    };
    const [content, setContent] = useState(false);
    const [selectedFiles, setSelectedFiles] = useState([]);
    const handleRemoveFile = (index) =>{
      setSelectedFiles(prevFiles =>{
        const newFile = [...prevFiles];
        newFile.splice(index,1);
        return newFile;
      });
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
      setFromUpdatePost({ ...formUpdatePost, medias: null });
    }
    const fileInputRef = useRef(null);
    const handleChange = (event) => {
      if (event.target.files) {
        const filesArray = Array.from(event.target.files);
        setSelectedFiles(prevFiles => [...prevFiles, ...filesArray]); // Cập nhật danh sách các tệp đã chọn
        setFromUpdatePost({ ...formUpdatePost, medias: filesArray[0] });
      } else {
        const value = event.target.value;
        setFromUpdatePost({ ...formUpdatePost, [event.target.name]: value });
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
      const handleSubmitEditPost = async (e) => {
        e.preventDefault();
        setLoading(true);
        const inputElement = document.getElementById("myInput");
        let userInput = inputElement.textContent?.trim() || "";
        // Parse the input content to include tag and link format
        const parsedContent = Array.from(inputElement.childNodes).map((node) => {
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
          }
          return "";
        }).join(" ");
        const prevColor = formUpdatePost.color;
        const prevBackground = formUpdatePost.background;
        const updatedColor = selectedStyle.color || prevColor;
        const updatedBackground = selectedStyle.background || prevBackground;
        const updatedPost = {
          ...formUpdatePost,
          text: parsedContent.trim(),
          color: updatedColor,
          background: updatedBackground,
        };
        try {
          await editPost(updatedPost);
          handleCloseEditPost(post.id);
          dispatch(showMessageAlert("Edit post successfully"));
          dispatch(resetData());
          console.log('resetData dispatched');
        } catch (error) {
          console.error(error);
        }
      };
      const handleInput = (inputId, divId, formType) => {
        const inputElement = document.getElementById(divId);
        const ulElement = document.getElementById(`${divId}-ul`);
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
          }
          return "";
        }).join(" ");
      
        if (formType === "comment") {
          setFromUpdatePost({ ...formUpdatePost, comment: allContent.trim() });
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
    function handlePaste(event) {
      event.preventDefault();
      const pasteData = event.clipboardData.getData('text/plain');
      if (pasteData) {
        // Handle the pasted data here
        selectName(pasteData.trim());
      }
    }
    function getCaretPosition(element) {
      const selection = window.getSelection();
      const range = selection?.getRangeAt(0);
      return range?.startOffset || 0;
    }
    // Hàm để đặt vị trí của caret
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
  const selectName = (selectedName, inputId, divId) => {
    const currentInput = document.getElementById(divId);
    let currentValue = currentInput.textContent?.trim() || "";
    currentValue = currentValue.replace(/&nbsp;/g, '');
    currentValue = currentValue.replace(/\s+/g, ' ');
    const newValue = getOverwrittenText(currentValue, selectedName);
  
    const commentInputElement = document.getElementById(inputId);
    if (commentInputElement) {
      commentInputElement.value = newValue;
    } else {
      console.error(`Element with id ${inputId} not found`);
    }
    currentInput.innerHTML = "";
    newValue.split(" ").forEach((word, index, array) => {
      if (word.trim() !== "") {
        const span = document.createElement("span");
        const wordWithSpaces = index === 0 ? `${word}` : word === "" ? "" : ` ${word}`;
        span.textContent = wordWithSpaces;
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
    document.getElementById(`${divId}-ul`).style.display = "none";
  };
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
  const getOverwrittenText = (currentInput, selectedName) => {
    const regex = /^@(.+)|\s@(.+)/;
    const match = currentInput.match(regex);
    if (match) {
      const prefix = match[1] || match[2] || "";
      return currentInput.replace("@" + prefix, selectedName);
    } else {
      return selectedName;
    }
  };
  const formatcolor = (color) =>{
    if(color && color.length ===8){
      return `#${color.slice(2)}`;
    }
    return color;
  }
  const [loading, setLoading] = useState(false);
  return(
      <div key={post.id} >
        <Modal className="postLoading" show={loading} onHide={() => setLoading(false)}>
        <Modal.Body>
          <div className="loading-spinner">
            <div className="loader"></div>
            <span className="sr-only">Loading...</span>
          </div>
        </Modal.Body>
      </Modal>
      <form onSubmit={handleSubmitEditPost} encType="multipart/form-data">
      <input type="hidden" name="id" value={formUpdatePost.id} onChange={(e) => handleChangeEditPost(e)}/>
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
          {selectedFiles.length ?(
            <div className="post-testandshowimage">
              <input type="hidden" name="text" id="editPostInput" value={formUpdatePost.text} onChange={(e) => handleChangeEditPost(e)} />
              <div className={formatcolor(divClass.color)!== 'inherit'&& formatcolor(divClass.background)!== '#ffffff' ? 'modalpost-divcommentcolore' : 'modalpost-divcommentimg'} style={{'--postcolor': formatcolor(divClass.color), '--postbg': formatcolor(divClass.background)} }>
                <div className="inputCreatePost" id="myInput" contentEditable="true"  onInput={() => handleInput('editPostInput', 'myInput','comment')} onPaste={handlePaste} data-text="What do you think ?">
                {commentTagLink(formUpdatePost.text) ? renderCommentWithLink(formUpdatePost.text) : formUpdatePost.text}
                </div>
              </div>
              <ul id="myInput-ul" className="myul" >
                {getUserFriend?.map((user) => (
                  <li onClick={() => selectName(user.username, 'editPostInput', 'myInput')}>
                    <a>
                      <div className="showuserli">
                        <div className="showuserlianhcomment"> {user.gender=='female'?(
                        <Link to={"/member/profile/"+user.username}>
                        <Image src={APIService.URL_REST_API+"/files/user_female.png"} style={{width:"40px",height: "40px"}} roundedCircle /></Link>
                        ):(
                          <Link to={"/member/profile/"+user.username}><Image src={APIService.URL_REST_API+"/files/user_male.png"} style={{width:"40px",height: "40px"}} roundedCircle /></Link>
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
              {selectedFiles.length > 0 && (
                <div className="modalpost-image">
                    {selectedFiles.map((file, index) => (
                    <div className="modalpost-imagechil" key={index}>
                        <img src={URL.createObjectURL(file)} alt={`Selected file ${index}`} width="100%" height="100%"/>
                        <button aria-label="file" className="modalpost-xoafile" onClick={() => handleRemoveFile(index)}><FaXmark className="modalpost-iconxoafile" /></button>
                    </div>
                    ))}
                </div>
              )}
            </div>
          ):(
            <div>
              <input type="hidden" name="text" id="editPostInput" value={formUpdatePost.text} onChange={(e) => handleChangeEditPost(e)} />
              {formUpdatePost.medias  ? (                     
                <div className="post-testandshowimage">
                  <div className={formatcolor(divClass.color)!== 'inherit' && formatcolor(divClass.background) !== '#ffffff' ? 'modalpost-divcommentcolore' : 'modalpost-divcommentimg'} style={{'--postcolor': formatcolor(divClass.color), '--postbg': formatcolor(divClass.background)}}>
                    <div className="inputCreatePost" id="myInput" contentEditable="true"  onInput={() => handleInput('editPostInput', 'myInput','comment')} onPaste={handlePaste} data-text="What do you think ?">
                    {renderCommentWithLink(formUpdatePost.text)}
                    </div>
                  </div>
                  <ul id="myInput-ul" className="myul" >
                  {getUserFriend?.map((user) => (
                    <li onClick={() => selectName(user.username, 'editPostInput', 'myInput')}>
                      <a>
                        <div className="showuserli">
                          <div className="showuserlianhcomment"> {user.gender=='female'?(
                          <Link to={"/member/profile/"+user.username}>
                          <Image src={APIService.URL_REST_API+"/files/user_female.png"} style={{width:"40px",height: "40px"}} roundedCircle /></Link>
                          ):(
                            <Link to={"/member/profile/"+user.username}><Image src={APIService.URL_REST_API+"/files/user_male.png"} style={{width:"40px",height: "40px"}} roundedCircle /></Link>
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
                  <div className="modalpost-image">
                  <div aria-label="file" className="modalpost-xoafile" ><FaXmark className="modalpost-iconxoafile" /></div>
                      <div className="modalpost-imagechil" >
                          <img src={formUpdatePost.medias} alt="" width="100%" height="100%"/>
                          
                      </div>
                  </div> 
                </div>
              ):(
                <div>
                  <div className={formatcolor(divClass.color)!== 'inherit'&& formatcolor(divClass.background)!== '#ffffff' ? 'modalpost-divcommentcolore' : 'modalpost-divcomment'} style={{'--postcolor': formatcolor(divClass.color), '--postbg': formatcolor(divClass.background)}}>
                    <div className="inputCreatePost" id="myInput" contentEditable="true"  onInput={() => handleInput('editPostInput', 'myInput','comment')} onPaste={handlePaste} data-text="What do you think ?">
                    {renderCommentWithLink(formUpdatePost.text) }
                    </div>
                  </div>
                  <ul id="myInput-ul" className="myul" >
                  {getUserFriend?.map((user) => (
                    <li onClick={() => selectName(user.username, 'editPostInput', 'myInput')}>
                      <a>
                        <div className="showuserli">
                          <div className="showuserlianhcomment"> {user.gender=='female'?(
                          <Link to={"/member/profile/"+user.username}>
                          <Image src={APIService.URL_REST_API+"/files/user_female.png"} style={{width:"40px",height: "40px"}} roundedCircle /></Link>
                          ):(
                            <Link to={"/member/profile/"+user.username}><Image src={APIService.URL_REST_API+"/files/user_male.png"} style={{width:"40px",height: "40px"}} roundedCircle /></Link>
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
              )}                    
            </div>
          )} 
          {!selectedFiles.length && formUpdatePost.medias == null &&(
          <div className="postfountbackground">
            {viewFoundBackground ?(
              <div className="clickchangefount" onClick={handleToggleBackground}>
                Aa
              </div>
            ):(
              <div className="modalpost-fountcolorall">
                <div className="modalpost-fountcolororBack" onClick={handleToggleBackground}><SlArrowLeft /></div>
                <div className="modalpost-fountcolororigan" onClick={() => handleClassChange(0,{color: 'inherit', background: 'inherit'})}>0</div>
                {[
                  { color: '#ffffff', background: '#7c4dff' },
                  { color: '#000000', background: '#18ffff' },
                  { color: '#ffffff', background: '#6d4c41' },
                  { color: '#ffffff', background: '#f06292' },
                  { color: '#ffffff', background: '#FF0000' },
                  { color: '#000000', background: '#76ff03' },
                  { color: '#ffffff', background: '#0d47a1' },
                  { color: '#ffffff', background: '#42a5f5' },
                  { color: '#ffffff', background: '#607d8b' }
                ].map((colorObj,index)=>(
                  <div key={index} className={`modalpost-fountcolor${index + 1}${selectedColor === index ? ' borderpostcolor': ''}`}
                  onClick={() => handleClassChange(index,colorObj)}>        
                  </div>
                ))}
              </div>
            )}    
            
          </div>
          )}
          {selectedFiles.length ?(
            <div>
                <div className="modalpost-buttonmediadisable" > 
                <span className="modalpost-media">
                    <LuLink className="modalpost-iconmedia" />
                </span>
                <span className="modalpost-font">Attach media</span>

                </div>
                
            </div>
          ):(
            <div>
              <button className={`modalpost-buttonmedia${formUpdatePost.color !== 'inherit' ? 'disable': ''}`} onClick={(e) =>{
                e.preventDefault();
                if(divClass.color === 'inherit'){
                  fileInputRef.current?.click()
                }
              }} disabled={post.color !== 'inherit'}> 
              <span className="modalpost-media">
                  <LuLink className="modalpost-iconmedia" />
              </span>
              <span className="modalpost-font">Attach media</span>
              </button>
              
            </div>
          )}
          <input name="medias" onChange={handleChange}  ref={fileInputRef} type="file" accept="image/png,image/jpg,video/mp4" multiple hidden/>
          <input type="hidden" name="color" value={formUpdatePost.color} onChange={(e) => handleChangeEditPost(e)}/>
          <input type="hidden" name="background" value={formUpdatePost.background} onChange={(e) => handleChangeEditPost(e)}/>
          <input type="hidden" name="group" value={formUpdatePost.group} onChange={(e) => handleChangeEditPost(e)}/>
          {selectedFiles.length?(
            <div className="modalpost-postst ">
              <div className="modalpost-poststright">
              <input className={`modalpost-buttonpost`} type="submit"  value="Post"/>
              </div>
            </div>
          ):(
            <div className="modalpost-postst ">
              <div className="modalpost-poststright">
              <input className={`modalpost-buttonpost${!content  ? 'disable' : ''}`} type="submit" disabled={!content} value="Post"/>
              </div>
            </div>
          )}  
      </form>
      </div>
  )
}
export default EditPost