import React, { useRef, useState } from "react";
import { Button, Col, Image, ListGroup, Overlay, Row } from "react-bootstrap";
import Modal from 'react-bootstrap/Modal';
import { ChatLeft, Dot, GlobeAsiaAustralia, HandThumbsUp, HandThumbsUpFill, HeartFill, LockFill, People, PeopleFill, Reply, Shuffle, ThreeDots } from 'react-bootstrap-icons';
import APIService from "../features/APIService";
import { Link } from "react-router-dom";
import '../css/post.css';
import { MdReport,MdModeEdit } from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";
import { selectCurrentUser } from "../auth/authSlice";
import { useAddLikePostMutation, useCheckLikeQuery, useCountCommentQuery, useCountLikeQuery, useDeleteLikeMutation, useDeletePostMutation, useFetchPostQuery, useGetEnumEmoQuery, useGetLikeUserQuery, useSharePostMutation, useUpdateLikePostMutation } from "../post/postApiSlice";
import { useSelector } from "react-redux";
import ShowComment from "./ShowComment";
import ListLike from "./ListLike";
import EditPost from "./EditPost";
import ShareForm from "./ShareForm";
import SharePost from "./SharePost";
function Post ({post, page,refetchHomePage}){
  const user = useSelector(selectCurrentUser);
  const [showPostModal, setShowPostModal] = useState({});
  //const {data: post} = useFetchPostQuery({id:post.id})
    const [addLike] = useAddLikePostMutation();
    const [deleteLike] = useDeleteLikeMutation();
    const [updateLike] = useUpdateLikePostMutation();
    const [deletePost] = useDeletePostMutation();
    const [sharePost] = useSharePostMutation();
    const {data:getPostById} = useFetchPostQuery({id:post.id});
    const {data:countComment,refetch:refetchCountComment} = useCountCommentQuery({id:post.id});
    const { data: getLikeUser, refetch: refetchGetLikeUser } = useGetLikeUserQuery({ id: post.id });
    const { data: countLike, refetch: refetchCountLike } = useCountLikeQuery({ id: post.id });
    const { data: checkLike, refetch: refetchCheckLike } = useCheckLikeQuery({ userid: user?.id, postid: post.id });
    const { data: getEnumEmo, refetch: refetchGetEnumEmo } = useGetEnumEmoQuery({ userid: user?.id, postid: post.id });
    const [movePostId,setMovePostId] = useState(null);
    const [showEditPost, setShowEditPost] = useState({});
    const [showLike, setShowLike] = useState({});
    const handleCloseEditPost = (id) => {
      setShowEditPost((prevState) => ({
        ...prevState,
        [id]:false,
      }))
    };
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
    const handleShow = (id) =>{
      setShowPostModal((prev) => ({
        ...prev,
        [id]: true,
      }));
       setMovePostId(id);
    };
    
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
    const getTimeOfPost = ()=>{
        let datePost = new Date(post.create_at);
        let diffDay = Math.round(Math.abs(new Date() - datePost)/ 86400000);
        if(diffDay<1){
            let diffHour =Math.round(Math.abs(new Date() - datePost)/ 3600000);
            return <span  style={{fontSize: "12px"}}>{diffHour} hours ago</span>
        }else{
            return <span  style={{fontSize: "12px"}}>{datePost.toLocaleString("en-GB")}</span>
        }  
    }
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
        user:getPostById.user
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
    user:user?.id
  });
  const handleSharePost = async (postid,userid) =>{
    const isConfirmed = window.confirm("Bạn muốn share bài post này?"); 
    if(isConfirmed){
      try{
        await sharePost({postid,userid});
      }catch(error){
        console.log(error);
      }
    }
  }
  const handleDeletePost = async (id) => {
    const isConfirmed = window.confirm("Bạn chắc chắn muốn xóa bài post này?");
    if (isConfirmed) {
      try {
        await deletePost({id});
        //toast.success("Bài đăng đã được xóa thành công!");
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
                                <Image src={post.group_image} style={{width:"50px",height: "50px"}} roundedCircle />
                                : <Image src={APIService.URL_REST_API+"/files/group_image.png"} style={{width:"50px",height: "50px"}} roundedCircle />
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
                            {getSettingType()} &emsp;<Dot/> {getTimeOfPost()}</p>
                    </Col>
                }
                <Col xl={1} className="text-end mt-2" onClick={() =>{
                  handleTogglePost(post.id)
                }}>

                    <ThreeDots size={30} fill='#e1e1e1' />
                </Col>
                {togglePost[post.id] && (
                   <div >
                   {post.user_id === user?.id ?(
                     <div className="togglePost">
                     <div className="selectedfunction" onClick={() =>handleShowEditPost(post.id)}>
                       <div><MdModeEdit className="iconefunctionpost" /></div>
                       <div className="fonttextfunctionpost">Edit Post</div>
                     </div>
                     <div className="selectedfunction" onClick={() => handleDeletePost(post.id)}>
                       <div><RiDeleteBin6Line className="iconefunctionpost"/></div>
                       <div className="fonttextfunctionpost">Delete Post</div>
                     </div>
                     </div>
                   ):(
                     <div className="togglePost">
                       <div className="selectedfunction" >
                         <div><MdReport className="iconefunctionpost" /></div>
                         <div className="fonttextfunctionpost">Report</div>
                       </div>
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
                <Modal.Header  closeButton>
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
                  <SharePost getSettingType={getSettingType} post={post}/>
                ):(
                  <Col xl={12} className="text-start">
                {(post.color && post.color !== "inherit" && post.background && post.background !== "inherit") ?(
                  <div
                  className={
                    post.color !== null
                      ? 'postuser-showcommentBackgroundcolor'
                      : ''
                  }
                  style={{
                    '--showpostcolor': post.color || 'black' ,
                    '--showpostbackground': post.background || 'white'
                  } } // Sử dụng kiểu dữ liệu CustomCSSProperties
                  >
                    {post.text}
                  </div>
                  ):(
                    <p className="h6 mx-5 mb-3 text-dark">{post.text}</p>
                  )}
                    
                    <div className="mb-2 img-media">
                      {post.share === true ?(
                        <div>
                          { post.medias!=null?
                            <Image src={post.medias} className="img-style" fluid />
                            : (post.group_media !=null ?
                                <Image src={post.group_media.media} className="img-style" fluid />
                                :<></>)
                        }
                        </div>
                      ):(
                        <div>
                          { post.media!=null?
                            <Image src={post.media.media} className="img-style" fluid />
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
                    <p style={{marginRight: "20px",fontSize: "13px"}} className="h6 text-black-50 click"  onClick={() => handleShow(post.id)}>{countComment} <span className="d-none d-md-block ">comments</span><span className="d-md-none"><ChatLeft/></span></p>
                    <p style={{marginRight: "20px",fontSize: "13px"}} className="h6 text-black-50">23 <span className="d-none d-md-block ">shares</span><span className="d-md-none"><Shuffle/></span></p>                
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
                    <div className="col-4 d-flex justify-content-center click" onClick={() => handleShow(post.id)}>
                        <ChatLeft size={22} fill='#8224E3'/>
                        <p className="h6 mx-2 text-black-50" >Comment</p>
                    </div>
                    <div className="col-4 d-flex justify-content-center click" onClick={() =>handleShareShow(post.id)}>
                        <Reply size={22} fill='#8224E3'/>
                        
                        <p className="h6 mx-2 text-black-50 ">Share</p>
                    </div>
                    <Modal show={showShareModal[post.id]} onHide={() =>handleShareClose(post.id)}>
                      <Modal.Header closeButton>
                          <Modal.Title>Chia sẻ bài viết</Modal.Title>
                      </Modal.Header>
                      <Modal.Body>
                      <ShareForm post={post} handleShareClose={handleShareClose} setFromSharePost={setFromSharePost} formSharePost={formSharePost} show={showShareModal} handleClose={handleShareClose} />
                      </Modal.Body>
                    </Modal>
                    <Modal className="modalShowComment"  show={showPostModal[post.id]} onHide={() =>
                      setShowPostModal((prev) => ({
                          ...prev,
                          [post.id]: false,
                        }))
                      } animation={false}>
                      <ShowComment setFromSharePost={setFromSharePost} getPostById={getPostById} formSharePost={formSharePost} refetchGetLikeUser={refetchGetLikeUser} refetchCountLike={refetchCountLike} refetchCheckLike={refetchCheckLike} refetchGetEnumEmo={refetchGetEnumEmo}
                      refetchCountComment={refetchCountComment}
                      postIdco={post} getEnumEmo={getEnumEmo} getLikeUser={getLikeUser} countLike={countLike} checkLike={checkLike}/>
                    </Modal>
                </Col>
            </Row>
        </div>
    );
}
export default Post;