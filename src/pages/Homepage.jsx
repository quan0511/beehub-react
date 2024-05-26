import React from 'react';
import axios from 'axios';
import {Col, Container,  Row } from 'react-bootstrap';
import AcitivityPage from './ActivityPage';
import SessionLeft from '../components/SessionLeft';
import NavigatorBar from '../components/NavigatorBar';
import APIService from '../auth/APIService';

class Homepage extends React.Component{
    constructor(props) {
        super(props)
        this.state = {
            posts: [],
            friends: [],
            loading: true,
        }
    }
    componentDidUpdate(prevProps, prevState, snapshot){
        if(window.innerHeight + document.documentElement.scrollTop === document.scrollingElement.scrollHeight){
            console.log("Bottom");
        }
    }
    componentDidMount(){
        axios.get(`${APIService.URL_REST_API}/homepage/1`).then((res)=>{
            this.setState({
                posts:res.data,
                loading: true
            });
        }).finally(()=>{ 
            setTimeout(() => {
                this.setState({loading: false})
            }, 1200);
            window.scrollTo({top:0,behavior: "smooth"});
        });
        axios.get(`${APIService.URL_REST_API}/friends/1`).then((res)=>{
            this.setState({
                friends: res.data
            });
        });
    }
    render(){
        return (
            <Row>
                <Col xl={3} className='p-0 ' >
                  <SessionLeft user={this.props.appUser}/>
                </Col>
                <Col xl={9} className='p-0'>
                  <div className='d-flex flex-column'>
                    <NavigatorBar user={this.props.appUser}/>
                    <Container fluid className='ps-4' style={{marginTop: "60px"}}>
                        <AcitivityPage user={this.props.appUser} friends={this.state.friends} posts={this.state.posts} setPosts={(newposts)=>this.setState({posts: newposts})} loading={this.state.loading} setLoading={(newVal)=> this.setState({loading: newVal})}/>
                    </Container>
                  </div>
                </Col>
            </Row>
        );
    }
}
export default Homepage;