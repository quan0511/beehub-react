import React from "react";
import {Col, Row } from "react-bootstrap";
import PeopleCard from "../../components/PeopleCard"
import APIService from "../../auth/APIService";
function SearchPeople ({people}) {
    return (
        <Row xl={3} md={2}>
            
            {
                people.map((p, index)=>{
                    let urlImage = p.image!=null?p.image: (p.gender=='female'? APIService.URL_REST_API+"/files/user_female.png":APIService.URL_REST_API+"/files/user_male.png");
                    return (<Col key={index} className="mx-auto mb-3">
                        <PeopleCard img={urlImage} size="18rem" name={p.fullname} username={p.username} groups={p.group_counter} friends={p.friend_counter} relationship={p.typeRelationship} />
                    </Col>);
                })
            }
            
        </Row>
    );
}
export default SearchPeople;