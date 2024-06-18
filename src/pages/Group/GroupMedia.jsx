import React, { useState } from "react";
import { Col, Container, Image,Modal, Row } from "react-bootstrap";
import APIService from "../../features/APIService";
import { Link } from "react-router-dom";
function GroupMedia({group_medias}){
    const [showMedia, setShowMedia] = useState(false);
    const [selectMedia, setSelectMedia] = useState({});
    const getTimeOfPost = (date)=>{
        let datePost = new Date(date);
        let diffDay = Math.round(Math.abs(new Date() - datePost)/ 86400000);
        if(diffDay<1){
            let diffHour =Math.round(Math.abs(new Date() - datePost)/ 3600000);
            return <span  style={{fontSize: "12px"}}>{diffHour} hours ago</span>
        }else{
            return <span  style={{fontSize: "12px"}}>{datePost.toLocaleString("en-GB")}</span>
        }  
    }
    return <Container>
        <Row  style={{paddingBottom: "100px",paddingTop: "200px"}}>
            <Col xl={11} className="mx-auto">
                <div className="border-1 rounded-2 border p-4 text-start" style={{ boxShadow: "rgba(0, 0, 0, 0.03) 0px 1px 2px, rgba(0, 0, 0, 0.03) 0px 2px 4px, rgba(0, 0, 0, 0.03) 0px 4px 8px, rgba(0, 0, 0, 0.03) 0px 8px 16px, rgba(0, 0, 0, 0.03) 0px 16px 32px, rgba(0, 0, 0, 0.03) 0px 32px 64px"}}>
                    <h5>Media</h5>
                    <Container>
                        <Row xl={5} lg={4} md={4} sm={3}>
                            {group_medias.map((group_media,index)=>{
                                return (<Col key={index} className="p-1">
                                    <Image src={group_media.media} fluid onClick={()=> {
                                        setSelectMedia(group_media);
                                        setShowMedia(true);
                                    }}  />
                                </Col>);
                            })}
                        </Row>
                        <Modal show={showMedia} onHide={()=>setShowPhoto(false)}>
                            <Modal.Header closeButton>
                            <Modal.Title>Group Media  <span  style={{fontSize: "12px"}}> create at:</span> {getTimeOfPost(selectMedia.create_at)}</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <Image src={selectMedia.media} fluid/>
                            </Modal.Body>
                            {selectMedia.post_id!=null
                            ?
                            <Modal.Footer>
                                <Link to={"/post/"+selectMedia.post_id} role="button" className="btn btn-primary">Go to Post</Link>
                            </Modal.Footer>
                            :<></>
                            }
                        </Modal>
                    </Container>
                </div>
            </Col>
        </Row>
    </Container>;
}
export default GroupMedia;