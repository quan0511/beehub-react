import React from "react";
import {Col, Image, Row } from "react-bootstrap";
import APIService from "../../features/APIService";
function ProfilePhotos({galleries}){
    return (
        <Row>
            <Col xl={12} className="mx-auto bg-white border rounded p-3 shadow-lg" style={{marginTop: "170px", minHeight: "450px"}}>
                <Row >
                    {galleries !=null && galleries.length>0?
                    galleries.map((gallery,index)=>{
                       return <Col key={index} xl={3}> <Image src={APIService.URL_REST_API+"/files/"+gallery.media} fluid /></Col>
                    })
                    :<Col xl={12} className="text-center"><p className="text-black-50" style={{fontSize: "30px"}}>No Image Found</p></Col>
                    }
                </Row>
            </Col>
        </Row>
    );
}
export default ProfilePhotos;