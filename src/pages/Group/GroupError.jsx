import React from "react";
import { Button, Card, Col, Container, Row } from "react-bootstrap";

export const GroupError = ()=>{
    return <Container><Row style={{paddingBottom: "100px"}}>
        <Col xl="4" className="mx-auto p-0">
            <Card  className="text-start shadow" style={{marginTop: "120px"}} >
                <Card.Header>Sugguestion</Card.Header>
                <Card.Body>
                    <Card.Title className="fw-bold">Let Join Group</Card.Title>
                    <Card.Text>
                    I see, You haven's joined this group.
                    You need to join to see the group posts
                    </Card.Text>
                    <Button variant="primary">Join</Button>
                </Card.Body>
            </Card>
        </Col>
    </Row></Container>
}