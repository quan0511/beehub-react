import React, { useRef, useState } from "react";
import { Button, Col, Form, Image, ListGroup, Overlay, Row } from "react-bootstrap";
import Modal from 'react-bootstrap/Modal';
import { ChatLeft, Dot, GearFill, GlobeAsiaAustralia, HandThumbsUp, HandThumbsUpFill, HeartFill, LockFill, People, PeopleFill, Reply, Shuffle, ThreeDots } from 'react-bootstrap-icons';
import APIService from "../features/APIService";
import { Link, json } from "react-router-dom";
import '../css/post.css';
import { MdReport,MdModeEdit } from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";
import { selectCurrentToken, selectCurrentUser } from "../auth/authSlice";
import { useAddLikePostMutation, useCheckLikeQuery, useCountCommentQuery, useCountLikeQuery, useCountReactionByPostQuery, useCountShareQuery, useDeleteLikeMutation, useDeletePostMutation, useFetchPostQuery, useGetEnumEmoQuery, useGetLikeUserQuery, useSharePostMutation, useUpdateLikePostMutation } from "../post/postApiSlice";
import { useDispatch, useSelector } from "react-redux";
import ShowComment from "./ShowComment";
import { Formik } from "formik";
import * as Yup from 'yup';
import { refresh,resetData,showMessageAlert } from "../features/userSlice";
import ListLike from "./ListLike";
import EditPost from "./EditPost";
import ShareForm from "./ShareForm";
import SharePost from "./SharePost";
import { useCreateReportMutation, useGetReportTypesQuery, useSettingPostMutation } from "../features/userApiSlice";
import axios from "axios";
function Post ({post, page,refetchHomePage}){
  const user = useSelector(selectCurrentUser);
  const [showPostModal, setShowPostModal] = useState({});
  //const {data: post} = useFetchPostQuery({id:post.id})
  const token = useSelector(selectCurrentToken);
    const [addLike] = useAddLikePostMutation();
    const dispatch = useDispatch();
    const [deleteLike] = useDeleteLikeMutation();
    const [updateLike] = useUpdateLikePostMutation();
    const [deletePost] = useDeletePostMutation();
    const [sharePost] = useSharePostMutation();
    const {data: countShare} = useCountShareQuery({id:post.id}) 
    const {data:getPostById} = useFetchPostQuery({id:post.id});
    const {data:countComment,refetch:refetchCountComment} = useCountCommentQuery({id:post.id});
    const {data:countReacitonByPost,refetch:refetchCountReactionByPost} = useCountReactionByPostQuery({id:post.id});
    const { data: getLikeUser, refetch: refetchGetLikeUser } = useGetLikeUserQuery({ id: post.id });
    const { data: countLike, refetch: refetchCountLike } = useCountLikeQuery({ id: post.id });
    const { data: checkLike, refetch: refetchCheckLike } = useCheckLikeQuery({ userid: user?.id, postid: post.id });
    const { data: getEnumEmo, refetch: refetchGetEnumEmo } = useGetEnumEmoQuery({ userid: user?.id, postid: post.id });
    const total = (countReacitonByPost && countComment) ? countReacitonByPost + countComment : 0;
    const [createReport,{isLoading,isSuccess, isError}] = useCreateReportMutation();
    const [settingPost, {isLoading2, isSuccess2,isError2}] = useSettingPostMutation();
    const {data: reportTypes} = useGetReportTypesQuery();
    const [movePostId,setMovePostId] = useState(null);
    const [showReport,setShowReport] = useState(false);
    const [showEditPost, setShowEditPost] = useState({});
    const [showLike, setShowLike] = useState({});
    const [targetReport, setTargetReport] = useState(null);
    const [showSettingPost, setShowSettingPost] = useState(false);
    let reset = useSelector((state)=> state.user.reset);
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
    const commentTagLink = (comments) => {
      return /tag=.*&link=/.test(comments);
    };
    const renderCommentWithLink = (comment) => {
      if (typeof comment === 'string') {
        const regex = /tag=(.*?)&link=(.*?)(?=\s+tag=|$)/g;
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
        return result;
      } else {
        return comment;
      }
    };
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
                      <div className="selectedfunction" onClick={() => setShowSettingPost(true)}>
                        <div><GearFill className="iconefunctionpost"/></div>
                        <div className="fonttextfunctionpost">Setting Post</div>
                      </div>
                      <div className="selectedfunction" onClick={() => handleDeletePost(post.id)}>
                        <div><RiDeleteBin6Line className="iconefunctionpost"/></div>
                        <div className="fonttextfunctionpost">Delete Post</div>
                      </div>
                     </div>
                   ):(
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
                  <SharePost getSettingType={getSettingType} post={post}/>
                ):(
                  <Col xl={12} className="text-start">
                {(post.color && post.color !== "inherit" && post.background && post.background !== "inherit" && post.color && post.color !== "ff000000" && post.background && post.background !== "ffffffff") ?(
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
                    {renderCommentWithLink(post.text)}
                  </div>
                  ):(
                    <p className="h6 mx-5 mb-3 text-dark">{renderCommentWithLink(post.text)}</p>
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
                    <p style={{marginRight: "20px",fontSize: "13px"}} className="h6 text-black-50 click"  onClick={() => handleShow(post.id)}>{total} <span className="d-none d-md-block ">comments</span><span className="d-md-none"><ChatLeft/></span></p>
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
                    <div className="col-4 d-flex justify-content-center click" onClick={() => handleShow(post.id)}>
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
                      <ShareForm post={post} handleShareClose={handleShareClose} setFromSharePost={setFromSharePost} formSharePost={formSharePost} show={showShareModal} handleClose={handleShareClose} />
                      </Modal.Body>
                    </Modal>
                    <Modal className="modalShowComment"  show={showPostModal[post.id]} onHide={() =>
                      setShowPostModal((prev) => ({
                          ...prev,
                          [post.id]: false,
                        }))
                      } animation={false}>
                      <ShowComment postIdco={post}/>
                    </Modal>
                    <Modal show={showReport} onHide={()=>setShowReport(false)}>
                      <Modal.Header className="text-center" closeButton>
                        <Modal.Title>Report</Modal.Title>
                      </Modal.Header>
                      <Formik
                        initialValues={{
                          sender_id: user.id,
                          user_username: post.user_username,
                          target_group_id: post.group_id,
                          target_post_id: post.id,
                          type_id: targetReport,
                          add_description: ""
                        }}
                        onSubmit={async (values, { ...props }) => {
                            try {
                                if(targetReport==null){
                                  props.setErrors({type_id : "Type Report is required"});
                                }else{
                                  values.type_id = targetReport;
                                  await createReport({id:user.id,data:values });
                                  dispatch(showMessageAlert("Send Report post successfully"));
                                  setShowReport(false);
                                  refetchHomePage();
                                }
                            } catch (error) {
                                console.error('An error occurred while submitting the form.', error);
                            }
                        }}
                    > {({ handleSubmit, handleChange, values, touched, errors }) => (
                      <Form noValidate onSubmit={handleSubmit}>
                      <Modal.Body>
                             <Form.Label>Please select a problem</Form.Label>
                             <Form.Select name="report_type" aria-label="select report type" defaultValue={values.type_id} className="mb-3"
                                isInvalid={!!errors.type_id}
                              onChange={(e)=>{
                                let valueId = e.target.value;
                                let des = reportTypes.find((element) => element.id == valueId);
                                document.getElementById("descriptionReport").innerText = des.description;
                                setTargetReport(valueId);
                             }}>
                              <option>Open this select menu</option>
                              { reportTypes!=null && reportTypes.length !=0?
                                reportTypes.map((re, index)=>{
                                  return <option key={re.id} value={re.id}>{re.title}</option>
                                })
                                :<></>
                              }
                            </Form.Select>
                            {errors.type_id && touched.type_id && (
                                  <span className="text-danger">{errors.type_id}</span>
                              )}
                            <div id="descriptionReport" className="mb-3"></div>
                            <Form.Control as="textarea" rows={3}  name="add_description"  className="mb-3"
                                defaultValue={values.add_description} onChange={handleChange} />
                          
                      </Modal.Body>
                      <Modal.Footer>
                        <Button variant="secondary" onClick={()=>setShowReport(false)}>
                          Close
                        </Button>
                        <Button variant="primary" type="submit">
                          Send Report
                        </Button>
                      </Modal.Footer>
                      </Form>
                      )}</Formik>
                    </Modal>
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
            </Row>
        </div>
    );
}
export default Post;