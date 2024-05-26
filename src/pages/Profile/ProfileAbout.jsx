import React from "react";
import {Button, Card, Col, Row, Table } from "react-bootstrap";
import { Pencil } from "react-bootstrap-icons";

function ProfileAbout({user}) {
    return (
        <Row className="mb-5">
            <Col xl={8} className="mx-auto" style={{marginTop: "150px", minHeight:"450px"}}>
                <div className="d-flex flex-column ">
                    <Card className="mb-3">
                        <Card.Header className="d-flex flex-row justify-content-between">
                            <h4>Biography</h4>
                            <Button variant="secondary">
                                <Pencil/>
                            </Button>
                        </Card.Header>
                        <Card.Body className="px-4">
                            {user.bio}
                        </Card.Body>
                    </Card>
                    <Card className="mb-3">
                        <Card.Header className="d-flex flex-row justify-content-between">
                            <h4>Profile</h4>
                        </Card.Header>
                        <Card.Body className="px-4">
                            <Table borderless >
                                <tbody>
                                    <tr>
                                        <td>Fullname</td>
                                        <td>{user.fullname}</td>
                                    </tr>
                                    <tr>
                                        <td>Gender</td>
                                        <td>{user.gender}</td>
                                    </tr>
                                    <tr>
                                        <td>Birthday</td>
                                        <td>{user.birthday}</td>
                                    </tr>
                                    <tr>
                                        <td>Email</td>
                                        <td>{user.email}</td>
                                    </tr>
                                    <tr>
                                        <td>Phone number</td>
                                        <td>{user.phone}</td>
                                    </tr>
                                </tbody>
                            </Table>
                        </Card.Body>
                    </Card>
                </div>
            </Col>
        </Row>
    );
}
export default ProfileAbout;