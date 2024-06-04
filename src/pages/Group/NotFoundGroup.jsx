import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";

const NotFoundGroup=()=>{
    return (
        <Container>
            <Row>
                <Col xl={4} lg={4} md={8} sm={12} style={{marginTop: "120px"}}>
                    <h1>NOT FOUND GROUP</h1>
                    
                    <Link to={"/"} />
                </Col>
            </Row>
        </Container>
    );
}
export default NotFoundGroup;