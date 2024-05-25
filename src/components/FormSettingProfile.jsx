import React, { useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";

export const FormSettingProfile = (user)=>{
    const [validated, setValidated] = useState(false);
    const handleSubmit = (event) => {
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
          event.preventDefault();
          event.stopPropagation();
        }
    
        setValidated(true);
      };
    return (
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <Row className="mt-4">
                <Form.Group as={Col} controlId="formName" className="mb-3">
                    <Form.Label>Fullname</Form.Label>
                    <Form.Control type="text" name="fullname" placeholder="Enter Fullname" value={user.fullname} required/>
                    </Form.Group>
                    <Form.Group as={Col} controlId="formPassword">
                    <Form.Label>Username</Form.Label>
                    <Form.Control type="text" name="username" placeholder="Enter Username" value={user.username} required/>
                </Form.Group>
                <Form.Group controlId="formEmail" className="mb-3">
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="email" name="email" placeholder="Enter Email" value={user.email} required/>
                </Form.Group>
                <Form.Group controlId="formPhone" className="mb-3">
                    <Form.Label>Phone</Form.Label>
                    <Form.Control type="text" name="phone" placeholder="Enter Phone" value={user.phone} required/>
                </Form.Group>
                <Form.Group controlId="formBirthday" className="mb-3">
                    <Form.Label>Birthday</Form.Label>
                    <Form.Control type="date" name="birthday" value={user.birthday} required />
                </Form.Group>
                <Form.Group controlId="formGender"  className="mb-3">
                    <Form.Label>Gender</Form.Label>
                    {user.gender == 'female' ? 
                        <Form.Select name="gender" required>
                            <option value="female" selected>Female</option>
                            <option value="male" >Male</option>
                        </Form.Select>
                        :
                        <Form.Select name="gender" required>
                            <option value="female" >Female</option>
                            <option value="male" selected>Male</option>
                        </Form.Select>
                    }
                </Form.Group>
                <Col xl={4}>
                    <Button variant="outline-primary" type="submit" class="button-save">
                        Save changes
                    </Button>
                </Col>
            </Row>
        </Form>
    );
} 