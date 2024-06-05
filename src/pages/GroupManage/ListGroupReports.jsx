import React from "react";
import {  Button, Card, Image, ListGroup } from "react-bootstrap";
import { Link } from "react-router-dom";
import APIService from "../../features/APIService";
import { useDispatch, useSelector } from "react-redux";
import { selectCurrentToken } from "../../auth/authSlice";
import { refresh } from "../../features/userSlice";

export const ListGroupReports =({reports,user_id,group_id})=>{
    const token = useSelector(selectCurrentToken);
    const dispatch = useDispatch();
    console.log(reports);
    const getTimeOf = (createDate)=>{
        let dateTime = new Date(createDate);
        let diffDay = Math.round(Math.abs(new Date() - dateTime)/ 86400000);
        if(diffDay<1){
            let diffHour =Math.round(Math.abs(new Date() - dateTime)/ 3600000);
            return <span  style={{fontSize: "12px"}}>{diffHour} hours ago</span>
        }else{
            return <span  style={{fontSize: "12px"}}>{dateTime.toLocaleString("en-GB")}</span>
        }        
    }
    const handleButton= async(typeClick,report_id)=>{
        let resp = await APIService.createRequirement(user_id, {group_id: group_id,report_id: report_id, type: typeClick },token);
        if(resp.result!='unsuccess'||resp.result != 'error'){
           dispatch(refresh());
        }
    }
    return (
        <div className="d-flex flex-column">
            <h3>Total {reports.length} Reports</h3>
            <hr/>
            <ListGroup as="ol" numbered>
                {reports.map((report,index)=>{

                    return (
                        <ListGroup.Item
                            key={index}
                            as="li"
                            className="d-flex justify-content-between align-items-start"
                        >
                            <div className="ms-2 me-auto d-flex flex-column">
                                <div className="fs-5">From <Link className="fw-bold " to={"/member/profile/"+report.sender.username}>{report.sender.fullname}</Link> <span>report post </span> {report.type.title}</div>
                                {report.target_post!=null?
                                    <div className="border-top-1">
                                        <Card className="px-0 pt-2 pb-3">
                                            <Card.Header>
                                                <p className="fs-6">To post of <Link to={"/member/profile/"+report.target_post.user_username}>{report.target_post.user_fullname}</Link><br/>
                                                <span className="text-black-50">{getTimeOf(report.target_post.create_at)}</span>
                                                </p>
                                            </Card.Header>
                                            <Card.Body>
                                                <p className="h6 mx-5 mb-3 text-dark ms-2">{report.target_post.text}</p>
                                                {report.target_post.group_media!=null?
                                                <div>
                                                    <Image src={APIService.URL_REST_API+"/files/"+report.target_post.group_media.media} height="120px" style={{objectFit: "contain"}} fluid />
                                                </div>
                                                :<></>
                                                }
                                            </Card.Body>
                                            <Card.Footer>
                                                <Button variant="secondary"  onClick={()=> {if(confirm("Do you want to delete this report?")){ handleButton("CANCEL_REPORT", report.id)}}}>Cancel</Button>
                                                <Button variant="danger" className="ms-3" onClick={()=> {if(confirm("Do you want to delete this report and post?")){ handleButton("ACCEPT_REPORT", report.id)}}}>Accept & Remove Post</Button>
                                            </Card.Footer>
                                        </Card>
                                    </div>    
                                :<></>}
                            </div>
                            <div>{getTimeOf(report.create_at)}</div>
                        </ListGroup.Item>
                    );
                })} 
            </ListGroup>
        </div>
    );
}