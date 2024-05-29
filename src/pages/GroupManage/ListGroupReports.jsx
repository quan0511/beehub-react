import React from "react";
import { Badge, Button, Card, Image, ListGroup } from "react-bootstrap";
import { Link } from "react-router-dom";
import APIService from "../../features/APIService";

export const ListGroupReports =({reports})=>{
    const getTimeOf = (createDate)=>{
        let dateTime = new Date(createDate[0],createDate[1],createDate[2], createDate[3], createDate[4], createDate[5]);
        let diffDay = Math.round(Math.abs(new Date() - dateTime)/ 86400000);
        if(diffDay<1){
            let diffHour =Math.round(Math.abs(new Date() - dateTime)/ 3600000);
            return <span  style={{fontSize: "12px"}}>{diffHour} hours ago</span>
        }else{
            return <span  style={{fontSize: "12px"}}>{dateTime.toLocaleString("en-GB")}</span>
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
                                <div className="fw-bold fs-5">From <Link to={"/member/profile/"+report.sender.username}>{report.sender.fullname}</Link></div>
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
                                            <Button variant="secondary">Cancel</Button>
                                            <Button variant="danger" className="ms-3">Remove Post</Button>
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