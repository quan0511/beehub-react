import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Col, Container, Row } from 'react-bootstrap';
import AcitivityPage from './ActivityPage';
import SessionLeft from '../components/SessionLeft';
import NavigatorBar from '../components/NavigatorBar';
import APIService from '../auth/APIService';
import { useSelector } from 'react-redux';
import { selectCurrentUser } from '../auth/authSlice';
import { useFriendsQuery, useHomepageQuery } from '../user/userApiSlice';


function Homepage() {
    const appUser = useSelector(selectCurrentUser);

    useEffect(() => {
        if (window.innerHeight + document.documentElement.scrollTop === document.scrollingElement.scrollHeight) {
            console.log("Bottom");
        }
    }, [])

    return (
        <Container fluid className='ps-4' style={{marginTop: "60px"}}>
            <AcitivityPage 
                    friends={state.friends} 
                    posts={state.posts} 
                    setPosts={(newposts)=>setState({posts: newposts})} 
                    loading={state.loading} 
                    setLoading={(newVal)=> setState({loading: newVal})}/>
        </Container>
    );
}
export default Homepage;
