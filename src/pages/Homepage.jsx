import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {Col, Container,  Row } from 'react-bootstrap';
import AcitivityPage from './ActivityPage';
import SessionLeft from '../components/SessionLeft';
import NavigatorBar from '../components/NavigatorBar';
import APIService from '../auth/APIService';

function Homepage ({appUser}){
    
    const [posts,setPosts] = useState([]);
    const [friends, setFriends]= useState([]);
    const [loading, setLoading] = useState(true);
    useEffect(()=> {
        axios.get(`${APIService.URL_REST_API}/homepage/${appUser.id}`).then((res)=>{
            setPosts(res.data);
            setLoading(true);
        }).finally(()=>{ 
            setTimeout(() => {
                setLoading(false);
            }, 1200);
            window.scrollTo({top:0,behavior: "smooth"});
        });
        axios.get(`${APIService.URL_REST_API}/friends/${appUser.id}`).then((res)=>{
            setFriends(res.data);
        });
    },[])

    return (
        <Container fluid className='ps-4' style={{marginTop: "60px"}}>
            <AcitivityPage user={appUser} friends={friends} posts={posts} setPosts={(newposts)=>setPosts(newposts)} loading={loading} setLoading={(newVal)=> setLoading(newVal)}/>
        </Container>
    );
}
export default Homepage;