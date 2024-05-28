import React from "react";
import Post from '../../components/Post';
import { Col, Row } from "react-bootstrap";
function SearchPosts({posts}){
    return (
        <Row>
            <Col lg={10} md={12} className="mx-auto">
                {
                posts.map((post, index)=> <Post key={index} post={post}/>)
                }
            </Col>
        </Row>
    );
}
export default SearchPosts;