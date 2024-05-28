import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Col, Container, Row } from 'react-bootstrap';
import AcitivityPage from './ActivityPage';
import SessionLeft from '../components/SessionLeft';
import NavigatorBar from '../components/NavigatorBar';
import APIService from '../auth/APIService';
import { useSelector } from 'react-redux';
import { selectCurrentUser } from '../auth/authSlice';


function Homepage() {
    const appUser = useSelector(selectCurrentUser);
    const [state, setState] = useState({
        posts: [],
        friends: [],
        loading: false
    })

    useEffect(() => {
        axios.get(`${APIService.URL_REST_API}/homepage/${appUser.id}`).then((res) => {
            setState({
                posts: res.data,
                loading: true
            });
        }).finally(() => {
            setTimeout(() => {
                setState({ loading: false })
            }, 1200);
            window.scrollTo({ top: 0, behavior: "smooth" });
        });
        axios.get(`${APIService.URL_REST_API}/friends/${appUser.id}`).then((res) => {
            setState({
                friends: res.data
            });
        });
    },[])

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
