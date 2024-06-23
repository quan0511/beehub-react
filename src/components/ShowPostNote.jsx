import React, {  useState } from "react";
import { Button, Col, Form, Image, Row } from "react-bootstrap";
import Modal from 'react-bootstrap/Modal';
import { ChatLeft, Dot, GearFill, GlobeAsiaAustralia,  LockFill,  PeopleFill, Reply, Shuffle, ThreeDots } from 'react-bootstrap-icons';
import APIService from "../features/APIService";
import { Link, json } from "react-router-dom";
import '../css/post.css';
import { MdReport,MdModeEdit } from "react-icons/md";
import '../css/showcomment.css';
import { RiDeleteBin6Line } from "react-icons/ri";
import { selectCurrentToken, selectCurrentUser } from "../auth/authSlice";
import { useAddLikePostMutation, useCheckLikeQuery, useCommentQuery, useCountCommentQuery, useCountLikeQuery, useCountReactionByPostQuery, useCountShareQuery, useDeleteLikeMutation, useDeletePostMutation, useFetchPostQuery, useGetEnumEmoQuery, useGetLikeUserQuery, useGetUserFriendQuery, usePostCommentMutation, useSharePostMutation, useUpdateLikePostMutation } from "../post/postApiSlice";
import { useDispatch, useSelector } from "react-redux";
import { Formik } from "formik";
import { refresh,resetData,showMessageAlert } from "../features/userSlice";
import ListLike from "./ListLike";
import EditPost from "./EditPost";
import ShareForm from "./ShareForm";
import SharePost from "./SharePost";
import { useSettingPostMutation } from "../features/userApiSlice";
import ModalReport from "./ModalReport";
import Comment from "./Comment";
import { IoMdSend } from "react-icons/io";
import SharePostNote from "./SharePostNote";
function ShowPostNote ({post, page,refetchHomePage,refectGetNoteByUser,refetchCheckSeenNote,calculateTimeDifference}){
  const user = useSelector(selectCurrentUser);
  const [showPostModal, setShowPostModal] = useState({});
  //const {data: post} = useFetchPostQuery({id:post.id})
  const token = useSelector(selectCurrentToken);
    const [addLike] = useAddLikePostMutation();
    const dispatch = useDispatch();
    const [createComment] = usePostCommentMutation();
    const [deleteLike] = useDeleteLikeMutation();
    const [updateLike] = useUpdateLikePostMutation();
    const [deletePost] = useDeletePostMutation();
    const [sharePost] = useSharePostMutation();
    const {data:getUserFriend} = useGetUserFriendQuery({id:user?.id})
    const {data:getComment,refetch:refetchGetComment} = useCommentQuery({id:post.id})
    const {data: countShare,refetch:refetchCountShare} = useCountShareQuery({id:post.id}) 
    const {data:getPostById} = useFetchPostQuery({id:post.id});
    const {data:countComment,refetch:refetchCountComment} = useCountCommentQuery({id:post.id});
    const {data:countReacitonByPost,refetch:refetchCountReactionByPost} = useCountReactionByPostQuery({id:post.id});
    const { data: getLikeUser, refetch: refetchGetLikeUser } = useGetLikeUserQuery({ id: post.id });
    const { data: countLike, refetch: refetchCountLike } = useCountLikeQuery({ id: post.id });
    const { data: checkLike, refetch: refetchCheckLike } = useCheckLikeQuery({ userid: user?.id, postid: post.id });
    const { data: getEnumEmo, refetch: refetchGetEnumEmo } = useGetEnumEmoQuery({ userid: user?.id, postid: post.id });
    const total = (countReacitonByPost && countComment) ? countReacitonByPost + countComment : countComment;
    const [settingPost, {isLoading2, isSuccess2,isError2}] = useSettingPostMutation();
    const [movePostId,setMovePostId] = useState(null);
    const [showReport,setShowReport] = useState(false);
    const [showEditPost, setShowEditPost] = useState({});
    const [showLike, setShowLike] = useState({});
    const [showSettingPost, setShowSettingPost] = useState(false);
    const [content, setContent] = useState(false);
    let reset = useSelector((state)=> state.user.reset);
    const handleCloseEditPost = (id) => {
      setShowEditPost((prevState) => ({
        ...prevState,
        [id]:false,
      }))
    };
    const formatcolor = (color) =>{
      if(color && color.length ===8){
        return `#${color.slice(2)}`;
      }
      return color;
    }
    const [showShareModal, setShowShareModal] = useState({});
    const handleShareClose = (id) => {
      setShowShareModal((prevState) => ({
        ...prevState,
        [id]:false,
      }))
    };
    const handleShareShow = (id) =>{
      setFromSharePost({
        id:getPostById.id,
        text: getPostById.text,
        medias: getPostById.mediaUrl,
        timeshare: getPostById.createdAt,
        background: getPostById.background,
        color: getPostById.color,
        user:user?.id,
        usershare:getPostById.user
      });
      setShowShareModal((prevState) =>({
      ...prevState,
      [id]:true,
    }));
  }
    const [currentPostId,setCurrentPostId] = useState(null);
    const handleOpenLikeModal = (postid) => {
      setShowLike((prevState) => ({
        ...prevState,
        [postid]:true
      }));
      setCurrentPostId(postid);
    };
    const handleCloseLikeModal = (postid) => {
      setShowLike((prevState) => ({
        ...prevState,
        [postid]:false
      }));
      setCurrentPostId(null);
    };
    const [formComment, setFormComment] = useState({
        comment: "",
        createdAt:"",
        post: post.id,
        user:user?.id,
    })
    const handleChangeComment = (e) =>{
        const value = e.target.value;
        setFormComment({...formComment,[e.target.name]: value})
    }
    const handleSubmitComment = async (e) => {
        e.preventDefault();
        const inputElement = document.getElementById("newMyInput") ;
        const userInput = inputElement.textContent?.trim() || "";
        setFormComment({...formComment, comment: userInput});
        try {
          await createComment(formComment)
          setFormComment((prevState)=>({
            ...prevState,
            comment:"",
          }))
          inputElement.textContent = "";
          refetchGetComment();
          refetchCountComment();
        } catch (error) {
          console.error(error)
        }
      };
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
    const getSettingType=()=>{
        switch(post.setting_type){
            case 'FOR_FRIEND':
                return <span >
                    <PeopleFill size={15} /> For Friend
                </span>
            case 'HIDDEN':
                return <span>
                    <LockFill size={15} /> Hidden
                 </span>
            case 'PUBLIC':
                return <span>
                    <GlobeAsiaAustralia size={15} /> Public
                </span>
            default:
                return <span>
                    <GlobeAsiaAustralia size={15} /> Public
                </span>
        }
    }
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
    const [formSharePost,setFromSharePost] = useState({
      text:"",
      media:null,
      timeshare:"",
      background:"",
      color:"",
      user:user?.id,
      usershare:"",
    });
    const handleShowEditPost = (id) =>{
      setFromUpdatePost({
        id:getPostById.id,
        text: getPostById.text,
        medias: getPostById.mediaUrl,
        createdAt: getPostById.createdAt,
        background: getPostById.background,
        color: getPostById.color,
        user:getPostById.user,
        group: getPostById.group !== null ? getPostById.group : 0
      });
    setShowEditPost((prevState) =>({
      ...prevState,
      [id]:true,
    }));
  }
  const [formUpdatePost,setFromUpdatePost] = useState({
    id:"",
    text:"",
    media:null,
    createdAt:"",
    background:"",
    color:"",
    user:user?.id,
    group:""
  });
  const handleDeletePost = async (id) => {
    const isConfirmed = window.confirm("Are you sure you want to delete this post?");
    if (isConfirmed) {
      try {
        await deletePost({id});
        refetchCountShare();
        dispatch(showMessageAlert("Delete post successfully"));
        dispatch(resetData());
        
      } catch (error) {
        console.log(error);
      }
    }
  };

  const [togglePost, setTogglePost] = useState({});
  const handleTogglePost = (postId) =>{
    setTogglePost((prevState) =>({
      ...prevState,
      [postId]:!prevState[postId],
    }));
  }
  const handleChangeAddLike = async (postId, enumEmo) => {
    try {
      const response = await addLike({
        user: user?.id,
        post: postId,
        enumEmo: enumEmo,
      });
      refetchGetLikeUser();
      refetchCountLike();
      refetchCheckLike();
      refetchGetEnumEmo();
      refectGetNoteByUser();
      refetchCheckSeenNote();
      console.log(response);
    } catch (error) {
      console.error('Error occurred while liking:', error);
    }
  };
  const handleChangeUpdateLike = async (postId, enumEmo) => {
      try {
        await updateLike({
          user: user?.id, // Assuming user ID is 1
          post: postId,
          enumEmo: enumEmo,
        });
        refetchGetLikeUser();
        refetchCountLike();
        refetchCheckLike();
        refetchGetEnumEmo();
      } catch (error) {
        console.error('Error occurred while updating like:', error);
      }
  };
  const handleChangeRemoveLike = async (postId) => {
      try {
        console.log(user?.id, postId);   
        const response = await deleteLike({id: user?.id, postId}); // Giả sử ID người dùng là 1
        refetchGetLikeUser();
        refetchCountLike();
        refetchCheckLike();
        refetchGetEnumEmo();
      } catch (error) {
        console.error('Đã xảy ra lỗi khi gỡ bỏ lượt thích:', error);
      }
  };
  const handleFocus = (e) => {
    const divContent = e.target.textContent.trim();
    if (divContent === "" || divContent === e.target.getAttribute("data-text")) {
      e.target.textContent = ""; 
    }
  };
  const handleBlur = (e) => {
    const divContent = e.target.textContent.trim();
    if (divContent === "") {
      e.target.textContent = e.target.getAttribute("data-text"); 
    }
  };
  const isLiked = () => {
      return checkLike === true; // Check if the post is liked by the user
  };
    return (
        <div className="position-relative border-2 rounded-2 border-dark mt-4" style={{paddingTop:"20px", paddingLeft: "15px",paddingRight: "15px", boxShadow: "rgba(0, 0, 0, 0.07) 0px 1px 2px, rgba(0, 0, 0, 0.07) 0px 2px 4px, rgba(0, 0, 0, 0.07) 0px 4px 8px, rgba(0, 0, 0, 0.07) 0px 8px 16px"}}>
            <Row>
                <Col xl={1} lg={1} md={1} sm={1} xs={1} className="mx-3">
                    {
                        post.group_id!=null && page!='group'?(
                            post.group_image!=null?
                            <Link to={"/group/"+post.group_id}><Image src={post.group_image} style={{width:"50px",height: "50px"}} roundedCircle /></Link>
                                :  <Link to={"/group/"+post.group_id}><Image src={APIService.URL_REST_API+"/files/group_image.png"} style={{width:"50px",height: "50px"}} roundedCircle /></Link>
                        )
                        :(
                            post.user_image!=null?
                                <Link to={"/member/profile/"+post.user_username}>
                                    <Image src={post.user_image} style={{width:"50px",height: "50px"}} roundedCircle />
                                </Link> 
                                : (
                                    post.user_gender=='female'?
                                    <Link to={"/member/profile/"+post.user_username}>
                                    <Image src={APIService.URL_REST_API+"/files/user_female.png"} style={{width:"50px",height: "50px"}} roundedCircle /></Link>
                                    :<Link to={"/member/profile/"+post.user_username}><Image src={APIService.URL_REST_API+"/files/user_male.png"} style={{width:"50px",height: "50px"}} roundedCircle /></Link>
                                )
                        ) 
                    }
                </Col>
                {
                    post.group_id!=null && page!="group"?
                    <Col xl={9} lg={9} md={9} sm={9} xs={8} className="d-flex flex-column ms-2">
                        <Link to={"/group/"+post.group_id} className="h5 text-black text-capitalize  text-decoration-none text-start mb-1">{post.group_name}</Link>
                        <div className="text-start "><Link to={"/member/profile/"+post.user_username} className="text-dark text-decoration-none">{post.user_fullname}</Link> &emsp;<Dot/> {getTimeOfPost()}</div>
                    </Col>
                    :
                    <Col xl={9} lg={9} md={9} sm={9} xs={8} className="d-flex flex-column ms-2">
                        <Link to={"/member/profile/"+post.user_username} className="h5 text-black text-capitalize text-start mb-1 " style={{textDecoration:"none"}}>{post.user_fullname}</Link>
                        <p className="text-start" style={{fontSize: "12px"}}>
                            {getSettingType()} &emsp;<Dot/>{calculateTimeDifference(post.create_at)} </p>
                    </Col>
                }
                <Col xl={1} className="text-end mt-2" onClick={() =>{
                  handleTogglePost(post.id)
                }}>

                    <ThreeDots size={30} fill='#e1e1e1' />
                </Col>
                {togglePost[post.id] && (
                   <div >
                   {post.user === user?.id && post.group==null?(
                     <div className="togglePost">
                      <div className="selectedfunction" onClick={() =>handleShowEditPost(post.id)}>
                        <div><MdModeEdit className="iconefunctionpost" /></div>
                        <div className="fonttextfunctionpost">Edit Post</div>
                      </div>
                      <div className="selectedfunction" onClick={() => setShowSettingPost(true)}>
                        <div><GearFill className="iconefunctionpost"/></div>
                        <div className="fonttextfunctionpost">Setting Post</div>
                      </div>
                      <div className="selectedfunction" onClick={() => handleDeletePost(post.id)}>
                        <div><RiDeleteBin6Line className="iconefunctionpost"/></div>
                        <div className="fonttextfunctionpost">Delete Post</div>
                      </div>
                     </div>
                   ):post.user_id === user?.id && post.group_id!=null?(
                    <div className="togglePost2">
                      <div className="selectedfunction" onClick={() =>handleShowEditPost(post.id)}>
                        <div><MdModeEdit className="iconefunctionpost" /></div>
                        <div className="fonttextfunctionpost">Edit Post</div>
                      </div>
                      <div className="selectedfunction" onClick={() => handleDeletePost(post.id)}>
                        <div><RiDeleteBin6Line className="iconefunctionpost"/></div>
                        <div className="fonttextfunctionpost">Delete Post</div>
                      </div>
                     </div>
                   )
                   :(
                     <div className="togglePost2">
                       {post.user_id != user.id?
                        <div className="selectedfunction" onClick={()=> setShowReport(true)}>
                          <div><MdReport className="iconefunctionpost" /></div>
                          <div className="fonttextfunctionpost">Report</div>
                        </div>
                         :<></>
                       }
                       <div className="selectedfunction" >
                         <div><RiDeleteBin6Line className="iconefunctionpost"/></div>
                         <div className="fonttextfunctionpost">chưa biết</div>
                       </div>
                     </div>
                   )}
                 </div>
                )}
                <Modal className="postmodaleditpost" show={showEditPost[post.id]} onHide={() =>handleCloseEditPost(post.id)} animation={false}>
                  <div >
                    <div >
                    <Modal.Header className="classmodalheader"  closeButton>
                      <Modal.Title className="modalpost-title">
                            Edit Post
                      </Modal.Title>
                    </Modal.Header>
                    <Modal.Body >
                      <EditPost post={post} handleCloseEditPost={handleCloseEditPost} refetchHomePage={refetchHomePage} formUpdatePost={formUpdatePost} setFromUpdatePost={setFromUpdatePost}/>
                    </Modal.Body>
                    </div>
                  </div>
                </Modal>
                {post.share === true ?(
                  <SharePostNote getSettingType={getSettingType} calculateTimeDifference={calculateTimeDifference} post={post}/>
                ):(
                  <Col xl={12} className="text-start">
                {(post.color && post.color !== "inherit" && post.background && post.background !== "inherit" && post.background && post.background !== "ffffffff") ?(
                  <div
                  className={
                    post.color !== null
                      ? 'postuser-showcommentBackgroundcolor'
                      : ''
                  }
                  style={{
                    '--showpostcolor': formatcolor(post.color) || 'black' ,
                    '--showpostbackground': formatcolor(post.background) || 'white'
                  } } // Sử dụng kiểu dữ liệu CustomCSSProperties
                  >
                    {renderCommentWithLink(post.text)}
                  </div>
                  ):(
                    <p className="h6 mx-5 mb-3 text-dark postText">{renderCommentWithLink(post.text)}</p>
                  )}
                    <div className="mb-2 img-media">
                      {post.share === true ?(
                        <div>
                          { post.mediaUrl!=null?
                            <Image src={post.mediaUrl} className="img-style" fluid />
                            : (post.group_media !=null ?
                                <Image src={post.group_media.media} className="img-style" fluid />
                                :<></>)
                        }
                        </div>
                      ):(
                        <div>
                          { post.mediaUrl!=null?
                            <Image src={post.mediaUrl} className="img-style" fluid />
                            : (post.group_media !=null ?
                                <Image src={post.group_media.media} className="img-style" fluid />
                                :<></>)
                        }
                        </div>
                      )}       
                    </div>
                </Col>
                )}
                <Col md={3} lg={4} xl={4} sm={4} xs={6} className="d-flex justify-content-center mt-2" onClick={() => handleOpenLikeModal(post.id)}>
                {getLikeUser && 
                    Array.from(new Set(getLikeUser?.map(item => item.enumEmo))).slice(0,3).map((emoji, index) => (
                      <span key={index} className="iconEmo">
                        {emoji}
                      </span>
                    ))
                  }
                    <p className="fw-bold mx-2 mt-1 text-black-50" style={{fontSize:"13px"}}>{countLike}</p>
                </Col>
                <Modal className="likemodal" show={showLike[post.id] || false} onHide={() => handleCloseLikeModal(post.id)} animation={false}>
                  <ListLike post={post} getLikeUser={getLikeUser} getEnumEmo={getEnumEmo} currentPostId={currentPostId}/>              
                </Modal>
                <Col md={8} lg={8} xl={8} sm={8} xs={6} className="d-flex flex-row justify-content-end align-items-center">
                    <p style={{marginRight: "20px",fontSize: "13px"}} className="h6 text-black-50 click"  onClick={() => handleShow(post.id)}>{total}<span className="d-none d-md-block ">comments</span><span className="d-md-none"><ChatLeft/></span></p>
                    <p style={{marginRight: "20px",fontSize: "13px"}} className="h6 text-black-50">{countShare} <span className="d-none d-md-block ">shares</span><span className="d-md-none"><Shuffle/></span></p>                
                </Col>
                <hr className="mx-auto"style={{ width:"90%"}} />
                <Col xl={12} className="row pb-2 posticonbinhluan-all">
                    
                    <div className="col-4 d-flex justify-content-center posticonbinhluan-like">
                    <div className="toggleEmoji">
                    <div className="toggleEmojiAll">
                    {isLiked(post.id) ? (
                        <>
                        <span onClick={() => handleChangeUpdateLike(post.id,"👍",user?.id)} className="click">👍</span>
                        <span onClick={() => handleChangeUpdateLike(post.id,"❤️",user?.id)} className="click">❤️</span>
                        <span onClick={() => handleChangeUpdateLike(post.id,"😂",user?.id)} className="click">😂</span>
                        <span onClick={() => handleChangeUpdateLike(post.id,"😡",user?.id)} className="click">😡</span>
                        <span onClick={() => handleChangeUpdateLike(post.id,"😢",user?.id)} className="click">😢</span>
                        </>
                    ):( 
                        <>
                        <span onClick={() => handleChangeAddLike(post.id,"👍")} className="click">👍</span>
                        <span onClick={() => handleChangeAddLike(post.id,"❤️")} className="click">❤️</span>
                        <span onClick={() => handleChangeAddLike(post.id,"😂")} className="click">😂</span>
                        <span onClick={() => handleChangeAddLike(post.id,"😡")} className="click">😡</span>
                        <span onClick={() => handleChangeAddLike(post.id,"😢")} className="click">😢</span>
                        </>
                    )}
                    </div>
                    
                    </div>
                        {checkLike ? (             
                        <span onClick={() => handleChangeRemoveLike(post.id)} className="click">{getEnumEmo}</span>
                        ) : (
                            <span onClick={() => handleChangeAddLike(post.id,'👍')} className="click">👍</span>
                        )}           
                        <p className="h6 mx-2 text-black-50">Like</p>
                    </div>
                    <div className="col-4 d-flex justify-content-center click">
                        <ChatLeft size={22} fill='#8224E3'/>
                        <p className="h6 mx-2 text-black-50" >Comment</p>
                    </div>
                    <div className="col-4 d-flex justify-content-center click" onClick={() =>handleShareShow(post.id)}>
                        <Reply size={22} fill='#8224E3'/>
                        
                        <p className="h6 mx-2 text-black-50 ">Share</p>
                    </div>
                    <Modal show={showShareModal[post.id]} onHide={() =>handleShareClose(post.id)}>
                      <Modal.Header className="classmodalheader" closeButton>
                          <Modal.Title>Share Post</Modal.Title>
                      </Modal.Header>
                      <Modal.Body>
                      <ShareForm post={post} handleShareClose={handleShareClose} setFromSharePost={setFromSharePost} formSharePost={formSharePost} show={showShareModal} refetchCountShare={refetchCountShare} handleClose={handleShareClose} />
                      </Modal.Body>
                    </Modal>
                    <ModalReport showReport={showReport} setShowReport={setShowReport} postTarget={post} />
                    <Modal show={showSettingPost} onHide={()=> setShowSettingPost(false)}>
                      <Modal.Header className="text-center" closeButton>
                        <Modal.Title>Setting</Modal.Title>
                      </Modal.Header>
                      <Formik
                        initialValues={{
                          user_id: user.id,
                          post_id: post.id,
                          setting_type: post.setting_type,
                        }}
                        onSubmit={async (values, { ...props }) => {
                            try {
                                let respon= await settingPost({id:user.id,data:values });
                                setShowSettingPost(false);
                                if(respon.data){
                                  dispatch(showMessageAlert("Setting type for post successfully"));
                                  dispatch(resetData());
                                }
                            } catch (error) {
                                console.error('An error occurred while submitting the form.', error);
                            }
                        }}
                    > {({ handleSubmit, handleChange, values, touched, errors }) => (
                      <Form noValidate onSubmit={handleSubmit}>
                        <Modal.Body>
                          <Form.Label>Setting Post</Form.Label>
                              <Form.Select name="setting_type" aria-label="select setting type" defaultValue={post.setting_type} className="mb-3"
                                  onChange={handleChange}>
                                <option value="PUBLIC">Public</option>
                                <option value="FOR_FRIEND">Only Friends</option>
                                <option value="HIDDEN">Hidden</option>
                              </Form.Select>
                        </Modal.Body>
                        <Modal.Footer>
                          <Button variant="primary" type="submit">
                            Save
                          </Button>
                        </Modal.Footer>
                      </Form>
                      )}</Formik>
                    </Modal>
                </Col>
                <hr className="mx-auto"style={{ width:"90%"}} />
                <div className="commentNote">
                    {getComment?.map((comment,index) => (
                        <Comment key={index} refetchGetComment={refetchGetComment} refetchCountComment={refetchCountComment} comment={comment} postIdco={post}/>
                    ))}
                </div>
                <div className="inputcommentNote">         
                    <form onSubmit={handleSubmitComment}>
                      <input type="hidden" name="comment" value={formComment.comment} onChange={(e) => handleChangeComment(e)} id="newCommentInput" />
                      <div>
                      <div className="divcomment" id="newMyInput" contentEditable="true" onInput={() => handleInput('newCommentInput', 'newMyInput','comment')}data-text="Input Comment" onFocus={handleFocus} onBlur={handleBlur}></div>
                      </div>
                      <input type="hidden" name="post" value={formComment.post} onChange={(e) => handleChangeComment(e)}/>
                      <input type="hidden" name="createdAt" value={formComment.createdAt} onChange={(e) => handleChangeComment(e)} />
                      <button type="submit" className={`commentpostNote${!content ? 'disable' : ''}`} disabled={!content} value="Comment"><IoMdSend className="iconcomment"/></button>
                    </form>
                    <ul id="newMyInput-ul" className="myul" >
                      {getUserFriend?.map((user) => (
                        <div key={user.id}>
                        <li onClick={() => selectName(user.username, 'newCommentInput', 'newMyInput')} >
                          <a>
                            <div className="showuserli">
                              <div className="showuserlianhcomment"> {user.gender=='female'?(
                                <Image src={APIService.URL_REST_API+"/files/user_female.png"} style={{width:"40px",height: "40px"}} roundedCircle />
                              ):(
                                  <Image src={APIService.URL_REST_API+"/files/user_male.png"} style={{width:"40px",height: "40px"}} roundedCircle />
                              )}
                              </div>
                              <div className="showuserliname">
                                {user.fullname}
                              </div>
                            </div>
                            </a>
                          </li>
                        </div>
                      ))}
                    </ul>
                  </div>
            </Row>
        </div>
    );
}
export default ShowPostNote;