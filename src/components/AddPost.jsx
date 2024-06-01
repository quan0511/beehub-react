import { useState,useRef,useEffect,ChangeEvent } from 'react';
// import api from '../api/apiPost';
import { LuLink } from "react-icons/lu";
import { FaXmark } from "react-icons/fa6";
import { SlArrowLeft } from "react-icons/sl";
import '../css/addPost.css';
import { usePostMutation } from '../post/postApiSlice';
import { useSelector } from 'react-redux';
import { selectCurrentUser } from '../auth/authSlice';

const AddPost = ({handleCloseModal}) => {
    const user = useSelector(selectCurrentUser)
    const [create, {isLoading, isFetching, isError, isSuccess}] = usePostMutation();

    const [viewFoundBackground, setViewFoundBackground] = useState(false);
    const handleToggleBackground= () =>{
      setViewFoundBackground((prevSate) => !prevSate);
    }
    const [divClass, setDivClass] = useState({color: 'inherit', background: 'inherit'});
    const [selectedColor, setSelectedColor] = useState(null);
    const [selectedStyle, setSelectedStyle] = useState({ color: '', background: '' });
    useEffect(() => {
      setFormData(prevFormData => ({
        ...prevFormData,
        color: selectedStyle.color,
        background: selectedStyle.background
      }));
    }, [selectedStyle]);
    const handleClassChange = (index ,{color, background}) => {
      setDivClass({color, background});
      setSelectedColor(index);
      setSelectedStyle({ color, background }); 
    };
    const [content, setContent] = useState(false);
    const [formData, setFormData] = useState({
      text: "",
      medias: null,
      createdAt:"",
      background:"",
      color:"",
      group:"",
      user: user?.id, // Giả sử user_id là 1, bạn có thể thay đổi giá trị này tùy theo ngữ cảnh ứng dụng của bạn
    });
    
    //hiển thị danh sách user
    const [users,setUsers] = useState([]);
    useEffect(() => {
      const fetchUsers = async () =>{
        try{
          // const response = await api.getUser();
          setUsers(response.data)
        }catch(error){
          console.log(error);
        }
      };
      fetchUsers();
    },[])
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
      setFormData({ ...formData, media: null });
    }
  
    const fileInputRef = useRef(null);
    
    const handleChange = (event) => {
      if (event.target.files) {
        const filesArray = Array.from(event.target.files);
        setSelectedFiles(prevFiles => [...prevFiles, ...filesArray]); // Cập nhật danh sách các tệp đã chọn
        setFormData({ ...formData, medias: filesArray[0] });
      } else {
        const value = event.target.value;
        setFormData({ ...formData, [event.target.name]: value });
      }
    };
    const handleChangePost = (e) => {
      const value  = e.target.value;
      setFormData({ ...formData, [e.target.name]: value });
    };
    const handleSubmit = async (e) => {
      e.preventDefault();
      // Cập nhật giá trị của text trong formData dựa trên nội dung của div
      const inputElement = document.getElementById("myInput");
      const userInput = inputElement.textContent?.trim() || "";
      setFormData({ ...formData, 
        text: userInput, 
        color: selectedStyle.color,
        background: selectedStyle.background,
        medias:formData.medias,
        group:formData.group
      });

      // Gửi dữ liệu lên server
      try {

        await create(formData)
    
        handleCloseModal()
      } catch (error) {
        console.error(error)
      }
    };
    function handleInput() {
        const inputElement = document.getElementById("myInput");
        const ulElement = document.getElementById("myUL");
        let userInput = inputElement.textContent?.trim() || ""; 
        // Loại bỏ các khoảng trắng thừa
        userInput = userInput.replace(/\s+/g, ' ');
        setContent(userInput.length > 0);
        let hiddenInputValue = ""; // Chuỗi giá trị cho tường ẩn input
        // Lưu vị trí của caret
        const caretPosition = getCaretPosition(inputElement);
        // Sử dụng getFilterText để trích xuất phần mong muốn
        const filteredText = getFilterText(userInput);
        // Xử lý chức năng ô input
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
      
        // Đặt nội dung vào commentInput ngay cả khi không chọn danh mục từ danh sách
        const commentInputElement = document.getElementById("commentInput");
  
        // Lấy tất cả các nội dung trong div
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
        // Cập nhật giá trị của text trong formData dựa trên nội dung của div
        setFormData({ ...formData, text: allContent.trim() });
  
        // Đặt giá trị cho tường ẩn input
        commentInputElement.value = allContent.trim();
      
        // Khôi phục vị trí của caret
        setCaretPosition(inputElement, caretPosition);
    }
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
  function selectName(selectedName) {
      const currentInput = document.getElementById("myInput");
      let currentValue = currentInput.textContent?.trim() || "";
    
      // Loại bỏ các chuỗi '&nbsp;' trong văn bản hiện tại
      currentValue = currentValue.replace(/&nbsp;/g, '');
    
      // Loại bỏ các khoảng trắng thừa
      currentValue = currentValue.replace(/\s+/g, ' ');
    
      const newValue = getOverwrittenText(currentValue, selectedName);
    
      // Đặt giá trị của commentInput ngay khi chọn danh mục từ danh sách
      const commentInputElement = document.getElementById("commentInput");
      commentInputElement.value = newValue;
    
      // Xóa nội dung hiện tại của div
      currentInput.innerHTML = "";
    
      // Tạo một đối tượng DocumentFragment để lưu trữ các nút con mới
      const fragment = document.createDocumentFragment();
    
      // Tách newValue thành các từ và lặp qua từng từ
      newValue.split(' ').forEach(word => {
          // Kiểm tra xem từ có chứa '@' không và có nằm trong danh sách không
          if (word.startsWith('@') && users.some(user => user.username === word.slice(1))) {
              // Tạo một thẻ span mới để bọc từ được chọn
              const span = document.createElement("span");
              span.classList.add("selected");
              span.textContent = word + " ";
              fragment.appendChild(span);
          } else {
              // Nếu từ không chứa '@' hoặc không nằm trong danh sách, thêm vào DocumentFragment như văn bản thường
              fragment.appendChild(document.createTextNode(word + " "));
          }
      });
    
      // Thêm các nút con mới vào div
      currentInput.appendChild(fragment);
    
      // Khôi phục vị trí của caret
      setCaretPosition(currentInput, currentInput.childNodes.length);
    }
    
    function getOverwrittenText(currentText, newText) {
      const atIndex = currentText.lastIndexOf("@");
      if (atIndex !== -1) {
          const textBeforeAt = currentText.substring(0, atIndex);
          return textBeforeAt + "@" + newText + " ";
      }
      return currentText + newText + " ";
    }
    const handleFocus = (e) => {
        if (e.target.textContent === "") {
          e.target.setAttribute("data-text", "");
        }
      };
    
      const handleBlur = (e) => {
        if (e.target.textContent === "") {
          e.target.setAttribute("data-text", "What do you think ?");
        }
      };
  return (
    <form onSubmit={handleSubmit} encType="multipart/form-data">
        <div className="modalpost-nameanh">
            <div className="model-showbinhluananhdaidien"></div>
            <div className="modalpost-name">Name</div>
        </div>
        {selectedFiles.length ?(
          <div className="post-testandshowimage">
          <input type="hidden" name="text" id="commentInput" value={formData.text} onChange={(e) => handleChangePost(e)} />
          <div className={divClass.color !== 'inherit' ? 'modalpost-divcommentcolore' : 'modalpost-divcommentimg'} style={{'--postcolor': divClass?.color, '--postbg': divClass?.background} }>
            <div className="inputCreatePost" id="myInput" contentEditable="true"  onInput={handleInput} onPaste={handlePaste} data-text="What do you think ?" onFocus={handleFocus} onBlur={handleBlur}></div>
          </div>
          
          <ul id="myUL" className="myul" >
            {users.map((user) => (
              <li onClick={() => selectName(user.name)} data-link="http://abakiller"><a href="#">{user.name}</a></li>
            ))}
          </ul>
          {selectedFiles.length > 0 && (
              <div className="modalpost-image">
                  {selectedFiles.map((file, index) => (
                  <div>
                    <button className="modalpost-xoafile" onClick={() => handleRemoveFile(index)}><FaXmark className="modalpost-iconxoafile" /></button>
                    <div className="modalpost-imagechil" key={index}>
                      <img src={URL.createObjectURL(file)} alt={`Selected file ${index}`} width="100%" height="100%"/>
                  </div>
                  </div>
                  
                  ))}
              </div>
          )}
          </div>
        ):(
        <div className="">
        <input type="hidden" name="text" id="commentInput" value={formData.text} onChange={(e) => handleChangePost(e)} />
        <div className={divClass.color !== 'inherit' ? 'modalpost-divcommentcolore' : 'modalpost-divcomment'} style={{'--postcolor': divClass?.color, '--postbg': divClass?.background} }>
          <div className="inputCreatePost" id="myInput" contentEditable="true"  onInput={handleInput} onPaste={handlePaste} data-text="What do you think ?"></div>
        </div>
        
        <ul id="myUL" className="myul" >
          {users.map((user) => (
            <li onClick={() => selectName(user.name)} data-link="http://abakiller"><a href="#">{user.name}</a></li>
          ))}
        </ul>
        
        </div>
        )} 
        {!selectedFiles.length && (
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
                { color: '#fff', background: '#8224e3' },
                { color: 'black', background: 'aqua' },
                { color: '#fff', background: 'brown' },
                { color: '#fff', background: 'palevioletred' },
                { color: '#fff', background: 'red' },
                { color: '#000', background: 'rgb(153, 255, 0)' },
                { color: '#fff', background: 'rgb(40, 56, 179)' },
                { color: '#fff', background: 'rgb(0, 157, 255)' },
                { color: '#fff', background: 'rgb(33, 68, 91)' }
              ].map((colorObj,index)=>(
                <div key={index} className={`modalpost-fountcolor${index + 1}${selectedColor === index ? ' borderpostcolor': ''}`}
                onClick={() => handleClassChange(index,colorObj)}>
                  1
                </div>
              ))}
            </div>
          )}    
          
        </div>
        )}
        <div >
            <button className={`modalpost-buttonmedia${divClass.color !== 'inherit' ? 'disable': ''}`} onClick={(e) =>{
              e.preventDefault();
              if(divClass.color === 'inherit'){
                fileInputRef.current?.click()
              }
            }} disabled={divClass.color !== 'inherit'}> 
            <span className="modalpost-media">
                <LuLink className="modalpost-iconmedia" />
            </span>
            <span className="modalpost-font">Attach media</span>
            </button>
            <input name="medias" onChange={handleChange}  ref={fileInputRef} type="file" accept="image/png,image/jpg,video/mp4" multiple />
        </div>
        
        <input type="hidden" name="color" value={formData.color} onChange={(e) => handleChangePost(e)}/>
        <input type="hidden" name="background" value={formData.background} onChange={(e) => handleChangePost(e)}/>
        <div className="modalpost-postst ">
            
            <div className="modalpost-poststright">
            <input className={`modalpost-buttonpost${!content ? 'disable' : ''}`} type="submit" disabled={!content} value={isLoading ? "Creating Post" : "Post"}/>
            </div>
        </div>
        
    </form>
  );
};

export default AddPost;