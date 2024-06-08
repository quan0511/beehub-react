import React from "react";
import { Button, Card, Col, Container, Row } from "react-bootstrap";

export const GroupError = ()=>{
    return <Container><Row className="group-section">
        <Col xl={5} lg={6} md={8} sm={10}  className="mx-md-auto me-sm-auto p-0">
            <Card  className="text-start shadow" >
                <Card.Header>Sugguestion</Card.Header>
                <Card.Body class="d-flex flex-column p-5">
                    <Card.Title className="fw-bold">Let Join Group</Card.Title>
                    <Card.Text>
                    I see, You haven's joined this group.
                    You need to join to see the group posts
                    </Card.Text>
                </Card.Body>
            </Card>
        </Col>
    </Row></Container>
}