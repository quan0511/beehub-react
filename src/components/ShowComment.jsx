
import { useState,useRef, ChangeEvent,useEffect } from 'react';
import Modal from 'react-bootstrap/Modal';
import { RiDeleteBin6Line } from "react-icons/ri";
import { FaHouse,FaImages,FaRegHeart,FaHeart,FaXmark  } from "react-icons/fa6";
import { FaRegCommentAlt } from "react-icons/fa";
import {Link} from "react-router-dom";
import { PiShareFat,PiTelevisionSimpleBold } from "react-icons/pi";
import { MdGroups2,MdModeEdit,MdReport } from "react-icons/md";
import { BsThreeDots } from "react-icons/bs";
import '../css/showcomment.css';
import { useSelector } from 'react-redux';
import { selectCurrentUser } from '../auth/authSlice';
import { useCommentQuery, useDeletePostCommentMutation, useDeletePostReCommentMutation, usePostCommentMutation, usePostReCommentMutation, useUpdateCommentMutation, useUpdateReCommentMutation } from '../post/postApiSlice';
function ShowComment({ postIdco }){
  const {data:getComment} = useCommentQuery({id:postIdco.id})
  const [createComment] = usePostCommentMutation();
  const [editComment] = useUpdateCommentMutation();
  const [deleteComment] = useDeletePostCommentMutation();
  const [createReComment] = usePostReCommentMutation();
  const [editReComment] = useUpdateReCommentMutation();
  const [deleteReComment] = useDeletePostReCommentMutation();
  const user = useSelector(selectCurrentUser);
  const [replyStates, setReplyStates] = useState({});
  const [content, setContent] = useState(false);
  const [postId, setPostId] = useState(null);
  const [toggleComment, setToggleComment] = useState({});
    const handleToggleComment = (commentId) =>{
      setToggleComment((prevState) =>({
        ...prevState,
        [commentId]:!prevState[commentId],
      }));
    }
    const calculateTimeDifference = (createdAt) => {
      // Chuyển đổi mảng createdAt thành một đối tượng Date
      const createdDate = new Date(createdAt[0], createdAt[1] - 1, createdAt[2], createdAt[3], createdAt[4], createdAt[5]);
      
      // Lấy thời gian hiện tại
      const currentDate = new Date();
      
      // Tính toán sự khác biệt thời gian giữa thời điểm hiện tại và thời điểm tạo bài đăng
      const timeDifference = currentDate.getTime() - createdDate.getTime();
    
      // Chuyển đổi sự khác biệt thời gian từ mili giây thành giờ, phút và giây
      const secondsDifference = Math.floor(timeDifference / 1000);
      const minutesDifference = Math.floor(secondsDifference / 60);
      const hoursDifference = Math.floor(minutesDifference / 60);
      const daysDifference = Math.floor(hoursDifference / 24);
    
      // Trả về kết quả dưới dạng chuỗi
      if (daysDifference > 0) {
        return `${daysDifference} days`;
      } else if (hoursDifference > 0) {
        return `${hoursDifference} hours`;
      } else if (minutesDifference > 0) {
        return `${minutesDifference} minutes`;
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
    //hiển thị post theo id
    const [post,setPost] = useState([]);
    useEffect(() => {
    const fetchPost = async (id) => {
      try {
        const response = await api.findPostById(id);
        setPost([response.data]);
        fetchComment(id);
      } catch (error) {
        console.log(error);
      }
    };

    const fetchComment = async (postId) => {
      try {
        const response = await api.getCommentByPostId(postId);
        setComments(response.data);
      } catch (error) {
        console.error('Error fetching post:', error);
      }
    };

    if (postIdco) {
      fetchPost(postIdco);
    }
  }, [postIdco]);      
    const [commentId, setCommentId] = useState(null);
    //hiển thị danh sách user
    const [users,setUsers] = useState([]);
    useEffect(() => {
      const fetchUsers = async () =>{
        try{
          const response = await api.getUser();
          setUsers(response.data)
        }catch(error){
          console.log(error);
        }
      };
      fetchUsers();
    },[])
    // hiển thị comment
    const [comments, setComments] = useState([]);
      const fetchComment = async (postId) => {
          try {
              const response = await api.getCommentByPostId(postId);
              setComments(response.data);
              setCommentId(response.data.postId);

          } catch (error) {
              console.error('Error fetching post:', error);
          }
      };
      
      const [comment,setComment] = useState([]);
      //hiển thị comment theo id
      const fetchCommentById = async (id) =>{
        try{
          const response = await api.getCommentById(id);
          setComment([response.data]);
          setCommentId(response.data.id)
          setFormEditComment({
            ...formEditComment,
            id:response.data.id,
            comment: response.data.comment,
          })
          
        }catch (error){
          console.log(error);
        }
      };
    const [editCommentId, setEditCommentId] = useState(null);
    const handleShowEditComment = (commentId) =>{
      const commentToEdit = comments.find(comment => comment.commentId === commentId);
      setEditCommentId((prevEditComment) =>(
        prevEditComment === commentId ? null:commentId
      ));
      if(commentToEdit){
        setFormEditComment({
          id:commentToEdit.id,
          comment:commentToEdit.comment,
          createdAt:commentToEdit.createdAt,
          post:commentToEdit.post,
        })
      }
      fetchCommentById(commentId);
    }
    const [formEditComment,setFormEditComment] = useState({
      id:"",
      comment: "",
      createdAt:"",
      post:postIdco,
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
      api.editPostComment(updateComment)
        .then((response) =>{
          console.log(response);
          handleCancelEditComment();
          fetchComment(postIdco);
        })
        .catch((error)=> {
          console.log(error);
        })
    }
    const handleCancelEditComment = () => {
      setEditCommentId(null);
    };
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
    
    const [formComment, setFormComment] = useState({
      comment: "",
      createdAt:"",
      post: postIdco.id,
      user:user?.id,
    })
    const handleChangeComment = (e) =>{
      const value = e.target.value;
      setFormComment({...formComment,[e.target.name]: value})
    }
    const handleSubmitComment = async (e) => {
      e.preventDefault();
      // Cập nhật giá trị của text trong formData dựa trên nội dung của div
      const inputElement = document.getElementById("newMyInput") ;
      const userInput = inputElement.textContent?.trim() || "";
      setFormComment({...formComment, comment: userInput});
      console.log(formComment);
      try {
        await createComment(formComment)
      } catch (error) {
        console.error(error)
      }
    };
    
    const [toggleReComment,setToggleReComment] = useState({});
    const handleToggleReComment = (reCommentId) =>{
      setToggleReComment((prevState) => ({
        ...prevState,
        [reCommentId]:!prevState[reCommentId],
      }));
    }
    //hiển thị recomment
    const [recomments, setRecomments] = useState([]);
    const [viewReplies, setViewReplies] = useState({});
      const fetchReComment = async (commentId) =>{
        try{
          const response = await api.getReCommentByPostId(commentId);

          setRecomments(prevState => ({
            ...prevState,
            [commentId]: response.data
          }));
        }catch(error){
          console.log(error);
        }
      };
    //hiển thị recomment theo id
    const [reComment,setReComment] = useState([]);
    const fetchReCommentById = async(id) =>{
      try{
        const response = await api.getReCommentId(id);
        setReComment([response.data]);
        setRecomments(response.data.id);
        setFormEditReComment({
          ...formEditReComment,
          id:response.data.id,
          reaction:response.data.reaction,
        })
      }catch(error){
        console.log(error);
      }
    }
    const [editReCommentId,setEditReCommentId] = useState(null);
    const handleShowEditReComment = (reCommentId, commentId) => {
      const commentRecomments = recomments[commentId]; // Lấy mảng recomment của comment tương ứng
      if (commentRecomments) {
        const reCommentToEdit = commentRecomments.find(reComment => reComment.id === reCommentId); // Tìm recomment trong mảng
        setEditReCommentId((prevEditReComment) => (
          prevEditReComment === reCommentId ? null : reCommentId
        ));
        if (reCommentToEdit) {
          setFormEditReComment({
            id: reCommentToEdit.id,
            reaction: reCommentToEdit.reaction,
            createdAt: reCommentToEdit.createdAt,
            post: reCommentToEdit.post.id,
            postComment: reCommentToEdit.postComment.id,
          });
        }
         // Gọi API để lấy chi tiết recomment nếu cần
      }
    };
      const handleViewReComments = (commentId) => {
        setViewReplies(prevState =>({
          ...prevState,
          [commentId]:true,
        }));
        fetchReComment(commentId);
      };
      const handleHideReComments = (commentId) => {
        setViewReplies(prevState =>({
          ...prevState,
          [commentId]:false,
        }));
      };
      const [formEditReComment,setFormEditReComment] = useState({
        id:"",
        reaction:"",
        createdAt:"",
        post:postIdco,
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
      const handleSubmitEditReComment = async(e,post,comment) =>{
        e.preventDefault();
        const inputElement = document.getElementById(`editReMyInput-${formEditReComment.id}`);
        const userInput = inputElement.textContent?.trim() || "";
        const updateReComment = {
          ...formEditReComment,
          reaction:userInput
        };
        console.log(updateReComment);
        api.editPostReComment(updateReComment)
          .then((response) =>{
            console.log(response);
            handleCancelEditReComment();
            fetchComment(postIdco);
            fetchReComment(comment.id);
          })
      }
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
          originalReaction: userInput,
          post: post.id, // Truyền ID của bài đăng
          postComment: comment.id, // Truyền ID của bình luận
        };
        api.createPostReComment(updatedFormReComment)
          .then((response) => {
            console.log(response);
            // Sau khi tạo bình luận thành công, đặt lại giá trị của formReComment và làm sạch input
            setFormReComment({
              ...formReComment,
              reaction: ""
            });
            inputElement.textContent = "";
            fetchComment(postIdco);
            fetchReComment(comment.id);
          })
          .catch((error) => {
            console.log(error);
          });
      };
    const [countReComment, setCountReComment] = useState({});
    useEffect(() => {
      const fetchCountReComment = async () =>{
        const ReCommentCountData = {};
        for(const comment of comments){
          try{
            const response = await api.countReaction(comment.id);
            ReCommentCountData[comment.id] = response.data;
          }catch(error){
            console.error(error);
          }
        }
        setCountReComment(ReCommentCountData);
      }
      fetchCountReComment();
    },[comments])
    const [posts,setPosts] = useState([]);
    const fetchData = async () => {
      try {
        const response = await api.getPost();
        setPosts(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    useEffect(() => {
      fetchData();
    }, []);
    const [currentPostId,setCurrentPostId] = useState(null);
    const [showLike, setShowLike] = useState({});
    const handleOpenLikeModal = (postid) => {
      setShowLike((prevState) => ({
        ...prevState,
        [postid]:true
      }));
      fetchLikePost(postid);
      setCurrentPostId(postid);
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

// const isLiked = (postId) => {
//   return likes[postId] === true; // Check if the post is liked by the user
// };
    return(
        <div className="modalshowpostandcomment">
              <div key={postIdco.id} className="modelkhung">           
                <div className="modalright-img ">
                <Modal.Header  closeButton>
                  <Modal.Title className="modaltitleshowcomment">
                    Post
                  </Modal.Title>
                </Modal.Header>
                <Modal.Body className="modalbodyshowcomment">
                <div className="modalshowcomment-anhtentime">
                      <div className="modalanhdaidien">
                      </div>
                      <div className="modalnametime">
                        <div className="modalname">{postIdco.user_username}</div>
                        <div className="modaltime">{postIdco.create_at}</div>
                      </div>
                    </div>
                    
                  <div className="modalshowcommentanhcomment">
                  {postIdco.media?(
                    <div className="modalpostimg">
                      <img alt="" src={postIdco.media.media} style={{width: '100%', height: '100%'}}/>
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
                    {commentTagLink(postIdco.text) ? renderCommentWithLink(postIdco.text) : postIdco.text}
                  </div>
                  ):(
                    <div className="modal-showcomment">
                    {commentTagLink(postIdco.text) ? renderCommentWithLink(postIdco.text) : postIdco.text}
                    </div>
                  )}
                      </div>
                    )}
                  <div className="postuser-alllikeModal" onClick={() => handleOpenLikeModal(post.id)}>
                  {/* {EmoPost[postIdco.id] && 
                    Array.from(new Set(EmoPost[postIdco.id].map(item => item.emoji))).slice(0,3).map((emoji, index) => (
                      <span key={index} className="iconEmo">
                        {emoji}
                      </span>
                    ))
                  } */}
                    {/* <div className="heart-number">{countLikes[postIdco.id]}</div> */}
                  </div>
                  <div className="modalshowcommentlikehr">
                  <hr className="hr-comment"/>
                    <div className="posticonbinhluan-allModalshowcomment" >
                    
                    <div className="posticonbinhluan-like">
                    {/* <div className="toggleEmoji">
                    {isLiked(postIdco.id) ? (
                      <>
                      <span onClick={() => handleChangeUpdateLike(postIdco.id,"👍",1)}>👍</span>
                      <span onClick={() => handleChangeUpdateLike(postIdco.id,"❤️",1)}>❤️</span>
                      <span onClick={() => handleChangeUpdateLike(postIdco.id,"😂",1)}>😂</span>
                      <span onClick={() => handleChangeUpdateLike(postIdco.id,"😡",1)}>😡</span>
                      <span onClick={() => handleChangeUpdateLike(postIdco.id,"😢",1)}>😢</span>
                      </>
                    ):( 
                      <>
                      <span onClick={() => handleChangeAddLike(postIdco.id,"👍")}>👍</span>
                      <span onClick={() => handleChangeAddLike(postIdco.id,"❤️")}>❤️</span>
                      <span onClick={() => handleChangeAddLike(postIdco.id,"😂")}>😂</span>
                      <span onClick={() => handleChangeAddLike(postIdco.id,"😡")}>😡</span>
                      <span onClick={() => handleChangeAddLike(postIdco.id,"😢")}>😢</span>
                      </>
                    )}
                    </div> */}
                    {/* {isLiked(post.id) ? (             
                      <span onClick={() => handleChangeRemoveLike(postIdco.id)}>{emojis[postIdco.id]}</span>
                    ) : (
                      <span onClick={() => handleChangeAddLike(postIdco.id,'👍')}>👍</span>
                    )} */}
                      <div className="iconbinhluantest">Like</div>                    
                    </div>
                    <div key={postIdco.id} className="posticonbinhluan-comment">
                      <FaRegCommentAlt className="iconbinhluanall"/>
                      <div className="iconbinhluantest">Comment</div>
                    </div>
                    <div className="posticonbinhluan-share">
                      <PiShareFat className="iconbinhluanall"/>
                      <div className="iconbinhluantest">Share</div>
                    </div>
                  </div>
                  <hr className="hr-comment"/>
                </div>                
                  <div className="modalShowComment-showbinhluan">
                  {getComment?.map((comment) => (
                    <div key={comment.id} className="modal-showbinhluankhung">
                      <div className="modalthreedotcomment">
                        <div className="modal-showbinhluankhungcon">
                          <div className="model-showbinhluananhdaidien"></div>
                          <div className="modalbinhluanthreedottraloi" style={{display:editCommentId !== comment.id ? 'block':'none'}}>
                            <div className="modalanhbinhluanithreedot">
                              <div className="modal-showbinhluantencomment" >
                                  <div className="modal-showbinhluanname">{comment.user.name}</div>
                                  <div className="modal-showbinhluancomment">
                                    {commentTagLink(comment.comment) ? renderCommentWithLink(comment.comment) : comment.comment}
                                  </div>
                              </div>
                              {comment.user.id === 1 &&(
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
                                  {users.map((user) => (
                                    <li onClick={() => selectName(user.name, `editCommentInput-${comment.id}`, `editMyInput-${comment.id}`)}  data-link="http://abakiller"><a href="#">{user.name}</a></li>
                                  ))}
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
                          <div className="selectedfunction" >
                            <div><RiDeleteBin6Line className="iconefunctionpost"/></div>
                            <div className="fonttextfunctionpost">Delete Comment</div>
                          </div>
                        </div>
                      )}
                      {countReComment[comment.id] ? (
                        <div className="modalshowhiderecomment">
                          {viewReplies[comment.id] ? (
                            <div className="showReComment" onClick={() => handleHideReComments(comment.id)}>Ẩn trả lời</div>
                          ):(
                            <div className="showReComment" onClick={() => handleViewReComments(comment.id)}>xem {countReComment[comment.id]} trả lời</div>
                          )}
                        </div>
                      ):(
                        <div></div>
                      )}
                      
                      {viewReplies[comment.id] && recomments[comment.id] && recomments[comment.id].map((recomment)=>(
                      <div className="model-showrecomment">
                        <div className="modalthreedotrecomment">
                          <div className="modal-showrecommentkhungcon">
                            <div className="model-showrecommentanhdaidien"></div>
                            <div className="modarecommetthreedottraloi" style={{display:editReCommentId !== recomment.id ? 'block':'none'}}>
                              <div className="modalanhrecommentthreedot">
                                <div className="modal-showrecommenttencomment">
                                    <div className="modal-showrecommentname">{recomment.user.name}</div>
                                    <div className="modal-showrecommentcomment">
                                    {commentTagLink(recomment.reaction) ? renderCommentWithLink(recomment.reaction) : recomment.reaction}
                                    </div>
                                </div>
                                {recomment.user.id === 1 &&(
                                <div className="buttonthreedotrecomment" onClick={() =>{
                                  handleToggleComment(recomment.id)
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
                              <form onSubmit={(e) => handleSubmitEditReComment(e, post, comment)}>
                                <input type="hidden" name="id" value={formEditReComment.id} onChange={(e) => handleChangeEditComment(e)} />
                                <input type="hidden" name="reaction" value={formEditReComment.reaction} onChange={(e) => handleChangeEditComment(e)}  id={`editReCommentInput-${recomment.id}`} />
                                <div>
                                <div className="divEditRecomment" id={`editReMyInput-${recomment.id}`} contentEditable="true"  onInput={() => handleInput(`editReCommentInput-${recomment.id}`, `editReMyInput-${recomment.id}`,`reComment-${recomment.id}`)}>{formEditReComment.reaction}</div>
                                <ul id={`editReMyInput-${recomment.id}-ul`} className="myul" >
                                  {users.map((user) => (
                                    <li onClick={() => selectName(user.name, `editReCommentInput-${recomment.id}`, `editReMyInput-${recomment.id}`)}  data-link="http://abakiller"><a href="#">{user.name}</a></li>
                                  ))}
                                </ul>
                                </div>
                                <input type="submit" className="commentEditRecomment" value="Save"/>
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
                          <div className="selectedfunction" >
                            <div><RiDeleteBin6Line className="iconefunctionpost"/></div>
                            <div className="fonttextfunctionpost">Delete Reply Comment</div>
                          </div>
                        </div>
                      )}
                      </div>
                      ))}
                      {replyStates[comment.id] &&  (
                      <div className="div-ReComment">
                        <form onSubmit={(e) => handleSubmitReComment(e, post, comment)}>
                          <input type="hidden" name="reaction" value={formReComment.reaction} onChange={(e) => handleChangeReComment(e)} id="RecommentInput" />
                          <div>
                          <div className="divRecomment" id="RemyInput" contentEditable="true" onInput={() => handleInput('RecommentInput', 'RemyInput', 'reComment')}></div>
                          <ul id="RemyInput-ul" className="myul" >
                            {users.map((user) => (
                              <li onClick={() => selectName(user.name, 'RecommentInput', 'RemyInput')} data-link="http://abakiller"><a href="#">{user.name}</a></li>
                            ))}
                          </ul>
                          </div>
                          <input type="hidden" name="createdAt" value={formReComment.createdAt} onChange={(e) => handleChangeReComment(e)} />
                          <input type="submit" className="commentRecomment" value="Comment"/>
                        </form>
                      </div>
                      )}                                
                    </div>
                    ))}              
                  </div>
                  </div>              
                  <form onSubmit={handleSubmitComment}>
                    <input type="hidden" name="comment" value={formComment.comment} onChange={(e) => handleChangeComment(e)} id="newCommentInput" />
                    <div>
                    <div className="divcomment" id="newMyInput" contentEditable="true" onInput={() => handleInput('newCommentInput', 'newMyInput','comment')}></div>
                    <ul id="newMyInput-ul" className="myul" >
                    {users.map((user) => (
                      <li onClick={() => selectName(user.name, 'newCommentInput', 'newMyInput')} data-link="http://abakiller"><a href="#">{user.name}</a></li>
                    ))}
                  </ul>
                    </div>
                    <input type="hidden" name="post" value={formComment.post} onChange={(e) => handleChangeComment(e)}/>
                    <input type="hidden" name="createdAt" value={formComment.createdAt} onChange={(e) => handleChangeComment(e)} />
                    <input type="submit" className="commentpost" value="Comment"/>
                  </form>
                  
                </Modal.Body>
                </div>
              </div>
        </div>
    )
}
export default ShowComment;