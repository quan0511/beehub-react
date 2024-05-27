import React, { useEffect, useState } from "react";
import SessionLeftGroup from "../../components/SessionLeftGroup";
import {Col, Container, Image, Button, Row, Nav, Spinner} from "react-bootstrap";
import { Dot, GlobeAmericas, LockFill, ThreeDots } from "react-bootstrap-icons";
import NavigatorBar from "../../components/NavigatorBar";

import GroupMedia from "./GroupMedia";
import GroupPeople from "./GroupPeople";
import GroupDiscussion from "./GroupDiscussion";
import axios from "axios";
import APIService from "../../auth/APIService";
import { Link, useParams } from "react-router-dom";
import { GroupAbout } from "./GroupAbout";
function Group ({appUser}){
    const {id} = useParams(); 
    const [group, setGroup]= useState({});
    const [posts,setPosts] = useState([]);
    const [tab, setTab] = useState('discussion');
    const [loading, setLoading] =useState(true);
    const handelSelectTab = (selectKey)=>{
        setTab(selectKey);
    }
    const tabSession = ()=>{
        switch(tab){
            case "about":
                return <GroupAbout group={group} />;
            case "discussion":
                
                return <GroupDiscussion appUser={appUser} posts={posts} description={group.description} toListMedia={()=>setTab("media")} toAbout={()=>setTab("about")} list_media={group.group_medias>4?group.group_medias.slice(group.group_medias.length-4, group.group_medias.length):group.group_medias} isPublic={group.public_group} isActive={group.active} />;
            case "people":
                return <GroupPeople appUser={appUser} members={group.group_members} />;
            case "media":
                return <GroupMedia group_medias={group.group_medias}/>; 
            default:
                return <GroupDiscussion/>;
        }
    }
    useEffect(()=>{
        if(!loading) setLoading(true);
        axios.get(`${APIService.URL_REST_API}/user/${appUser.id}/get-group/${id}`).then((res)=>{
            setGroup(res.data);
            if(!res.data.public_group && res.data.member_role==null){
                setTab("about");
            }
        })
        axios.get(`${APIService.URL_REST_API}/user/${appUser.id}/group/${id}/posts`).then((res)=>{
            setPosts(res.data);
        }).finally(()=>{
            if(group!=null){
                setTimeout(() => {
                    setLoading(false);
                }, 200);
            }
        })
    },[])
    if(loading ){
        return <div className="d-flex justify-content-center align-items-center" style={{marginTop: "400px"}}> 
            <Spinner animation="border" />
        </div>
    }
    return (
        <Row>
            <Col xl={12} className="p-0" style={{height: "350px",width: "100vw",position: "relative"}}>
                {group.background_group !=null? 
                    <Image src={group.background_group} className="object-fit-cover" style={{height: "inherit",objectPosition: "center",width: "100%",borderRadius: "0 0 0 5px"}}/>
                    : <div style={{height: "inherit",objectPosition: "center",width: "100%",borderRadius: "0 0 0 5px",backgroundColor: "rgb(57,59,70,0.5)",}}></div>
                }
                <div className="position-absolute"style={{top: "250px",left: "1rem",width: "90%"}} >
                    <div className="d-flex flex-column ps-5 bg-white rounded-3 shadow px-2 pt-3">
                        {group.image_group!=null?
                            <Image src={group.image_group}  className="object-fit-cover border-0 rounded position-absolute bg-white" style={{width: "220px", height: "220px",top:"-100px"}} />
                            :
                            <Image src={APIService.URL_REST_API+"/files/group_image.png"} className="object-fit-cover border-0 rounded position-absolute bg-white" style={{width: "220px", height: "220px",top:"-100px"}} />
                        }
                        <div style={{marginLeft: "240px", textAlign: "start",marginBottom: "50px"}}>
                            <h2 style={{fontWeight: "900"}}>{group.groupname}</h2>
                            <div className="d-flex flex-row justify-content-between align-items-center">
                                <p>{
                                    group.public_group?
                                    <span><GlobeAmericas /> Public group</span> 
                                    :<span><LockFill/> Private group</span>
                                }<Dot/> {group.member_count} members</p>
                                {group.member_role ==null?
                                <Button variant="primary" style={{width: "100px",fontWeight: "bold"}}>Join</Button>
                                :
                                <Button variant="outline-danger" style={{width: "200px"}}>Leave Group</Button>
                                }
                            </div>
                            <div className="d-flex flex-row mb-2 flex-nowrap align-items-end" style={{overflowX: "hidden"}}>
                                {
                                    group.public_group?
                                    group.group_members.map((member,index)=>{
                                        let urlImg = member.user_image ? member.user_image: (member.user_gender=='female'? APIService+"/files/user_female.png":APIService+"/files/user_male.png");
                                        return <Image key={index} src={urlImg} width={40} roundedCircle />
                                    })
                                    :
                                    <></>
                                }
                                {
                                    group.public_group? 
                                    <Link color="secondary">
                                        <ThreeDots width={40}/>
                                    </Link>
                                    :<></>
                                }
                            </div>
                            
                        </div>
                        <Nav justify  variant="tabs" defaultActiveKey={tab} className="fs-5 w-50" onSelect={handelSelectTab}>
                            <Nav.Item>
                                <Nav.Link eventKey="about" className="text-dark">About</Nav.Link>
                            </Nav.Item>
                            <Nav.Item >
                                <Nav.Link eventKey="discussion" className="text-dark" >Discussion</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link eventKey="people" className="text-dark">People</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link eventKey="media" className="text-dark">Media</Nav.Link>
                            </Nav.Item>
                        </Nav>
                    </div>
                </div>
                {tabSession()}
            </Col>
        </Row>
    );
}
export default Group;