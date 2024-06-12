import React from "react";
import { Button, Card, Col, Image, Row } from "react-bootstrap";
import { Dot } from "react-bootstrap-icons";
import GroupCard from "../../components/GroupCard";
import APIService from "../../features/APIService";
function SearchGroups({groups}){
    console.log(groups);
    return (
        <Row>
            <Col lg={10} md={12} className="mx-auto">
                <div className="d-flex flex-column text-start">
                    {groups.map((group, index)=>{
                        let urlImage = group.image_group !=null? group.image_group: APIService.URL_REST_API+"/files/group_image.png";
                        return <GroupCard key={index} image={urlImage} group={group}/>
                    })}
                </div>
            </Col>
        </Row>
    );
}
export default SearchGroups;