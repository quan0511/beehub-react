import React, { useEffect } from "react";
import {Col, Row, Image, Button,Form,Table, Container} from "react-bootstrap";
import { Eye, EyeSlash, GlobeAmericas, LockFill } from "react-bootstrap-icons";
import Post from "../../components/Post";
import APIService from "../../features/APIService";
import { useDispatch, useSelector } from "react-redux";
import { selectCurrentUser } from "../../auth/authSlice";
import {  useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import AddPost from "../../components/AddPost";
import { cancelReset } from "../../features/userSlice";
function GroupDiscussion({group,posts, description, toAbout, toListMedia, list_media, isActive, isPublic , joined,page, setPage,isFetching}){
    const appUser = useSelector(selectCurrentUser);
    const dispatch = useDispatch();
    const reset = useSelector((state)=>state.user.reset);
    useEffect(() => {
        const onScroll = () => {
            const scrolledToBottom =Math.round(window.innerHeight + window.scrollY) >= (document.body.offsetHeight);
            if(!scrolledToBottom && reset){
                setPage(page);
                return;
            }else{
                if (scrolledToBottom && !isFetching && !reset) {
                    setPage(page + 1);
                }
            }
        };
        document.addEventListener("scroll", onScroll);
        if(reset!=null && reset){
            window.scrollTo({ top: 0, behavior: 'smooth' });
            dispatch(cancelReset());
        }
        return function () {
          document.removeEventListener("scroll", onScroll);
        };
      }, [page, isFetching]);
      const [showInputModal, setShowInputModal] = useState(false);
        const handleOpenInputModal = () => setShowInputModal(true);
        const handleCloseInputModal = () => setShowInputModal(false);
    return <Container fluid>
        <Row className="group-section">
            <Col xl={7} lg={8} md={10} sm={10} className="mx-sm-auto ms-lg-auto ms-sm-0 mx-md-auto " >
                {
                    joined?
                        <div className="border-1 rounded-2 border pe-2 text-start" onClick={handleOpenInputModal} style={{paddingTop:"10px", paddingLeft: "1px",boxShadow: "rgba(0, 0, 0, 0.03) 0px 1px 2px, rgba(0, 0, 0, 0.03) 0px 2px 4px, rgba(0, 0, 0, 0.03) 0px 4px 8px, rgba(0, 0, 0, 0.03) 0px 8px 16px, rgba(0, 0, 0, 0.03) 0px 16px 32px, rgba(0, 0, 0, 0.03) 0px 32px 64px"}}>
                            <div className="row" style={{padding: "10px 20px "}}>
                                <label className="col-1 ms-2 me-1 col-form-label">
                                    {appUser.image!=null?
                                    <Image src={appUser.image} style={{width:"50px",height: "50px"}}roundedCircle />
                                    :(appUser.gender=='female'?
                                    <Image src={APIService.URL_REST_API+"/files/user_female.png"} style={{width:"50px",height: "50px"}}roundedCircle />
                                    :<Image src={APIService.URL_REST_API+"/files/user_male.png"} style={{width:"50px",height: "50px"}}roundedCircle />
                                    )
                                    }
                                </label>
                                <div className='col-10 d-flex flex-row justify-content-center align-items-center'>
                                    <div type="text" className="mx-auto form-control " style={{borderRadius: "30px", height:"35px"}} >Write something...</div>
                                </div>
                                <div className='col-1'></div>
                            </div>
                        </div>:<></>
                }
                {
                    posts!=null && posts.length>0?
                    posts.map((post,index)=>{
                        return <Post post={post} key={index} page="group" />
                    })
                    :
                    <p className="text-black-50">There are no post in group</p>
                }
                <Modal className="postmodal" show={showInputModal} onHide={handleCloseInputModal} animation={false}>
                    <div >
                        <div >
                        <Modal.Header className="classmodalheader"  closeButton>
                            <Modal.Title className="modalpost-title">
                                    Write New Post
                            </Modal.Title>
                            </Modal.Header>
                            <Modal.Body >
                            <AddPost group={group} handleCloseModal={handleCloseInputModal} />
                            </Modal.Body>
                            </div>
                        </div>
                    </Modal>
            </Col>
            <Col xl={4} lg={4} className="d-lg-none d-none d-xl-block me-xl-auto " >
                <div className="border rounded-2 text-start px-4 mb-3" style={{paddingTop:"10px", paddingLeft: "15px",marginTop: "200px", boxShadow: "rgba(0, 0, 0, 0.03) 0px 1px 2px, rgba(0, 0, 0, 0.03) 0px 2px 4px, rgba(0, 0, 0, 0.03) 0px 4px 8px, rgba(0, 0, 0, 0.03) 0px 8px 16px, rgba(0, 0, 0, 0.03) 0px 16px 32px, rgba(0, 0, 0, 0.03) 0px 32px 64px"}}>
                    <p>
                        <span className="fw-bold">About</span><br/>
                        <span style={{fontSize: "13px"}}>
                            {description}
                        </span>
                    </p>
                    <Table borderless>
                        <tbody>
                            {isPublic?
                                <tr>
                                    <td width="10%">
                                        <GlobeAmericas />
                                    </td>
                                    <td className="lh-sm"><span className="fw-bold">Public</span><br/>
                                        <span style={{fontSize:"13px"}}>
                                        Anyone can see who's in the group and what they post.
                                        </span>
                                    </td>
                                    
                                </tr>
                            : 
                                <tr>
                                    <td width="10%">
                                        <LockFill />
                                    </td>
                                    <td className="lh-sm"><span className="fw-bold">Private</span><br/>
                                        <span style={{fontSize:"13px"}}>
                                        Just member can see all posts in the group.
                                        </span>
                                    </td>
                                    
                                </tr>
                            }
                            {isActive? 
                                <tr>
                                    <td><Eye /></td>
                                    <td className="lh-sm"><span className="fw-bold">Visible</span><br/>
                                        <span style={{fontSize:"13px"}}>
                                        Anyone can find this group.
                                        </span>
                                    </td>
                                </tr>
                            :
                                <tr>
                                    <td><EyeSlash /></td>
                                    <td className="lh-sm"><span className="fw-bold">Invisible</span><br/>
                                        <span style={{fontSize:"13px"}}>
                                            Anyone can's find this group.
                                        </span>
                                    </td>
                                </tr>
                            }
                        </tbody>
                    </Table>
                    <Button variant="secondary" className="w-100 mb-3" onClick={toAbout}>Learn More</Button>
                </div>
                <div className="border rounded-2 text-start px-4" style={{paddingTop:"10px", paddingLeft: "15px",boxShadow: "rgba(0, 0, 0, 0.03) 0px 1px 2px, rgba(0, 0, 0, 0.03) 0px 2px 4px, rgba(0, 0, 0, 0.03) 0px 4px 8px, rgba(0, 0, 0, 0.03) 0px 8px 16px, rgba(0, 0, 0, 0.03) 0px 16px 32px, rgba(0, 0, 0, 0.03) 0px 32px 64px"}}>
                    <p>
                        <span className="fw-bold">Recent media</span><br/>
                    </p>
                    <Row className=" mb-3">
                        {list_media!=null&&list_media.length>0? 
                        list_media.map((media,index)=> {
                            let urlImg = APIService.URL_REST_API+"/files/"+media.media;
                            return <Col key={index} xl={6} className="mb-2">
                                <Image src={urlImg} fluid/>
                            </Col>
                        })
                        :<></>
                        }
                        
                    </Row>
                    <Button variant="secondary" className="w-100 mb-3" onClick={toListMedia}>See all</Button>
                </div>
            </Col>
            {/* <Col className="d-lg-none d-md-none d-sm-none d-xl-block"></Col> */}
        </Row>
    </Container>
    ;
}
export default GroupDiscussion;