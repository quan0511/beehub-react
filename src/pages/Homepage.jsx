import { Col, Container, Row, Form, Image, Spinner, Button  } from 'react-bootstrap';
import { useGroupInfoQuery, useHomepageQuery } from '../features/userApiSlice';
import { useSelector } from 'react-redux';
import { selectCurrentUser } from '../auth/authSlice';
import APIService from '../features/APIService';
import SessionRight from '../components/SessionRight';
import Post from '../components/Post';
import { useEffect, useState } from 'react';
import AddPost from '../components/AddPost';
import Modal from 'react-bootstrap/Modal';
import '../css/addPost.css';
function Homepage() {
    const [page, setPage] = useState(0);
    const user = useSelector(selectCurrentUser);
    const {data:posts, isLoading,isFetching,refetch:refetchHomePage} = useHomepageQuery({id: user.id, page: page});
    const [showInputModal, setShowInputModal] = useState(false);
    const handleOpenInputModal = () => setShowInputModal(true);
    const handleCloseInputModal = () => setShowInputModal(false);
    useEffect(() => {
        const onScroll = () => {
          const scrolledToBottom =
            Math.floor(window.innerHeight + window.scrollY) >= (document.body.offsetHeight-1);
          if (scrolledToBottom && !isFetching) {
            console.log("Fetching more data...");
            setPage(page + 1);
          }
        };
        document.addEventListener("scroll", onScroll);
        return function () {
          document.removeEventListener("scroll", onScroll);
        };
      }, [page, isFetching]);
    return (
        <Container fluid className='ps-4' style={{marginTop: "60px",marginBottom: "10px"}}>
            <Row>
                <Col xl={7} lg={7} md={10} sm={12} className='m-md-auto pt-5 px-lg-5'>
                    <div className="border-2 rounded-2 border-dark " style={{paddingTop:"20px", paddingLeft: "15px", boxShadow: "rgba(0, 0, 0, 0.07) 0px 1px 2px, rgba(0, 0, 0, 0.07) 0px 2px 4px, rgba(0, 0, 0, 0.07) 0px 4px 8px, rgba(0, 0, 0, 0.07) 0px 8px 16px"}}>
                        <div method="post" className="row pe-4" onClick={handleOpenInputModal}>
                            <label className="col-1 mx-auto mb-3 col-form-label">
                                {
                                    user?.image?
                                        <Image src={user.image} style={{width:"50px",height: "50px"}}roundedCircle />
                                    :(
                                        user?.gender=='female'?
                                        <Image src={`${APIService.URL_REST_API}/files/user_female.png`} style={{width:"50px",height: "50px"}}roundedCircle />
                                        :<Image src={`${APIService.URL_REST_API}/files/user_male.png`} style={{width:"50px",height: "50px"}}roundedCircle />
                                    )
                                }
                            </label>
                            <div className='col-9 d-flex flex-row justify-content-center align-items-center'>
                                <div className="col-11 mb-3 mx-auto form-control " style={{borderRadius: "30px", padding: "5px 20px "}}>What do you think?</div>
                            </div>
                            <div className='col-1'></div>
                        
                        </div>
                    </div>
                    <Modal className="postmodal" show={showInputModal} onHide={handleCloseInputModal} animation={false}>
                    <div >
                        <div >
                        <Modal.Header className="classmodalheader"  closeButton>
                            <Modal.Title className="modalpost-title">
                                    Write New Post
                            </Modal.Title>
                            </Modal.Header>
                            <Modal.Body >
                            <AddPost handleCloseModal={handleCloseInputModal} refetchHomePage={refetchHomePage}/>
                            </Modal.Body>
                            </div>
                        </div>
                    </Modal>
                    {isLoading && posts==null?
                       <></>
                        :
                        posts?.map((post, index)=>{
                            return <Post key={index} post={post} refetchHomePage={refetchHomePage} page="activity" />;
                        })    
                    }
                    {
                    isFetching?
                    <div className='mt-4 mb-3 text-center w-100'>
                        <div className='text-black-50'><Spinner animation='border' size='8' /> Loading</div>
                    </div>:
                    <div></div>
                    }
                </Col>
                <Col xl={4} lg={4} className='section-right border-start p-5'>
                    <SessionRight />
                </Col>
            </Row>
        </Container>
    );
}
export default Homepage;
