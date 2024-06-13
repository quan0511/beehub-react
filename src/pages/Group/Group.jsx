import React, { useEffect, useState } from "react";
import {Col, Container, Image, Button, Row, Nav, Spinner} from "react-bootstrap";
import { Dot, ExclamationCircle, GlobeAmericas, LockFill, ThreeDots } from "react-bootstrap-icons";

import GroupMedia from "./GroupMedia";
import GroupPeople from "./GroupPeople";
import GroupDiscussion from "./GroupDiscussion";
import axios from "axios";
import APIService from "../../features/APIService";
import { Link, useParams } from "react-router-dom";
import { GroupAbout } from "./GroupAbout";
import { useDispatch, useSelector } from "react-redux";
import { selectCurrentToken, selectCurrentUser } from "../../auth/authSlice";
import { useGroupInfoQuery, useGroupPostsQuery } from "../../features/userApiSlice";
import { refresh } from "../../features/userSlice";
import { GroupError } from "./GroupError";
import BeehubSpinner from "../../components/BeehubSpinner";
import ModalReport from "../../components/ModalReport";
function Group (){
    const appUser = useSelector(selectCurrentUser);
    const {id} = useParams(); 
    const token = useSelector(selectCurrentToken);
    const [page, setPage] = useState(0);
    const [showReport,setShowReport] = useState(false);
    const reset = useSelector((state)=>state.user.reset);
    const {data:group, isLoading, isSuccess} = useGroupInfoQuery({id_user: appUser.id, id_group: id, reset:reset});
    const {data: posts, isFetching} =useGroupPostsQuery({id_user: appUser.id, id_group: id,page:page, reset:reset});
    const [tab, setTab] = useState('discussion');
    const dispatch = useDispatch();
    const handleButton= async(typeClick)=>{
        let resp = await APIService.createRequirement(appUser.id, {sender_id: appUser.id, group_id: group.id, type: typeClick },token);
        if(resp.result != 'unsuccess'|| resp.result !="error"){
            dispatch(refresh())
        }
    }
    const handelSelectTab = (selectKey)=>{
        setTab(selectKey);
    }
    const tabSession = ()=>{
        switch(tab){
            case "about":
                return <GroupAbout group={group} />;
            case "discussion":
                if(  group.active && (group.public_group || group.joined=='joined')){
                    return <GroupDiscussion posts={posts} 
                                            joined={group.joined} 
                                            description={group.description} 
                                            toListMedia={()=>setTab("media")} 
                                            toAbout={()=>setTab("about")} 
                                            list_media={group.group_medias>4?group.group_medias.slice(group.group_medias.length-4, group.group_medias.length):group.group_medias} 
                                            isPublic={group.public_group} 
                                            isActive={group.active} 
                                            page={page}
                                            setPage={setPage}
                                            isFetching={isFetching}
                                            group={group}/>;
                }
                return <GroupError/>
            case "people":
                if(  group.active && (group.public_group || group.joined=='joined')){
                    return <GroupPeople members={group.group_members.filter((e)=> e.relationship !="BE_BLOCKED")} />;
                }
                return <GroupError/>
            case "media":
                if(  group.active && (group.public_group || group.joined=='joined')){
                    return <GroupMedia group_medias={group.group_medias}/>; 
                }
                return <GroupError/>
            default:
                return <GroupError/>;
        }
    }
    useEffect(()=>{
        if(group!=null){
            if(!group.public_group && group.member_role==null){
                setTab("about");
            }
        }
    },[])
    if(isLoading || !isSuccess ){
        return <div className="d-flex justify-content-center align-items-center" style={{marginTop: "400px"}}> 
            {BeehubSpinner()}
        </div>
    }
    return (
        <Row>
            <Col xl={12} className="p-0" style={{position: "relative"}}>
                {group.background_group !=null? 
                    <Image src={group.background_group} className="object-fit-cover" style={{height: "350px",objectPosition: "center",width: "100%",borderRadius: "0 0 0 5px"}}/>
                    : <div style={{height: "350px",objectPosition: "center",width: "100%",borderRadius: "0 0 0 5px",backgroundColor: "rgb(57,59,70,0.5)",}}></div>
                }
                <div className="position-absolute group-menu" >
                    <div className="d-flex flex-column ps-md-5 px-sm-4 bg-white rounded-3 shadow pt-3">
                        {group.image_group!=null?
                            <Image src={group.image_group}  className="object-fit-cover border-0 rounded position-absolute bg-white" style={{width: "220px", height: "220px",top:"-100px"}} />
                            :
                            <Image src={APIService.URL_REST_API+"/files/group_image.png"} className="object-fit-cover border-0 rounded position-absolute bg-white" style={{width: "220px", height: "220px",top:"-100px"}} />
                        }
                        <div className="group-name">
                            <h2 style={{fontWeight: "900"}}>{group.groupname}</h2>
                            <div className="d-flex flex-lg-row flex-md-column flex-sm-column justify-content-lg-between justify-content-md-around align-items-lg-center align-items-lg-start">
                                <p>{
                                    group.public_group?
                                    <span><GlobeAmericas /> Public group</span> 
                                    :<span><LockFill/> Private group</span>
                                }<Dot/> {group.member_count} members</p>
                                <div className="d-flex flex-nowrap ">
                                    {group.member_role ==null && group.joined ==null?
                                        <Button variant="primary" style={{width: "100px",fontWeight: "bold"}} onClick={()=> handleButton("JOIN")}>Join</Button>
                                        :( group.member_role ==null && group.joined =='send request' ?
                                            <Button variant="outline-warning" style={{width: "100px",fontWeight: "bold"}} onClick={()=> handleButton("CANCEL_JOIN")}>Cancel Request</Button>
                                            :
                                            (group.member_role == "MEMBER"?
                                            <Button variant="outline-danger" style={{width: "200px"}}  onClick={()=> handleButton("LEAVE_GROUP")}>Leave Group</Button>
                                            : (group.member_role == "GROUP_MANAGER"?
                                                <div><Button variant="outline-danger" style={{width: "200px", marginRight:"10px"}}  onClick={()=> handleButton("LEAVE_GROUP")}>Leave Group</Button>
                                                <Link  className="btn btn-danger" role="button" to={"/group/manage/"+group.id} >Manager Group</Link></div>
                                                :<Link  className="btn btn-danger" role="button" to={"/group/manage/"+group.id} >Manager Group</Link>
                                            ))
                                        )
                                    }
                                    {group.member_role!="GROUP_CREATOR"?
                                        (<div className="ms-1"><button onClick={()=>{
                                            setShowReport(true);
                                        }} className="ms-2 btn btn-link ">
                                            <ExclamationCircle color="red" size={25}/>
                                        </button>
                                        <ModalReport showReport={showReport} setShowReport={setShowReport} groupTarget={group} /></div>
                                        )
                                    :<></>
                                    }
                                </div>
                            </div>
                            <div className="d-flex flex-row mb-2 flex-nowrap align-items-end d-none d-lg-block d-xl-block" style={{overflowX: "hidden"}}>
                                {
                                    group.public_group || group.member_role!=null?
                                    group.group_members.map((member,index)=>{
                                        let urlImg = member.user_image ? member.user_image: (member.user_gender=='female'? APIService.URL_REST_API+"/files/user_female.png":APIService.URL_REST_API+"/files/user_male.png");
                                        return <Image key={index} src={urlImg} width={40} roundedCircle />
                                    })
                                    :
                                    <></>
                                }
                            </div>
                            
                        </div>
                        <div className="group-nav">
                            <Nav justify  variant="tabs" defaultActiveKey={tab} onSelect={handelSelectTab}>
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
                </div>
                {tabSession()}
            </Col>
        </Row>
    );
}
export default Group;