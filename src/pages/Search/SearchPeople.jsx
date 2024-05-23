import React from "react";
import {Col, Row } from "react-bootstrap";
import PeopleCard from "../../components/PeopleCard"
function SearchPeople ({people}) {
    return (
        <Row xl={3} md={2}>
            
            {
                people.map((p)=>{
                    let urlImage = p.image!=null?p.image: (p.gender=='female'? "http://192.168.1.5:9001/api/files/user_female.png":"http://192.168.1.5:9001/api/files/user_male.png");
                    return (<Col className="mx-auto mb-3">
                        <PeopleCard img={urlImage} size="18rem" name={p.fullname} username={p.username} groups={p.group_counter} friends={p.friend_counter} relationship={p.typeRelationship} />
                    </Col>);
                })
            }
            
        </Row>
    );
}
export default SearchPeople;