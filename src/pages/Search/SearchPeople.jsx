import React from "react";
import {Col, Row } from "react-bootstrap";
import PeopleCard from "../../components/PeopleCard"
import APIService from "../../features/APIService";
function SearchPeople ({people}) {
    
    return (
        <Row xl={3} lg={4} md={4} sm={3}>
            
            {
                people.map((p, index)=>{
                    let urlImage = p.image!=null?p.image: (p.gender=='female'? APIService.URL_REST_API+"/files/user_female.png":APIService.URL_REST_API+"/files/user_male.png");
                    return (<Col key={index} className="mx-auto mb-3">
                        <PeopleCard img={urlImage} people={p} size="18rem" />
                    </Col>);
                })
            }
            
        </Row>
    );
}
export default SearchPeople;