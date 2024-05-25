import React from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
export const FormSettingPassword = ({user})=>{
    return (
        <Form >
            <Row className="mt-4  ">
                <Form.Group className="mb-3" id="acceptChangePassword">
                    <Form.Check type="checkbox" label="Change new password" />
                </Form.Group>
                <Form.Group controlId="newPassword" className="mb-3">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" name="new_password" placeholder="Enter new password" required disabled/>
                </Form.Group>
                <Form.Group controlId="confirmPassword" className="mb-3">
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control type="password" name="confirm_password" placeholder="Enter confirm password" required disabled/>
                </Form.Group>
                <Form.Group controlId="currentPassword" className="mb-3">
                    <Form.Label>Current Password</Form.Label>
                    <Form.Control type="password" name="curren_password" placeholder="Required enter current password" required disabled/>
                </Form.Group>
                
                <Col xl={4}>
                    <Button variant="outline-primary" type="submit" className="button-save">
                        Save changes
                    </Button>
                </Col>
            </Row>
        </Form>
    );
}