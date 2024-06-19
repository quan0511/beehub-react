import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useGetPostQuery } from "../../features/userApiSlice";
import { selectCurrentUser } from "../../auth/authSlice";
import BeehubSpinner from "../../components/BeehubSpinner";
import Post from "../../components/Post";

function PostPage(){
    const appUser = useSelector(selectCurrentUser);
    const {id} = useParams(); 
    const {data:post, isLoading, isSuccess,status} = useGetPostQuery({id_user: appUser.id, id_post: id});
    console.log(post);
    console.log(isLoading);
    console.log(status);
    if(post==null &&!isLoading && status == 'rejected'){
        return (<Container fluid className='ps-4' style={{marginTop: "160px"}}>
            <Row>
                <Col xl={12} className="mt-2">
                    
                    <Container fluid>
                        <Row >
                            <Col xl={4} lg={4} md={6} sm={8} className="mx-auto">
                                <h1 className="text-secondary">
                                    Not Found Post
                                </h1>
                            </Col>
                        </Row>
                    </Container>
                </Col>
            </Row>
        </Container>); 
    }
    if(isLoading || !isSuccess){
       return (<Container fluid className='ps-4' style={{marginTop: "160px"}}>
        <Row>
            <Col xl={4} className="mx-auto d-flex justify-content-center align-items-center" style={{height: "400px"}}>
                <BeehubSpinner/>
            </Col>
        </Row>
    </Container>)
    }
    return (
    <Container fluid className='ps-4' style={{marginTop: "60px"}}>
        <Row>
            {isLoading || !isSuccess ?
            <Col xl={4} className="mx-auto d-flex justify-content-center align-items-center" style={{height: "400px"}}>
                <BeehubSpinner/>
            </Col>
            :
            <Col xl={12} className="mt-2">
                
                <Container fluid>
                    <Row >
                        <Col xl={10} lg={10} md={12} sm={12} className="mx-auto">
                        <Post post={post} page="post"/>
                        </Col>
                    </Row>
                </Container>
            </Col>
            }
        </Row>
    </Container>
    );
}
export default PostPage;