import React from "react";
import { Button, Card, Col, Image, Row } from "react-bootstrap";
import { Dot } from "react-bootstrap-icons";
import GroupCard from "../../components/GroupCard";
import APIService from "../../auth/APIService";
function SearchGroups({groups}){
    return (
        <Row>
            <Col lg={10} md={12} className="mx-auto">
                <div className="d-flex flex-column text-start">
                    {groups.map((group)=>{
                        let urlImage = group.image !=null? group.image: APIService.URL_REST_API+"/files/group_image.png";
                        return <GroupCard id={group.id} image={urlImage} groupname={group.groupname} description={group.description} is_public={group.public_group} joined={group.joined} member_count={group.member_count}/>
                    })}
                </div>
            </Col>
        </Row>
    );
}
export default SearchGroups;