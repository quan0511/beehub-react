import React from "react";
import { Col, Container, Image, Row, Table } from "react-bootstrap";
import { ChatRightText, ClockFill, Eye, EyeSlash, GlobeAmericas, LockFill, PeopleFill } from "react-bootstrap-icons";

export const GroupAbout = ({group}) =>{
    console.log(group);
    const getDateCreate = ()=>{
        let datePost = new Date(group.created_at);
        return datePost.toLocaleString('en-GB');
    }
    return <Container>
        <Row className="group-section">
            <Col xl={7} lg={7} md={10} sm={10} className="mx-auto">
                <div className="d-flex flex-column ">
                    <div className="border-1 rounded-2 border p-4 text-start mb-4" style={{ boxShadow: "rgba(0, 0, 0, 0.03) 0px 1px 2px, rgba(0, 0, 0, 0.03) 0px 2px 4px, rgba(0, 0, 0, 0.03) 0px 4px 8px, rgba(0, 0, 0, 0.03) 0px 8px 16px, rgba(0, 0, 0, 0.03) 0px 16px 32px, rgba(0, 0, 0, 0.03) 0px 32px 64px"}}>
                        <h5>About this group</h5>
                        <hr/>
                        {group.bio}
                        <Table borderless>
                        <tbody>
                                {group.public_group?
                                    <tr>
                                        <td width="10%">
                                            <GlobeAmericas />
                                        </td>
                                        <td className="lh-sm"><span className="fw-bold">Public</span><br/>
                                            <span style={{fontSize:"13px"}}>
                                            Everyone can see who's in the group and what they post.
                                            </span>
                                        </td>
                                        
                                    </tr>
                                : 
                                    <tr>
                                        <td width="10%">
                                            <LockFill />
                                        </td>
                                        <td className="lh-sm"><span className="fw-bold">Private</span><br/>
                                            <span style={{fontSize:"13px"}}>
                                            Just member can see all posts in the group.
                                            </span>
                                        </td>
                                        
                                    </tr>
                                }
                                {group.active? 
                                    <tr>
                                        <td><Eye /></td>
                                        <td className="lh-sm"><span className="fw-bold">Visible</span><br/>
                                            <span style={{fontSize:"13px"}}>
                                            Everyone can find this group.
                                            </span>
                                        </td>
                                    </tr>
                                :
                                    <tr>
                                        <td><EyeSlash /></td>
                                        <td className="lh-sm"><span className="fw-bold">Invisible</span><br/>
                                            <span style={{fontSize:"13px"}}>
                                            Everyone can's find this group.
                                            </span>
                                        </td>
                                    </tr>
                                }
                                <tr>
                                    <td>
                                        <ClockFill/>
                                    </td>
                                    <td  className="lh-sm">
                                        <span className="fw-bold">History</span><br/>
                                        <span  style={{fontSize:"13px"}}>
                                            Group created on {getDateCreate()}.  
                                        </span>
                                    </td>
                                </tr>
                            </tbody>
                        </Table>
                    </div>
                    <div className="border-1 rounded-2 border p-4 text-start" style={{boxShadow: "rgba(0, 0, 0, 0.03) 0px 1px 2px, rgba(0, 0, 0, 0.03) 0px 2px 4px, rgba(0, 0, 0, 0.03) 0px 4px 8px, rgba(0, 0, 0, 0.03) 0px 8px 16px, rgba(0, 0, 0, 0.03) 0px 16px 32px, rgba(0, 0, 0, 0.03) 0px 32px 64px"}}>
                        <h5>Activity</h5>
                        <hr/>
                        <Table borderless>
                            <tbody>
                                <tr>
                                    <td width="10%">
                                        <ChatRightText />
                                    </td>
                                    <td className="lh-sm"><span className="fw-bold">{group.post_count} posts</span>
                                    </td>
                                    
                                </tr>
                                <tr>
                                    <td width="10%">
                                        <PeopleFill />
                                    </td>
                                    <td className="lh-sm"><span className="fw-bold">{group.member_count} total members</span>
                                    </td>
                                </tr>
                            </tbody>
                        </Table>
                    </div>
                </div>
            </Col>
        </Row>
    </Container>;
} 