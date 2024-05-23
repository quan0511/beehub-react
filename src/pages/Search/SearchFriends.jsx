import React from "react";
import {Col, Row } from "react-bootstrap";
import PeopleCard from "../../components/PeopleCard"
function SearchFriends () { 
    return (
        <Row xl={3} md={2}>
            <Col className="mx-auto mb-3">
                <PeopleCard img="\assets\images\user\fuxuan3.png" size="18rem" name="Fu Xuan" groups="2" friends="4"/>
            </Col>
            <Col className="mx-auto mb-3">
                <PeopleCard img="\assets\images\user\jingliu.png" size="18rem" name="Jingliu" groups="0" friends="0"/>
            </Col>
            <Col className="mx-auto mb-3">
                <PeopleCard img="\assets\images\user\huohuo-6.png" size="18rem" name="Huo Huo" groups="1" friends="6"/>
            </Col>
            <Col className="mx-auto mb-3">
                <PeopleCard img="\assets\images\user\bw-1.png" size="18rem" name="Black Swan" groups="12" friends="122"/>
            </Col>
        </Row>
    );
}
export default SearchFriends;