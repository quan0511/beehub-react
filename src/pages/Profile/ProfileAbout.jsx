import React from "react";
import {Button, Card, Col, Row } from "react-bootstrap";
import { Pencil } from "react-bootstrap-icons";

function ProfileAbout({biography}) {
    return (
        <Row className="mb-5">
            <Col xl={8} className="mx-auto" style={{marginTop: "150px"}}>
                <Card>
                    <Card.Header className="d-flex flex-row justify-content-between">
                        <h4>Biography</h4>
                        <Button variant="secondary">
                            <Pencil/>
                        </Button>
                    </Card.Header>
                    <Card.Body className="px-4">
                    {biography}
                    </Card.Body>
                </Card>
            </Col>
        </Row>
    );
}
export default ProfileAbout;