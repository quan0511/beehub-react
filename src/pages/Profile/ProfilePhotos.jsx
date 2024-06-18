import React, { useState } from "react";
import {Col, Image, Modal, Row } from "react-bootstrap";
import APIService from "../../features/APIService";
import { Link } from "react-router-dom";
function ProfilePhotos({galleries}){
    const [showPhoto, setShowPhoto] = useState(false);
    const [selectGallery, setSelectGallery] = useState({});

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
    return (
        <Row>
            <Col xl={12} className="mx-auto bg-white border rounded p-3 shadow-lg" style={{marginTop: "170px", minHeight: "450px"}}>
                <Row >
                    {galleries !=null && galleries.length>0?
                    galleries.map((gallery,index)=>{
                       return <Col key={index} xl={3} lg={3} md={4} sm={4} className="mb-2"> <Image src={gallery.media} fluid onClick={()=> {
                        setSelectGallery(gallery);
                        setShowPhoto(true);
                       }} /></Col>
                    })
                    :<Col xl={12} className="text-center"><p className="text-black-50" style={{fontSize: "30px"}}>No Image Found</p></Col>
                    }
                </Row>
                <Modal show={showPhoto} onHide={()=>setShowPhoto(false)}>
                    <Modal.Header closeButton>
                    <Modal.Title>Photo  <span  style={{fontSize: "12px"}}> create at:</span> {getTimeOfPost(selectGallery.create_at)}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Image src={selectGallery.media} fluid/>
                    </Modal.Body>
                    {selectGallery.post_id!=null
                    ?
                    <Modal.Footer>
                        <Link to={"/post/"+selectGallery.post_id} role="button" className="btn btn-primary">Go to Post</Link>
                    </Modal.Footer>
                    :<></>
                    }
                </Modal>
            </Col>
        </Row>
    );
}
export default ProfilePhotos;