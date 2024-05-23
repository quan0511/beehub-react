import React from 'react';
import axios from 'axios';
import {Col, Container, Image, Row, Spinner } from 'react-bootstrap';
import AcitivityPage from './ActivityPage';
import SessionLeft from '../components/SessionLeft';
import NavigatorBar from '../components/NavigatorBar';
import Searching from './Search/Searching';
import APIService from '../auth/APIService';

class Homepage extends React.Component{
    constructor(props) {
        super(props)
        this.state = {
            posts: [],
            user: {},
            friends: [],
            loading: true,
            page: "activity",
            searchString: ""
        }
    }
    componentDidUpdate(prevProps, prevState, snapshot){
        if(this.state.searchString != prevState.searchString && this.state.searchString.length>0){
            this.setState({page: "search"});
        }else if(this.state.searchString != prevState.searchString){
            this.setState({loading:true})
            this.setState({page: "activity"});
            
            setTimeout(()=>{
                this.setState({loading:false})
            },1000);
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
            }, 1500);
            window.scrollTo({top:0,behavior: "smooth"});
        });
        axios.get(`${APIService.URL_REST_API}/api/user/1`).then((res)=>{
            this.setState({
                user: res.data
            });
        });
        axios.get(`${APIService.URL_REST_API}/api/friends/1`).then((res)=>{
            this.setState({
                friends: res.data
            });
        });
    }
    render(){
        let getPage = ()=> {
            switch (this.state.page) {
                case "search":
                    return <Searching search={this.state.searchString} loading={this.state.loading} setLoading={(newVal)=> this.setState({loading: newVal})} />
                case "activity":
                    return <AcitivityPage user={this.state.user} friends={this.state.friends} posts={this.state.posts} setPosts={(newposts)=>this.setState({posts: newposts})} loading={this.state.loading} setLoading={(newVal)=> this.setState({loading: newVal})} />;
                default:
                    return <AcitivityPage user={this.state.user} friends={this.state.friends} posts={this.state.posts} setPosts={(newposts)=>this.setState({posts: newposts})} loading={this.state.loading} setLoading={(newVal)=> this.setState({loading: newVal})} />;
            }
        }
        return (
            <Row>
                <Col xl={3} className='p-0 ' >
                  <SessionLeft user={this.state.user}/>
                </Col>
                <Col xl={9} className='p-0'>
                  <div className='d-flex flex-column'>
                    <NavigatorBar user={this.state.user} search={this.state.searchString} setSearch={(str)=>this.setState({searchString: str})}/>
                    <Container fluid className='ps-4' style={{marginTop: "60px"}}>
                        {getPage()}
                    </Container>
                  </div>
                </Col>
            </Row>
        );
    }
}
export default Homepage;