import React from 'react';
import { Col, Container, Row, Spinner } from 'react-bootstrap';
import { useHomepageQuery } from '../features/userApiSlice';
import { useSelector } from 'react-redux';
import { selectCurrentUser } from '../auth/authSlice';
import SessionRight from '../components/SessionRight';
import Post from '../components/Post';
import '../css/addPost.css';
import { useParams } from 'react-router-dom';
import { useCheckNoteSeenQuery, useFetchPostQuery, useGetNoteByUserQuery } from '../post/postApiSlice';
import ShowPostNote from './ShowPostNote';

function PostNote() {
    const user = useSelector(selectCurrentUser);
    const reset = useSelector((state) => state.user.reset);
    const resetHome = useSelector((state) => state.user.resetHomepage);
    const { data: getNoteByUser, refetch: refectGetNoteByUser } = useGetNoteByUserQuery({ id: user?.id }, {skip: !user?.id});
    const { data: checkSeenNote, refetch: refetchCheckSeenNote } = useCheckNoteSeenQuery({ userId: user?.id }, {skip: !user?.id});
    
    const { postid } = useParams();
    const postIdNumber = Number(postid);
    const { data: getPostById, error, isLoading: isPostLoading, refetch: refetchPost } = useFetchPostQuery({ id: postIdNumber });

    const calculateTimeDifference = (createdAt) => {
        const createdDate = new Date(createdAt);
        const currentDate = new Date();
        const timeDifference = currentDate - createdDate; // Lấy thời gian chênh lệch tính bằng milliseconds
        const secondsDifference = Math.floor(timeDifference / 1000);
        const minutesDifference = Math.floor(secondsDifference / 60);
        const hoursDifference = Math.floor(minutesDifference / 60);
        const daysDifference = Math.floor(hoursDifference / 24);
      
        if (daysDifference > 0) {
          return `${daysDifference} days ago`;
        } else if (hoursDifference > 0) {
          return `${hoursDifference} hours ago`;
        } else if (minutesDifference > 0) {
          return `${minutesDifference} minutes ago`;
        } else {
          return `${secondsDifference} seconds ago`;
        }
    };
    React.useEffect(() => {
        if (!getPostById) {
            refetchPost();
        }
    }, [postIdNumber, refetchPost, getPostById]);

    if (isPostLoading) {
        return <Spinner animation="border" />;
    }

    if (error) {
        return <div>Error loading post</div>;
    }

    return (
        <Container fluid className='ps-4' style={{ marginTop: "10px", marginBottom: "10px" }}>
            <Row>
                <Col xl={7} lg={7} md={10} sm={12} className='m-md-auto pt-5 px-lg-5 pb-3'>
                    {getPostById ? (
                        <ShowPostNote post={getPostById} refectGetNoteByUser={refectGetNoteByUser} refetchCheckSeenNote={refetchCheckSeenNote} calculateTimeDifference={calculateTimeDifference} />
                    ) : (
                        <div>Post not found</div>
                    )}
                </Col>
                <Col xl={4} lg={4} className='section-right border-start p-5'>
                    <SessionRight />
                </Col>
            </Row>
        </Container>
    );
}

export default PostNote;
